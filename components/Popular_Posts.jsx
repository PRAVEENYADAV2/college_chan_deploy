"use client";
import { useEffect, useState } from 'react';

const Popular_Posts = () => {
    const [popular_threads, setPopularThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularThreads = async () => {
            try {
                const response = await fetch('/api/topEight');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPopularThreads(data); // Assuming data is an array of threads
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPopularThreads();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!popular_threads || popular_threads.length === 0) {
        return <p>No popular posts available.</p>;
    }

    return (
        <div className="mb-1">
            <div className='bg-[#38BDF8] text-white font-extrabold md:text-xl text-md p-2 border-black dark:border-white border-2'>
                <h1>Popular Posts</h1>
            </div>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 gap-2 md:p-5 p-2 border border-black dark:border-white">
                {popular_threads.map((thread) => (
                    <a href={`/thread/${thread.id}`} key={thread.id} className="group">
                        <div>
                            <div className="board text-center font-bold">
                                <h1>{thread.name}</h1>
                            </div>
                            <div className="max-h-[200px] overflow-hidden thumbnail w-full">
                                <img src={thread.image_path} alt={thread.title} />
                            </div>
                            <h4 className="text-[#005E86] group-hover:text-[#4dc2f6] discription font-bold">
                                {thread.title}
                            </h4>
                            <p>{thread.content}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Popular_Posts;
