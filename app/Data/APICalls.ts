export async function getAllVideos() {
    const res = await fetch(process.env.NEXT_PUBLIC_GET_VIDEOS_API_URL! + process.env.NEXT_PUBLIC_USER!, {
        method: "GET"
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export async function getAllCommentsPerVideo(videoId: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_GET_COMMENTS_PER_VIDEO_API_URL + videoId, {
        method: "GET"
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export async function submitComment(comment: string, videoId: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_POST_COMMENTS_API_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            video_id: videoId,
            content: comment,
            user_id: process.env.NEXT_PUBLIC_USER
        })
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export async function postAllVideos(title: string, description: string, url: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_POST_VIDEO_API_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: process.env.USER,
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