import { useEffect, useState } from "react";

const useSpeechSynthesis = (props = {}) => {
  const { onEnd = () => {} } = props;
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  const processVoices = voiceOptions => {
    setVoices(voiceOptions);
  };

  const getVoices = () => {
    if (window) {
      if (!!window.speechSynthesis) {
        // Firefox seems to have voices upfront and never calls the
        // voiceschanged event
        let voiceOptions = window.speechSynthesis.getVoices();
        if (voiceOptions.length > 0) {
          processVoices(voiceOptions);
          return;
        }

        window.speechSynthesis.onvoiceschanged = event => {
          voiceOptions = event.target.getVoices();
          processVoices(voiceOptions);
        };
      } else {
        processVoices([]);
      }
    } else {
      processVoices([]);
    }
  };

  const handleEnd = () => {
    setSpeaking(false);
    onEnd();
  };

  useEffect(() => {
    getVoices();
  }, []);

  const speak = (args = {}) => {
    const { voice = null, text = "" } = args;

    setSpeaking(true);

    if (
      window &&
      !!window.speechSynthesis &&
      !!window.SpeechSynthesisUtterance
    ) {
      // Firefox won't repeat an utterance that has been
      // spoken, so we need to create a new instance each time
      const utterance = new window.SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.voice = voice;
      utterance.onend = handleEnd;
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(handleEnd, 0);
    }
  };

  const cancel = () => {
    setSpeaking(false);

    if (window && !!window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return {
    cancel,
    speak,
    speaking,
    voices
  };
};

export default useSpeechSynthesis;
