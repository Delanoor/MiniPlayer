import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState, useRef } from "react";
import {
  FiSkipBack,
  FiSkipForward,
  FiPlayCircle,
  FiPauseCircle,
} from "react-icons/fi";

function AudioPlayer({ tracks }) {
  // console.log(
  //   "🚀 ~ file: AudioPlayer.js ~ line 2 ~ AudioPlayer ~ tracks",
  //   tracks
  // );

  const [trackIndex, setTrackIndex] = useState(0);
  const track = tracks[trackIndex];
  const [isPlaying, setIsPlaying] = useState(false);

  // const audioRef = useRef(
  //   typeof Audio !== "undefined" && new Audio(track.audioSrc)
  // );
  const audioRef = useRef(null);
  // console.log(
  //   "🚀 ~ file: AudioPlayer.js ~ line 22 ~ AudioPlayer ~ audioRef",
  //   audioRef.current
  // );
  const audioLoaded = useRef(false);
  console.log(
    "🚀 ~ file: AudioPlayer.js ~ line 30 ~ AudioPlayer ~ audioLoaded",
    audioLoaded.current
  );

  const handleSkipBack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const handlePlay = () => {
    // if (isPlaying) {
    //   audioRef.current.pause();
    //   setIsPlaying(!isPlaying);
    // } else {
    //   audioRef.current.play();
    //   setIsPlaying(!isPlaying);
    // }
    setIsPlaying(!isPlaying);
  };

  const handleSkipForward = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  useEffect(() => {
    audioRef.current = new Audio(track.audioSrc);
    return () => {
      audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(track.audioSrc);

    // if it was running, start playing
    if (isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      setIsPlaying(false);
    }
  }, [trackIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="w-full h-full flex justify-center items-center bg-white">
      <div className="flex flex-col w-[35vw] max-w-[35rem] min-w-[20rem] h-full max-h-[60rem] min-h-[40rem] rounded-[2.8rem] overflow-clip bg-black">
        <div
          className="w-full h-[70%] overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${track.imageUrl})` }}
        ></div>
        <div className="text-[0.7rem] md:text-[1rem] flex flex-1 flex-col justify-around mt-3 ">
          <div>
            <div className="text-[2.5em] text-center">{track.title}</div>
            <div className="text-[1.4em] text-center font-light">
              {track.artist}
            </div>
          </div>
          {/* Controls */}
          <div className="flex flex-row justify-around mt-3">
            <div className="flex items-center">
              <FiSkipBack
                className="w-[3em] h-[3em] hover:cursor-pointer"
                onClick={handleSkipBack}
              />
            </div>

            <div className="mb-3">
              {isPlaying ? (
                <FiPauseCircle
                  className="w-[6em] h-[6em] hover:cursor-pointer"
                  onClick={handlePlay}
                />
              ) : (
                <FiPlayCircle
                  className="w-[6em] h-[6em] hover:cursor-pointer"
                  onClick={handlePlay}
                />
              )}
            </div>
            <div className="flex items-center">
              <FiSkipForward
                className="w-[3em] h-[3em] hover:cursor-pointer"
                onClick={handleSkipForward}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
