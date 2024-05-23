import Video from 'next-video';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CommentInput } from './CommentInput';



export type videoObject = {
    created_at: string,
    video_url: string,
    user_id: string,
    description: string,
    title: string,
    num_comments: number,
    id: string
}

type commentObject = {
    created_at: string,
    content: string,
    user_id: string,
    video_id: string,
    id: string
}

async function getAllCommentsPerVideo(videoId: string) {
    const res = await fetch('https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=' + videoId, {
        method: "GET"
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export const VideoCard = async ({ videoObj }: { videoObj: videoObject }) => {
    const data = await getAllCommentsPerVideo(videoObj.id)
    return (
        <Card key={videoObj.id} className="w-full md:w-[32%] min-h-full flex flex-col">
            <CardHeader>
                <Video src={videoObj.video_url} className="rounded-lg w-full" />
            </CardHeader>
            <CardContent>
                <CardTitle className="mt-5">{videoObj.title}</CardTitle>
                <CardDescription className="mt-4 mb-[-15px]">{videoObj.description}</CardDescription>
            </CardContent>
            <CardFooter className="mt-auto justify-self-end">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">Comments</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{videoObj.title}</DialogTitle>
                            <CardDescription>Uploaded By : {videoObj.user_id.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</CardDescription>
                        </DialogHeader>
                        <CommentInput videoId={videoObj.id} />
                        <div>
                            {data.comments.reverse().map((comment: commentObject) =>
                                <div className='border rounded-md border-dashed border-black p-3 mb-2'>
                                    <p>{comment.content}</p>
                                    <p className='text-slate-500 text-xs'>By : {comment.user_id.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</p>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}