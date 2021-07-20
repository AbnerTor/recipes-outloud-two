import React from "react";
import useSpeech from "../utils/useSpeech";


function SpeakButton(props) {
    const { wordsToSpeak } = props;
    const { speak }= useSpeech();

    return (

        <button

            className='bg-blue-800 rounded text-white w-40 clear-both'
            onClick={() => speak(wordsToSpeak)}>
            Out-Loud
        </button>

    )
}
export default SpeakButton;