export type videoObject = {
    created_at: string,
    video_url: string,
    user_id: string,
    description: string,
    title: string,
    num_comments: number,
    id: string
}

export type commentObject = {
    created_at: string,
    content: string,
    user_id: string,
    video_id: string,
    id: string
}