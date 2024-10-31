import getTopEightThreads from '@/lib/getTopEightThreads';
import { NextResponse } from 'next/server';


export async function GET() {
    try {
        const threads = await getTopEightThreads();
        return NextResponse.json(threads);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Failed to fetch boards' }, { status: 500 });
    }
}