import MusicCard from "@/components/MusicCard";
import SNLogo from "@/components/SNLogo";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.from("musics").select("*");

  return (
    <main className="px-4 sm:px-16">
      <div className="w-full py-4 flex text-center mb-6 justify-between">
        <SNLogo />
        <h1 className="text-2xl bg-gradient-to-b from-green-300 to-green-600 inline-block text-transparent bg-clip-text font-black select-none">
          mpeg3
        </h1>
      </div>
      <h1 className="text-xl font-bold border-b pb-1 mb-4 border-stone-600">
        Music
      </h1>
      <div className="grid gap-2 grid-cols-3 sm:grid-cols-5 md:grid-cols-7 h-full">
        {data?.map((music) => (
          <MusicCard
            key={music.id}
            poster={music.poster}
            name={music.name}
            id={music.id}
          />
        ))}
      </div>
    </main>
  );
}
