import getThreadsAndReplies from "@/lib/getThreadsAndReplies";
import { format } from "date-fns";
import ReplyForm from "@/components/replyForm";
import TrackIP from "@/components/TrackIP";  // Import the IP tracking component
// lib/ipCrypto.ts
import { createHmac } from 'crypto';

// Get secret from environment variables (NEVER hardcode)
const SECRET = process.env.IP_ENCRYPTION_SECRET || 'default-secret-unsafe';

export function encryptIP(ip) {
    const hmac = createHmac('sha256', SECRET);
    hmac.update(ip);
    return hmac.digest('base64url').substring(0, 10);
}
export default async function Page({ params }) {
    // Fetching thread and replies
    const { id } = await params;  // Await the params object
    const threadId = +id;  // Now you can use id safely
    const [thread, replies] = await getThreadsAndReplies(threadId);

    // console.log(replies)
    return (
        <div className="max-w-5xl mx-auto sm:p-6 p-2">
            <TrackIP threadId={threadId} />

            {/* Thread Section */}
            <div className="bg-white dark:bg-black shadow-sm rounded-lg sm:p-6 p-2 mb-8 flex-col gap-3">
                {thread[0].image_path && (

                    <div className="">
                        <div className="overflow-hidden">
                            <div className=" sm:w-[300px] w-full">

                                <img
                                    src={thread[0].image_path}
                                    alt="Thread Image"
                                    className="max-w-[100%] mb-5 h-auto object-cover overflow-hidden rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{thread[0].title}</h1>
                        <p className="text-sm text-gray-600 mb-1 ">
                            Posted by <span className="font-bold text-blue-500">{thread[0].username}</span> on {format(new Date(thread[0].created_at), 'MMMM dd, yyyy')}
                            {` `} Views: {thread[0].views}
                        </p>
                        <p className="mb-2">{thread[0].content}</p>
                    </div>
                    <div>
                        <button className="bg-blue-600 p-2 text-white w-8 rounded-lg">{thread[0].id}</button>
                    </div>
                </div>
                <ReplyForm threadId={thread[0].id} whomToReply={`${thread[0].id} (OP)`} />
            </div>

            {/* Replies Section */}
            <div className="bg-white dark:bg-black shadow-lg rounded-lg sm:p-6 p-2">
                <h2 className="text-xl font-semibold mb-6">Replies</h2>
                {replies.length > 0 ? (
                    replies.map((reply) => (
                        <div key={reply.id} className="mb-6">
                            <div className="flex w-full justify-between">
                                <p className="mb-2">{reply.content}</p>
                                <div className="mb-2">
                                    <button className="bg-blue-600 p-2 text-white w-8 rounded-lg">{reply.id}</button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <img src={reply.image_path} className="sm:w-[200px] w-full rounded-md" />
                                {/* <p>{reply.image_path}</p> */}
                            </div>

                            <small className="text-gray-500">
                                Posted by {encryptIP(reply.ip_address)} on {format(new Date(reply.created_at), 'MMMM dd, yyyy, hh:mm a')}
                            </small>
                            <ReplyForm threadId={thread[0].id} whomToReply={`${reply.id}`} />
                            <hr className="my-4" />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No replies yet.</p>
                )}
            </div>
        </div>
    );
}
