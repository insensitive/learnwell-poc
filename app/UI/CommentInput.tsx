'use client'

import revalidateHomePage, { revalidateVideoPath } from "./RevalidateAction";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { submitComment } from "../Data/APICalls";

export const CommentInput = ({videoId} : {videoId : string}) => {
    const [comment, setComment] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const handleSubmit = async () => {
        setLoading(true)
        const data = await submitComment(comment, videoId)
        if (data["success"] === "POST /videos/comments") {
            revalidateHomePage()
            revalidateVideoPath(videoId)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }
    return (
        <div className="flex gap-2 w-full items-center">
            <Input type="text" placeholder="Your comment here" onChange={(e) => setComment(e.target.value)} value={comment} />
            <Button type="submit" disabled={comment === ""} onClick={handleSubmit}>{loading ? "Loading.." : "Comment"}</Button>
        </div>
    )
}