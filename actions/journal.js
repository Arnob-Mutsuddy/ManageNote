"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { da, th } from "date-fns/locale";
import { revalidateDailyPrompt } from "./public";
import { revalidatePath } from "next/cache";

export async function createJournalEntry(data) {
    try {
        const { userId } = auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        //arc

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
        if (!user) {
            throw new Error("User not found");
        }

        const mood = MOODS[data.mood.toUpperCase()];
        if (!mood) {
            throw new Error("Invalid mood");
        }
        const moodImageUrl = await getPixabayImage(data.moodQuery || mood.pixabayQuery);

        const entry = await db.entry.create({
            data: {
                title: data.title,
                content: data.content,
                mood: mood.id,
                moodScore: mood.score,
                moodImageUrl,
                userId: user.id,
                collectionId: data.collectionId || null,
            },
        });

        await db.draft.deleteMany({
            where: { userId: user.id },
        });
        revalidatePath("/dashboard");
       
        return entry;

    } catch (error) {
        throw new Error(error.message || "Failed to create journal entry");
    }
}