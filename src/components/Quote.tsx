import { useRecoilValue } from "recoil";
import { touchState } from "../recoil/atom";
import axios from "axios";
import { useEffect, useState } from "react";


export const Quote = () => {


    // State variables
    const [quote, setQuote] = useState(null);
    const [visible, setVisible] = useState(false); 
    const touchStateValue = useRecoilValue(touchState);

    
    // Fetching quote from api after every 5 secons i.e 5000ms
    useEffect(() => {
        let timer: number | null = null;
        if (touchStateValue) {

            // I have used a free and open source api for the quote generation
            axios.get("https://api.quotable.io/quotes/random?tags=life")
                .then(response => {
                    setQuote(response.data[0].content);
                    setVisible(true);
                })
                .catch(err => console.error(err));
            timer = setInterval(() => {
                axios.get("https://api.quotable.io/quotes/random?tags=life")
                    .then(response => {
                        setQuote(response.data[0].content);
                        setVisible(true); 
                    })
                    .catch(err => console.error(err));
            }, 5000);
        }
        return () => {
            if (timer !== null) {
                clearInterval(timer);
            }
        };
    }, [touchStateValue]);

    
    // To handle smooth animation of quotes
    useEffect(() => {
        if (visible) {
            const timeout = setInterval(() => {
                setVisible(false);
            }, 3000);
            return () => clearInterval(timeout);
        }
    }, [quote, visible]);


    return (
        <div className="flex h-36 items-center justify-center sm:px-4 px-8 sm:py-10 py-14">

            <p
                className={`max-w-md text-center text-lg sm:font-medium font-semibold text-[#F26240] transition-opacity duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
                hidden={!touchStateValue}
            >
                {quote ? quote : ""}
            </p>

        </div>
    );
};
