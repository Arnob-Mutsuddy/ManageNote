"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { da, th } from "date-fns/locale";
import { revalidateDailyPrompt } from "./public";
import { revalidatePath } from "next/cache";
import { MOODS } from "@/app/lib/moods";
import { getPixabayImage } from "./public";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";
export async function createJournalEntry(data) {
    try {
        const { userId } = await auth();  // ← awaited
        if (!userId) {
            throw new Error("Unauthorized");
        }

        //arc
        const req = await request();
        const decision = await aj.protect(req, {
            userId,
            requested: 1,
        });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                const { remaining, reset } = decision.reason;
                console.error({
                    code: "RATE_LIMIT_EXCEEDED",
                    details: {
                        remaining,
                        resetInSeconds: reset,
                    },
                });
                throw new Error("Too many requests. Please try again later.");
            }
            throw new Error("Request blocked");
        }
        //end arc

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
        if (!user) throw new Error("User not found");

        const mood = MOODS[data.mood.toUpperCase()];
        if (!mood) throw new Error("Invalid mood");

        const moodImageUrl = await getPixabayImage(data.moodQuery || mood.pixabayQuery);

        const entry = await db.entry.create({
            data: {
                title: data.title,
                content: data.content,
                mood: mood.id,        // ✅ fixed
                moodScore: mood.score,
                moodImageUrl,
                userId: user.id,      // ✅ fixed
                collectionId: data.collectionId || null,
            },
        });

        await db.draft.deleteMany({ where: { userId: user.id } });  // ✅ fixed

        revalidatePath("/dashboard");
        return entry;

    } catch (error) {
        throw new Error(error.message || "Failed to create journal entry");
    }
}