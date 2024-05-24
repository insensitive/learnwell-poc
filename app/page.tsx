import { getAllVideos } from "./Data/APICalls";
import { videoObject } from "./Types/DataTypes";
import { NewVideoDialog } from "./UI/NewVideoDialog";
import { VideoCard } from './UI/VideoCard';

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
