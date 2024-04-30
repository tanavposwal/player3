"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaArrowsRotate, FaArrowRightFromBracket } from "react-icons/fa6";
import { ImSpinner5 } from "react-icons/im";
import Link from "next/link";

export default function Player() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [isReady, setIsReady] = useState(true);
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
        updateDuration()
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
      <div className="w-full min-h-screen flex flex-col select-none">
        {/* image */}
        <div className="w-screen flex flex-col items-center justify-center my-28">
          <div className="flex relative">
          <img
            src="https://static.mytuner.mobi/media/tvos_radios/cVVcTMJBcm.png"
            alt="mirchi"
            className={"w-72 h-72 absolute transition blur-3xl "+(isPlaying && "animate-pulse")}
          />
          <img
            src="https://static.mytuner.mobi/media/tvos_radios/cVVcTMJBcm.png"
            alt="mirchi"
            className="w-72 h-72 rounded-lg z-10"
          />
          </div>
          <div className="pt-8 flex flex-col items-center">
              <span className="text-3xl bg-gradient-to-b from-white to-stone-700 inline-block text-transparent bg-clip-text font-black">Radio Mirchi</span>
          </div>
        </div>
        
        {/* controller */}
        <div className="flex">
            <div>
              <div className="w-screen flex flex-col items-center gap-8">
  
                <div className="flex items-center justify-center gap-16">
                  <Link href="/" className="text-2xl hover:text-stone-500 transition-colors"><FaArrowRightFromBracket /></Link>
  
                  <button
                    onClick={togglePlay}
                    className="text-4xl hover:scale-110 transition-transform cursor-pointer active:scale-90 active:text-stone-600"
                    disabled={!isReady}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
  
                  <button className="text-2xl hover:text-stone-500 transition-colors"><FaArrowsRotate /></button>
                </div>
              </div>
            </div>
        
        </div>
        
        <audio ref={audioRef} autoPlay title="Radio Mirchi">
          <source src="http://peridot.streamguys.com:7150/Mirchi" />
        </audio>
      </div>
    );
  }
  