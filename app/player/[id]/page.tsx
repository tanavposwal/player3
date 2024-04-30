import Player from "@/components/Player";
import { createClient } from "@/utils/supabase/server";

export default async function Home({ params }: { params: { id: string } }) {

  const supabase = createClient();
  const { data }: {data: any} = await supabase.from("musics").select('*').match({id: params.id})
  
  if (data) {
  return (
    <>
      <Player name={data[0].name} author={data[0].author} link={data[0].stream_url} poster={data[0].poster} />
    </>
  )
  }
}
