import { useRecoilValue } from "recoil"
import { touchState } from "../recoil/atom"
import { useEffect, useRef } from "react";


export const Music = () => {


    const touchStateValue = useRecoilValue(touchState);
    const audioRef = useRef<HTMLAudioElement | null>(null);


    // Referencing audio and initializing it whenever touchStateValue changes
    useEffect(()=>{
        if(audioRef.current){
            if(touchStateValue){
                audioRef.current.currentTime = 8;
                audioRef.current.play();
            }else{
                audioRef.current.pause()
                audioRef.current.currentTime = 8;
            }
        }
    }, [touchStateValue])


    return <div>

        <audio ref={audioRef} loop>
            <source src="intmusic.mp3"/>
        </audio>

    </div>
}