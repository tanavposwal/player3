import MusicCard from "@/components/MusicCard";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.from("musics").select("*");

  return (
    <main>
      <div className="w-full py-4 text-center mb-6">
        <h1 className="text-3xl bg-gradient-to-b from-green-300 to-green-700 inline-block text-transparent bg-clip-text font-black">mpeg3</h1>
      </div>
      <div className="grid gap-2 grid-cols-3 sm:grid-cols-5 md:grid-cols-7 px-4 sm:px-16">
        {data?.map((music) => (
          <MusicCard
            key={music.id}
            poster={
              music.poster
            }
            name={music.name}
            id={music.id}
          />
        ))}
      </div>
    </main>
  );
}
