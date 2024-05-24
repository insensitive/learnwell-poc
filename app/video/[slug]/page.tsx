import { getAllCommentsPerVideo, getAllVideos } from "@/app/Data/APICalls";
import { commentObject, videoObject } from "@/app/Types/DataTypes";
import Video from "next-video";
import {
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { CommentInput } from "@/app/UI/CommentInput";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { videos } = await getAllVideos();
  const filteredVideo = videos.filter(
    (video: videoObject) => video.id === params.slug
  )[0];
  const data = await getAllCommentsPerVideo(filteredVideo.id);
  return (
    <div className="p-10 w-full md:w-2/3 flex flex-col gap-5 m-auto self-center">
      <div className="flex flex-col gap-2">
        <CardTitle>{filteredVideo.title}</CardTitle>
        <CardDescription>{filteredVideo.description}</CardDescription>
        <CardDescription className="mt-[-5px] text-slate-700 font-semibold">
          Uploaded By :{" "}
          {filteredVideo.user_id
            .split("_")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </CardDescription>
      </div>
      <Video src={filteredVideo.video_url} />
      <div className="flex flex-col gap-2">
        <CommentInput videoId={filteredVideo.id} />
        <div>
          {data.comments.reverse().map((comment: commentObject) => (
            <div className="border rounded-md border-dashed border-black p-3 mb-2">
              <p>{comment.content}</p>
              <p className="text-slate-500 text-xs">
                By :{" "}
                {comment.user_id
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
