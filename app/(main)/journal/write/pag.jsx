// "use client";
// import { Button } from "@/components/ui/button";
// import dynamic from "next/dynamic";
// import { use, useState ,useEffect, act } from "react";
// import { useSearchParams } from "next/navigation";
// import React from "react"; 
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
// import "react-quill-new/dist/quill.snow.css";
// import { journalSchema } from "@/app/lib/schemas";
// import { BarLoader } from "react-spinners";
// import { getMoodById, MOODS } from "@/app/lib/moods";

// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import useFetch from "@/hooks/use-fetch";
// import { useRouter } from "next/navigation";
// import {
//   createJournalEntry,
//   updateJournalEntry,
//   getJournalEntry,
//   getDraft,
//   saveDraft,
// } from "@/actions/journal";
// import { toast } from "sonner";
// import CollectionForm from "@/components/collection-form";

// import { createCollection, getCollections } from "@/actions/collection";

// const JounalEntryPage = () => {
//   const searchParams = useSearchParams();
//   const editId = searchParams.get("edit");
//   const [isEditMode, setIsEditMode] = useState(false);

//   const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);

//     const {
//     loading: collectionsLoading,
//     data: collections,
//     fn: fetchCollections,
//   } = useFetch(getCollections);
//     const {
//     loading: createCollectionLoading,
//     fn: createCollectionFn,
//     data: createdCollection,
//   } = useFetch(createCollection);

//   const{
//     loading: actionLoading,
//     fn: actionFn,
//     data: actionResult,
//   } = useFetch(createJournalEntry);
//   const {
//     loading: entryLoading,
//     data: existingEntry,
//     fn: fetchEntry,
//   } = useFetch(getJournalEntry);



//   const router = useRouter();
  

//     const { register, handleSubmit, control, getValues,watch,
//     formState: { errors }, setValue,
//     } = useForm({
//         resolver:zodResolver(journalSchema),
//         defaultValues: {
//             title: "",
//             content: "",
//             mood: "",
//             collectionId: "",
//         },
//     });

//     useEffect(() => {
//     fetchCollections();
    
//   }, []);


//     const selectedMood = watch("mood");// Watch the mood field to get the selected mood's ID (Me:2.0)

    

//     useEffect(() => {
//     if (actionResult && !actionLoading) {
//       // Clear draft after successful publish
//       // if (!isEditMode) {
//       //   saveDraftFn({ title: "", content: "", mood: "" });
//       // }

//       router.push(
//         `/collection/${
//           actionResult.collectionId ? actionResult.collectionId : "unorganized"
//         }`
//       );

//       toast.success( 'Entry created successfully!' 
//         // `Entry ${isEditMode ? "updated" : "created"} successfully!`
//       );
//     }
//   }, [actionResult, actionLoading]);

//     const onSubmit = handleSubmit(async (data) => {
//       const mood = getMoodById(data.mood);
//       actionFn({
//         ...data,
//         moodScore: mood.score,
//         moodQuery: mood.pixabayQuery,
//         // ...(isEditMode && { id: editId }),
//       });
//     });

//   // Handle collection creation success
//   useEffect(() => {
//     if (createdCollection) {
//       setIsCollectionDialogOpen(false);
//       fetchCollections();
//       setValue("collectionId", createdCollection.id);
//       toast.success(`Collection ${createdCollection.name} created!`);
//     }
//   }, [createdCollection]);

//   const handleCreateCollection = async (data) => {
//     createCollectionFn(data);
//   };

//   const isLoading =
//     collectionsLoading ||
//     entryLoading ||
//     draftLoading ||
//     actionLoading ||
//     savingDraft;

//     return (
//       <div className="p-8">
//         <form className="space-y-2 mx-auto" onSubmit = {onSubmit } > 
//           <h1 className="text-5xl md:text-6xl gradient-title">
//             What's on your mind?
//           </h1>
//           {isLoading && <BarLoader color="orange" width={"100%"} />}


//           <div className="space-y-2">
//             <label className="text-sm font-medium">Title</label>
//             <Input
//               disabled={isLoading}
//               {...register("title")}
//               placeholder="Give your entry a title..."
//               className={`py-5 md:text-md ${
//                 errors.title ? "border-red-500" : ""
//               }`}
//             />
//             {errors.title && (
//               <p className="text-red-500 text-sm">{errors.title.message}</p>
//             )}
//           </div>


//         <div className="space-y-2">
//           <label className="text-sm font-medium">How are you feeling?</label>
//           <Controller
//             name="mood"
//             control={control}
//             render={({ field }) => (
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <SelectTrigger className={errors.mood ? "border-red-500" : ""}>
//                   <SelectValue placeholder="Select a mood..." />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {Object.values(MOODS).map((mood) => (
//                     <SelectItem key={mood.id} value={mood.id}>
//                       <span className="flex items-center gap-2">
//                         {mood.emoji} {mood.label}
//                       </span>
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           />
//           {errors.mood && (
//             <p className="text-red-500 text-sm">{errors.mood.message}</p>
//           )}
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium">
//             {getMoodById(selectedMood)?.prompt?? "Write your thoughts..."}
//           </label>
//           <Controller
//             name="content"
//             control={control}
//             render={({ field }) => (
//               <ReactQuill
//                 readOnly={isLoading}
//                 theme="snow"
//                 value={field.value}
//                 onChange={field.onChange}
//                 modules={{
//                   toolbar: [
//                     [{ header: [1, 2, 3, false] }],
//                     ["bold", "italic", "underline", "strike"],
//                     [{ list: "ordered" }, { list: "bullet" }],
//                     ["blockquote", "code-block"],
//                     ["link"],
//                     ["clean"],
//                   ],
//                 }}
//               />
//             )}
//           />
//           {errors.content && (
//             <p className="text-red-500 text-sm">{errors.content.message}</p>
//           )}
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium">
//             Add to Collection 
//           </label>
//           <Controller
//             name="collectionId"
//             control={control}
//             render={({ field }) => (
//               <Select
//                 onValueChange={(value) => {
//                   if (value === "new") {
//                     setIsCollectionDialogOpen(true);
//                   } else {
//                     field.onChange(value);
//                   }
//                 }}
//                 value={field.value}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Choose a collection..." />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {collections?.map((collection) => (
//                     <SelectItem key={collection.id} value={collection.id}>
//                       {collection.name}
//                     </SelectItem>
//                   ))}
//                   <SelectItem value="new">
//                     <span className="text-orange-600">
//                       + Create New Collection
//                     </span>
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />

//         </div>

//         <div className="space-x-4 flex">
//           <Button type="submit" variant="journal" disabled={actionLoading}>
//             Publish
//           </Button>
          
//         </div>





//         </form>
//         <CollectionForm
//         loading={createCollectionLoading}
//         onSuccess={handleCreateCollection}
//         open={isCollectionDialogOpen}
//         setOpen={setIsCollectionDialogOpen}
//       />
//       </div>
//     );
// }; 

// export default JounalEntryPage;