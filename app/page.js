import { Analytics } from "@vercel/analytics/react"
import Header from '@/components/Home_Header.jsx';
import Boards from '@/components/Boards';
import Popular_Posts from "@/components/Popular_Posts";
import Stats from '@/components/Stats';
import Footer from "@/components/Footer";
import getBoards from '@/lib/getBoards';

export default async function Home() {
  let boards = [];

  try {
    boards = await getBoards();
  } catch (error) {
    console.error('Error fetching data:', error);
    // Optionally handle the error (e.g., set empty arrays or show an error message)
  }

  return (
    <div className="bg-yellow-50 min-h-[100dvh] dark:bg-slate-950">
      <Analytics />
      <div className="w-full max-w-[900px] min-h-4 m-auto md:p-10 p-3">
        <Header />
        <Boards  />
        <Popular_Posts />
        <Stats />
        <Footer />
      </div>
    </div>
  );
}
