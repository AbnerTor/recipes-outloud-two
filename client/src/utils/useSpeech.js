const useSpeech = () => {
    const speak = (text) => {
        const utterance = new window.SpeechSynthesisUtterance();
        utterance.text = text;
        // utterance.voice = voice;
        // utterance.onend = handleEnd;
        utterance.rate = .7;
        // utterance.pitch = pitch;
        // utterance.volume = volume;
        window.speechSynthesis.speak(utterance);
    };
    return { speak };

};

export default useSpeech;
