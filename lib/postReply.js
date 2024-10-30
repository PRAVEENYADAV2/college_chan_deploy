import pool from './db';

export default async function postReply(thread_id, ip_address, content, image_path) {
    try {
        const query = `
            INSERT INTO replies (thread_id, ip_address, content, image_path)
            VALUES (?, ?, ?, ?);
        `;
        
        // Using pool to execute the query with the provided parameters
        const [result] = await pool.execute(query, [thread_id, ip_address, content, image_path]);

        // Return the result or something meaningful
        return result;
    } catch (error) {
        console.error('Error posting reply:', error);
        throw error;  // Re-throw the error for the calling function to handle
    }
}
