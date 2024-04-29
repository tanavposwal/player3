"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { ImSpinner5 } from "react-icons/im";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const updateDuration = () => {
      if (audioRef.current) {
        setTotalDuration(audioRef.current.duration);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateTime);
      audioRef.current.addEventListener("durationchange", updateDuration);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateTime);
        audioRef.current.removeEventListener("durationchange", updateDuration);
      }
    };
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleCanPlayThrough = () => {
    setIsReady(true);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
        audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      
      <div className="w-screen flex flex-col items-center justify-center my-20">
        <div className="flex relative">
        <img
          src="https://pagalnew.com/coverimages/naina-crew-500-500.jpg"
          alt="naina poster"
          className="w-72 h-72 rounded-lg absolute blur-3xl"
        />
        <img
          src="https://pagalnew.com/coverimages/naina-crew-500-500.jpg"
          alt="naina poster"
          className="w-72 h-72 rounded-lg z-10"
        />
        </div>
        <div className="pt-8 flex flex-col items-center">
            <span className="text-2xl font-black">Naina</span>
            <div className="overflow-hidden w-fit px-20">
            <span className="text-sm text-stone-500 marquee">Diljit Dosanjh, Badshah</span>
            </div>
        </div>
      </div>
      
      {/* controller */}
      <div className="flex">
        {isReady ? (
          <div>
            <div className="w-screen flex flex-col items-center gap-8">
              <div className="scroller w-full max-w-xl flex gap-3 px-4 mt-4">
                <div className="text-sm text-stone-500 font-semibold flex w-fit">
                  <span>{formatTime(currentTime)}</span> /{" "}
                  <span>{formatTime(totalDuration)}</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max={audioRef.current?.duration || 0}
                  step="1"
                  value={currentTime}
                  onChange={handleTimeChange}
                  className="my-2 ml-2 music-player-range"
                  disabled={!isReady}
                />
              </div>

              <div className="flex items-center justify-center gap-16">
              <button className="text-lg hover:text-stone-300" onClick={() => {
                if (currentTime > 11) {
                setCurrentTime(currentTime-10)
                } else {
                    setCurrentTime(0)
                }
              }}>-10</button>
                <button
                  onClick={togglePlay}
                  className="text-4xl hover:scale-110 transition-transform cursor-pointer active:scale-90 active:text-stone-600"
                  disabled={!isReady}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button className="text-lg hover:text-stone-300"  onClick={() => {
                setCurrentTime(currentTime+10)
              }}>+10</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full py-6 flex items-center justify-center">
            <span className="animate-spin text-3xl text-stone-500">
              <ImSpinner5 />
            </span>
          </div>
        )}
      </div>
      
      <audio ref={audioRef} onLoadedData={handleCanPlayThrough}>
        <source src="http://pagalnew.com/download128/45972.mp3" />
      </audio>
    </div>
  );
}
