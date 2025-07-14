import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotePreview from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api/serverApi";

type Props = {
    params: Promise<{ id: string }>;
};
 
const NotePreviewDetails = async ({ params }: Props) => {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreview/>
        </HydrationBoundary>
    );
};

export default NotePreviewDetails;
