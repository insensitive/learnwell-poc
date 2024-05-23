'use client'

import revalidateHomePage from "./RevalidateAction";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

async function submitComment(comment: string, videoId: string) {
    const res = await fetch('https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            video_id: videoId,
            content: comment,
            user_id: "scott_shaw"
        })
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export const CommentInput = ({videoId} : {videoId : string}) => {
    const [comment, setComment] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const handleSubmit = async () => {
        setLoading(true)
        const data = await submitComment(comment, videoId)
        if (data["success"] === "POST /videos/comments") {
            revalidateHomePage()
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