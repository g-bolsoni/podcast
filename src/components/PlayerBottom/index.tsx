"use client"
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { usePlayer } from "../../contexts/PlayerContext";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

export function PlayerBottom() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);

    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        togglePlay,
        setIsPlayingState,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        isLooping,
        toggleLoop,
        toggleShuffle,
        isShuffling,
        clearPlayerState
    } = usePlayer();

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime))
        })
    }

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount)
    }

    function handleEpisodeEnded() {
        {
            hasNext ? (
                playNext()
            ) : (
                clearPlayerState()
            )
        }
    }

    const episode = episodeList[currentEpisodeIndex];

    return (
        <footer className={`border-t-2 border-gray-100 bg-white w-full flex items-center justify-between gap-3 px-2 lg:px-6 transition-all max-h-20 h-24 lg:h-20 opacity-100 visible duration-200 fixed bottom-0`} >
            <div className={`${episode ? 'lg:w-3/12' : 'lg:w-6-12'} w-full flex itens-start my-3`}>
                {episode ? (
                    <div className="flex items-start justify-center gap-3">
                        <Image
                            src={episode.thumbnail}
                            height={56}
                            width={56}
                            alt=""
                            className="rounded-xl w-14 h-14 object-cover"
                        />
                        <div className="flex flex-col">
                            <strong className="overflow-hidden text-ellipsis whitespace-nowrap inline-block w-40 md:w-60 2xl:w-80"> {episode.title} </strong>
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap inline-block w-40 md:w-60 2xl:w-80"> {episode.members} </span>
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <strong> Selecione um podcast para ouvir </strong>
                    </div>
                )}
            </div>

            {episode ? (
                <div className="w-full lg:w-7/12 inline-flex gap-3 absolute bottom-0 left-1 lg:relative">
                    <>
                        <span className="hidden lg:block"> {convertDurationToTimeString(progress)}</span>
                        <div className="w-full">
                            <Slider
                                max={episode.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                            />
                        </div>
                        <span className="hidden lg:block">{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                    </>
                </div>
            ) : ""}

            <div className={`${episode ? "w-2/12" : 'w-6/12'} flex items-center justify-end`}>
                {/* ----------------------------------TAG DE AUDIO INVISIBLE ----------------------------------------------------------------------*/}
                {episode && (
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        loop={isLooping}
                        onEnded={handleEpisodeEnded}
                        onLoadedMetadata={setupProgressListener}
                        onPlay={() => setIsPlayingState(true)}
                        onPause={() => setIsPlayingState(false)}
                    />
                )}
                {/* -------------------X--------------TAG DE AUDIO INVISIBLE --------------------------X-------------------------------------------*/}
                {/*Buttons */}
                <div className="flex items-center gap-3">
                    <button type="button" disabled={!episode || episodeList.length === 1} onClick={toggleShuffle} className={`hidden lg:block bg-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-200 hover:brightness-70 ${isShuffling ? "invert-[.35] sepia saturate-200 hue-rotate-180" : ''}`}>
                        <img src="/shuffle.svg" alt="Aleatório" />
                    </button>
                    <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious} className="hidden lg:block bg-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-200 hover:brightness-70">
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type="button" className="bg-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-200 hover:brightness-70" disabled={!episode} onClick={togglePlay} >
                        {isPlaying
                            ? <img src="/pause.svg" alt="Pausar" />
                            : <img src="/play.svg" alt="Tocar " />
                        }
                    </button>
                    <button type="button" disabled={!episode || !hasNext} onClick={playNext} className="hidden lg:block bg-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-200 hover:brightness-70" >
                        <img src="/play-next.svg" alt="Tocar proxima " />
                    </button>
                    <button type="button" disabled={!episode} onClick={toggleLoop} className={`hidden lg:block bg-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-200 hover:brightness-70 ${isLooping ? "invert-[.35] sepia saturate-200 hue-rotate-180" : ''} `}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </div>
        </footer >
    );
}