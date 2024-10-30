import pool from './db';

export default async function getThreadsAndReplies(thread_id) {
    try {
        // Use parameterized query to avoid SQL injection
        const [rows] = await pool.query('SELECT * FROM threads WHERE id = ?', [thread_id]);
        const [replies] = await pool.query('SELECT * FROM replies WHERE thread_id = ?', [thread_id]);
        return [rows, replies]; // Return the threads for the given board
    } catch (error) {
        console.error('Error fetching boards:', error);
        throw new Error('Could not fetch boards');
    }
}
