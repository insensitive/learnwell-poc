'use server'
import { revalidatePath } from 'next/cache'
export default async function revalidateHomePage() {
  revalidatePath('/')
}
export async function revalidateVideoPath(videoId : string) {
  revalidatePath(`/video/${videoId}`)
}