import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { barState, touchState } from "../recoil/atom";

export const Timer = () => {

    // State variables
    const [bar, setBar] = useRecoilState(barState);
    const [touch, setTouch] = useRecoilState(touchState);
    const [fillPercentage, setFillPercentage] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);


    // Handling bar fillup
    const handleMouseDown = () => setTouch(true);
    const handleMouseUp = () => setTouch(false);


    // Calculating bar filling
    useEffect(() => {
        let interval: number | null = null;
        if (touch) {
            interval = setInterval(() => {
                setFillPercentage((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval!);
                        setBar(true);
                        setTouch(false);
                        return 100;
                    }
                    return prev + 0.5;
                });
            }, 150);
        } else {
            clearInterval(interval!);
            setFillPercentage(0);
        }
        return () => clearInterval(interval!);
    }, [touch, setBar, setTouch]);


    // Setting timestamp to the local-storage
    useEffect(() => {
        if (bar) {
            const prevTime = localStorage.getItem("barTimeRemaining");
            if (!prevTime) {
                localStorage.setItem("barTimeRemaining", Date.now().toString());
            }
        }
    }, [bar, timeRemaining])


    // Calculating remaining time
    useEffect(() => {
        const storedTime = localStorage.getItem("barTimeRemaining");
        if (storedTime) {
            const elapsedTime = Date.now() - Number(storedTime);
            const remainingTime = 86400000 - elapsedTime; 
            if (elapsedTime >= 86400000) {
                setBar(false)
                localStorage.removeItem("barTimeRemaining")
            } else {
                setBar(true)
                setTimeRemaining(remainingTime);
            }
        }
    }, [setBar, bar, timeRemaining])


    // Counting time backwards after each second i.e 1000ms
    useEffect(() => {
        let interval: number | null = null;
        if (bar && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(interval!);
                        setBar(false);
                        localStorage.removeItem("barTimeRemaining");
                        return 0;
                    }
                    return prevTime - 1000;
                });
            }, 1000);
        }
        return () => clearInterval(interval!);
    }, [bar, timeRemaining, setBar]);


    // Formattung time to make it human readble and understandable form
    const formatTime = (ms: number) => {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${hours}hr : ${minutes < 10 ? "0" : ""}${minutes}min : ${seconds < 10 ? "0" : ""}${seconds}sec`;
    };


    return (
        <div className="flex flex-col items-center justify-center py-4">

            <div className="pb-10 h-20 justify-center flex flex-col items-center">
                <p hidden={!bar}>Come back after</p>
                <p hidden={!bar} className="font-extralight pt-2">{formatTime(timeRemaining)}</p>
            </div>

            <div
                className={`font-light h-72 w-32 rounded-2xl border-2 relative overflow-hidden flex justify-center items-center ${bar ? 'bg-gray-200 border-gray-700 border-dashed pointer-events-none' : ' border-[#012E41]'}`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
            >

                <div
                    className={`absolute bottom-0 left-0 w-full transition-all ${bar ? 'bg-gray-400' : 'bg-[#F26240]'}`}
                    style={{ height: `${fillPercentage}%` }}
                />
                <span
                    hidden={touch}
                    className={`z-10 ${bar ? 'text-gray-700' : 'text-[#012E41]'}`}
                >
                    {bar ? "all the best" : "hold here"}
                </span>
                
            </div>

        </div>
    );
};
