'use client'

import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import LogoColor from "../Assets/LogoColor.png"
import Profile from "../Assets/Profile.png"
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
import { Input } from "@/components/ui/input"
import { useState } from "react"
import revalidateHomePage from "./RevalidateAction";

async function postAllVideos(title: string, description: string, url: string) {
    const res = await fetch('https://take-home-assessment-423502.uc.r.appspot.com/api/videos', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: "scott_shaw",
            description: description,
            video_url: url,
            title: title
        })
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export const NewVideoDialog = () => {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [url, setUrl] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const handlePostVideo = async () => {
        setLoading(true)
        const data = await postAllVideos(title, description, url)
        if (data["success"] === "POST /videos") {
            revalidateHomePage()
            setLoading(false)
        } else {
            setLoading(false)
        }
    }
    return (
        <div className="w-full flex md:flex-row flex-col justify-between items-center">
            <div className="mb-5 relative">
                <Image
                    src={LogoColor}
                    alt="Picture of the author"
                    className="w-40"
                />
                <p className="text-xs absolute hidden md:block md:top-[38px] md:left-[50px] text-slate-500 w-max">The first learning place for your kids</p>
            </div>
            <div className="flex gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default" className="w-full md:w-32">Add new Video</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Video (by link)</DialogTitle>
                            <DialogDescription>*every field is necessary</DialogDescription>
                        </DialogHeader>
                        <Input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                        <Input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
                        <Input type="text" placeholder="URL" onChange={(e) => setUrl(e.target.value)} value={url} />
                        <p className="text-xs text-slate-500 italic">Testing URL : http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4</p>
                        <DialogFooter>
                            <Button className="w-full" disabled={title === "" || description === "" || url === ""} onClick={handlePostVideo}>{loading ? "Loading.." : "Upload"}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Badge variant="outline" className="h-10 rounded-md flex gap-2">
                    <Image
                        src={Profile}
                        alt="Picture of the author"
                        className="w-4 relative"
                    />
                    <p>Scott Shaw</p>
                </Badge>
            </div>
        </div>
    )
}