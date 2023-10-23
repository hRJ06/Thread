import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { UserButton, currentUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
 
export default async function Home() {
  const result = await fetchThreads(1,30);
  const user = await currentUser();
  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {
          !result.threads.length ? (
            <p className="no-result">No Threads found</p>
          ) : (
            <>
              {result.threads.map((post) => (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ""}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              ))}
            </>
          )
        }
      </section>
    </>
  )
}