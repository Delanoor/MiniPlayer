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
  const [trackIndex, setTrackIndex] = useState(0);
  const track = tracks[trackIndex];
  const [isPlaying, setIsPlaying] = useState(false);

  const constraintRef = useRef();

  const audioRef = useRef();
  const [trackDuration, setTrackDuration] = useState(null);
  const [trackProgress, setTrackProgress] = useState(0);
  const trackProgressPercentageRef = useRef();
  const currentTrackPercentage = trackDuration
    ? (trackProgress / trackDuration) * 100
    : "0%";

  const [mute, setMute] = useState(false);

  const [volume, setVolume] = useState(100);

  const startTimer = () => {
    clearInterval(trackProgressPercentageRef.current);

    trackProgressPercentageRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleSkipForward();
      }
      setTrackProgress(audioRef.current.currentTime);
    }, [1000]);
  };

  const handleSkipBack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const handlePlay = () => {
    setIsPlaying((isPlaying) => !isPlaying);
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
    setMute((mute) => !mute);
  };

  const handleTrackProgress = (val) => {
    audioRef.current.currentTime = val;
    setTrackProgress(audioRef.current.currentTime);
  };

  useEffect(() => {
    audioRef.current = new Audio(track.audioSrc);
    audioRef.current.addEventListener("loadeddata", () => {
      setTrackDuration(audioRef.current.duration);
    });

    // keyboard events

    const handleKeyboard = (e) => {
      if (e.code === "Space") {
        setIsPlaying((isPlaying) => !isPlaying);
      }
    };
    window.addEventListener("keydown", handleKeyboard);
    return () => {
      audioRef.current.pause();
      window.removeEventListener("keydown", handleKeyboard);
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
      startTimer();
    } else {
      setIsPlaying(false);
    }
  }, [trackIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden text-neutral-800">
      <div
        ref={constraintRef}
        className={`${
          isPlaying
            ? " animate-[rotateColor_50s_alternate_infinite]"
            : `grayscale`
        } w-full h-full absolute z-10 bg-cover bg-center  
        
        `}
        style={
          // isPlaying
          //   ? { backgroundImage: "" }
          //   :
          { backgroundImage: `url(${track.imageUrl})` }
        }
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
                value={volume}
                defaultValue={100}
                onChange={(e) => handleVolumeChange(e.target.value)}
                className="translate-x-[-23%] translate-y-[-10%] rotate-[-90deg] appearance-none rounded-xl h-2 bg-white-200 cursor-pointer"
              />
            </div>
            <div className="left-[0%] bottom-[3%] absolute">
              <FaVolumeUp
                className="w-[3em] h-[3em] translate-x-[70%] cursor-pointer fill-slate-50"
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
        className="z-50 flex flex-col w-[35vw] max-w-[35rem] min-w-[25rem] h-[15rem] md:h-full max-h-[60rem] min-h-[40rem] 
      rounded-[3.1rem] overflow-clip
      bg-white/30
      backdrop-filter
      backdrop-blur-[9px]
      hover:cursor-grab
      active:cursor-grabbing
      "
      >
        <div className="flex w-full h-[70%] justify-center items-center overflow-hidden ">
          {/* image */}
          <div
            className="w-[60%] aspect-square bg-cover bg-center rounded-[50%] drop-shadow-lg outline outline-neutral-100 outline-offset-[1em] outline-[0.13em]"
            style={{
              backgroundImage: `url(${track.imageUrl})`,
            }}
          />
        </div>

        {/* card body */}
        <div className="text-[0.7rem] md:text-[1rem] flex flex-1 flex-col justify-around mt-3 bg-opacity-50">
          <div className="">
            <div className="text-[2.5em] text-center">{track.title}</div>
            <div className="text-[1.4em] text-center font-light mb-3">
              {track.artist}
            </div>

            {/* trackProgress */}
            <div className="w-full">
              <input
                type="range"
                step="1"
                min="0"
                value={trackProgress}
                max={trackDuration ? trackDuration : `${trackDuration}`}
                onChange={(e) => handleTrackProgress(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-row justify-around mt-3 text-white mb-3">
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
