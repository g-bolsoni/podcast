import {  createContext, ReactNode, useContext, useState } from "react";

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play:(episode:Episode) => void;
    togglePlay:() => void;
    setIsPlayingState:(state) => void;
    playList:(list: Episode[], index: number) =>void;
    playNext:()=> void;
    playPrevious:() => void;
    toggleLoop:() => void;
    toggleShuffle:() => void;
    clearPlayerState:() => void;   
    isLooping: boolean;
    isShuffling: boolean;
    hasPrevious: boolean;
    hasNext: boolean;

}

export const PlayerContext = createContext({} as PlayerContextData);



type PlayerContextProviderProps = { 
  children: ReactNode;
}


export function PlayerContextProvider({children}: PlayerContextProviderProps){
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);



    /*------------------------------------------------Play the episode ----------------------------------*/
  
    function play(episode){
      setEpisodeList([episode])
      setCurrentEpisodeIndex(0)
      setIsPlaying(true);
    }

    function playList(list: Episode[], index: number){
      setEpisodeList(list)
      setCurrentEpisodeIndex(index)
      setIsPlaying(true);
    }
  
    function togglePlay(){
      setIsPlaying(!isPlaying); 
    }
    function setIsPlayingState(state: boolean){
      setIsPlaying(state)
    }
    /*--------------------X----------------------------Play the episode ----------------X------------------*/
    /*------------------------------------------------Next and ant episode ----------------------------------*/
    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex +1 ) < episodeList.length

    function playNext(){
      if(isShuffling){
        const nextRandomEpisodeIndex = Math.floor( Math.random() * episodeList.length );

        setCurrentEpisodeIndex(nextRandomEpisodeIndex)

      }else if(hasNext){
        setCurrentEpisodeIndex(currentEpisodeIndex + 1)
      }


    }
    function playPrevious(){
      { hasPrevious  && (
        setCurrentEpisodeIndex(currentEpisodeIndex + 1)
      )}

    }

    /*---------------------X---------------------------Next and ant episode ---------------X-------------------*/
    /*------------------------------------------------Loop the episode ----------------------------------*/
      function toggleLoop(){
        setIsLooping(!isLooping); 
      }
    /*-------------------------X-----------------------Loop the episode -----------------X-----------------*/
     /*------------------------------------------------Shoffle the episodes ----------------------------------*/
     function toggleShuffle(){
      setIsShuffling(!isShuffling); 
    }

    function clearPlayerState(){
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);

    }
    /*-------------------------X-----------------------Shoffle the episodes -----------------X-----------------*/
  

    return (
      <PlayerContext.Provider value={
            {episodeList,
            currentEpisodeIndex,
            play,
            isPlaying,
            togglePlay,
            setIsPlayingState,
            playNext,
            playPrevious,
            playList, 
            hasPrevious,
            hasNext,
            toggleLoop,
            isLooping,
            isShuffling,
            toggleShuffle,
            clearPlayerState,
            }
        }>
          {children}
      </PlayerContext.Provider>

    )
  
}


export const usePlayer = () => {
  return useContext(PlayerContext)
}