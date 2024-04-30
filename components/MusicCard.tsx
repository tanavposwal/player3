import Link from "next/link";

export default function MusicCard({
  poster,
  name,
  id,
}: {
  poster: string;
  name: string;
  id: number;
}) {
  return (
    <Link href={"/player/" + id} className="w-fit h-fit">
      <div className="flex flex-col gap-1 items-center w-fit hover:scale-105 transition-all active:scale-95 active:opacity-75 select-none duration-75">
        <img src={poster} alt="poster" className="w-32 rounded-md" draggable='false' />
        <h4 className="font-semibold text-stone-300">{name}</h4>
      </div>
    </Link>
  );
}
