"use client";
import { useEffect, useState } from 'react';

export default function Boards() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await fetch('/api/boards');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBoards(data); // data is an array of boards
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBoards();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!boards || boards.length === 0) {
        return <p>No boards available.</p>;
    }

    return (
        <div className='mb-4'>
            <div className='bg-[#38BDF8] text-white font-extrabold md:text-xl text-md p-2 border-black dark:border-white border-2'>
                <h1>Boards</h1>
            </div>
            <div className='bg-orange-100 dark:bg-slate-950 p-2 border border-black dark:border-white text-sm grid grid-cols-4 gap-2'>
                {boards.map((board, index) => (
                    <div key={board.id} className="column">
                        <a href={`posts/${board.id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">
                            <h3 className="underline text-md text-[#005e86] dark:text-[#38BDF8]">
                                {index + 1}. {board.name}
                            </h3>
                        </a>
                    </div>
                ))}
            </div>
        </div>


    );
}
