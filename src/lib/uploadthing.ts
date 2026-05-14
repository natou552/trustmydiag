import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  medicalUploader: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 5 },
    image: { maxFileSize: "16MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(`[upload] userId=${metadata.userId} file=${file.name} key=${file.key} url=${file.url.substring(0, 50)}`);
      return { userId: metadata.userId, url: file.url, key: file.key };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
