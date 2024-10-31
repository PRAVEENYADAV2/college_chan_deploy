import Header from '@/components/Home_Header.jsx';
import Boards from '@/components/Boards';
import Popular_Posts from "@/components/Popular_Posts";
import Stats from '@/components/Stats';
import Footer from "@/components/Footer";
import getBoards from '@/lib/getBoards';
import getTopEightThreads from '@/lib/getTopEightThreads';

export default async function Home() {
  let boards = [];
  let popular_threads = [];

  try {
    boards = await getBoards();
    popular_threads = await getTopEightThreads();
  } catch (error) {
    console.error('Error fetching data:', error);
    // Optionally handle the error (e.g., set empty arrays or show an error message)
  }

  return (
    <div className="bg-yellow-50 min-h-[100dvh] dark:bg-slate-950">
      <div className="w-full max-w-[900px] min-h-4 m-auto md:p-10 p-3">
        <Header />
        <Boards boards={boards} />
        <Popular_Posts popular_threads={popular_threads} />
        <Stats />
        <Footer />
      </div>
    </div>
  );
}
