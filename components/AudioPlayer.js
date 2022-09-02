import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState, useRef } from "react";
import {
  FiSkipBack,
  FiSkipForward,
  FiPlayCircle,
  FiPauseCircle,
} from "react-icons/fi";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

function AudioPlayer({ tracks }) {
  // console.log(
  //   "🚀 ~ file: AudioPlayer.js ~ line 2 ~ AudioPlayer ~ tracks",
  //   tracks
  // );

  const [trackIndex, setTrackIndex] = useState(0);
  const track = tracks[trackIndex];
  const [isPlaying, setIsPlaying] = useState(false);
  const constraintRef = useRef();

  const audioRef = useRef();
  const [mute, setMute] = useState(false);

  const audioLoaded = useRef(false);
  // console.log(
  //   "🚀 ~ file: AudioPlayer.js ~ line 30 ~ AudioPlayer ~ audioLoaded",
  //   audioLoaded.current.volume
  // );

  const [volume, setVolume] = useState(100);

  const handleSkipBack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkipForward = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const handleVolumeChange = (val) => {
    setVolume(val);
    audioRef.current.volume = val / 100;
  };

  const handleMute = () => {
    setMute(!mute);
  };
  useEffect(() => {
    audioRef.current = new Audio(track.audioSrc);
    return () => {
      audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    if (mute) {
      audioRef.current.volume = 0;
    } else if (!mute) {
      audioRef.current.volume = 1;
    }
  }, [mute]);

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
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
      <div
        ref={constraintRef}
        className="w-full h-full absolute z-10 bg-cover bg-center grayscale
         
         "
        style={{
          backgroundImage: `url(${track.imageUrl})`,
        }}
      />

      {/* Volume control */}
      <div className="z-30">
        {mute ? (
          <div className="transition duration-1000 hover:cursor-pointer">
            <div className="left-[0%] bottom-[3%] absolute hover:cursor-pointer">
              <FaVolumeMute
                className="w-[3em] h-[3em] translate-x-[70%]"
                onClick={handleMute}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="transition duration-1000 absolute left-[0%] bottom-[15%] hover:cursor-pointer">
              <input
                type="range"
                step={1}
                min={0}
                defaultValue={100}
                onChange={(e) => handleVolumeChange(e.target.value)}
                className="translate-x-[-23%] translate-y-[-10%] rotate-[-90deg] appearance-none rounded-xl h-2 bg-gray-200 cursor-pointer"
              />
            </div>
            <div className="left-[0%] bottom-[3%] absolute">
              <FaVolumeUp
                className="w-[3em] h-[3em] translate-x-[70%] cursor-pointer"
                onClick={handleMute}
              />
            </div>
          </>
        )}
      </div>

      {/* card */}
      <motion.div
        drag
        dragConstraints={constraintRef}
        className="z-50 flex flex-col w-[35vw] max-w-[35rem] min-w-[25rem] h-[10rem] md:h-full max-h-[60rem] min-h-[40rem] 
      rounded-[2.1rem] overflow-clip
      bg-transparent
      border-[0.3em]
      border-blue-300
      backdrop-blur-[9px]
      hover:cursor-grab
      active:cursor-grabbing
      
      "
      >
        <div
          className="w-full h-[70%] overflow-hidden bg-cover bg-center brightness-90"
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
                className="w-[3em] h-[3em] hover:cursor-pointer stroke-1 hover:stroke-2"
                onClick={handleSkipBack}
              />
            </div>

            <div className="mb-3">
              {isPlaying ? (
                <FiPauseCircle
                  className="w-[6em] h-[6em] hover:cursor-pointer stroke-[0.6] hover:stroke-[1.3]"
                  onClick={handlePlay}
                />
              ) : (
                <FiPlayCircle
                  className="w-[6em] h-[6em] hover:cursor-pointer stroke-[0.6] hover:stroke-[1.3]"
                  onClick={handlePlay}
                />
              )}
            </div>
            <div className="flex items-center">
              <FiSkipForward
                className="w-[3em] h-[3em] hover:cursor-pointer stroke-1 hover:stroke-2"
                onClick={handleSkipForward}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AudioPlayer;
