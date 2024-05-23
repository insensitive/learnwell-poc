import { NewVideoDialog } from "./UI/NewVideoDialog";
import { VideoCard, videoObject } from './UI/VideoCard';

async function getAllVideos() {
  const res = await fetch('https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=scott_shaw', {
    method: "GET"
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home() {
  const { videos } = await getAllVideos()
  return (
    <main className="flex min-h-screen flex-wrap items-left gap-5 p-10 w-full">
      <NewVideoDialog />
      {videos.reverse().map((video: videoObject) =>
        <VideoCard videoObj={video} />
      )}
    </main>
  );
}
