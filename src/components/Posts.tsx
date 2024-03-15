import { revalidatePath } from "next/cache";
import { PageProps } from "@/app/page";
import { Pagination_ } from "./Pagination";
import { db } from "@/server/db";
import { PostCard } from "./PostCard";

const PAGE_SIZE = 20;

const fetchPost = async ({
  take = PAGE_SIZE,
  skip,
}: {
  take: number;
  skip: number;
}) => {
  "use server";

  const results = await db.post.findMany({
    take,
    skip,
    orderBy: {
      id: "asc",
    },
  });

  const total = await db.post.count();

  revalidatePath("/");

  return {
    data: results,
    metadata: {
      hasNextPage: skip + take < total,
      totalPages: Math.ceil(total / take),
    },
  };
};

export const Posts = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const take = PAGE_SIZE;
  const skip = (pageNumber - 1) * take;

  const { data: posts, metadata } = await fetchPost({ take, skip });

  return (
    <div className=" space-y-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      <Pagination_ {...props.searchParams} {...metadata} />
    </div>
  );
};
