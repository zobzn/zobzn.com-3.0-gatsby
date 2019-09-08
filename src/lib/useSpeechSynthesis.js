import { useEffect, useState } from "react";

const useSpeechSynthesis = (props = {}) => {
  const { onEnd = () => {} } = props;
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  const processVoices = voiceOptions => {
    setVoices(voiceOptions);
  };

  const handleEnd = () => {
    setSpeaking(false);
    onEnd();
  };

  useEffect(() => {
    function loadVoices() {
      return new Promise((resolve, reject) => {
        if (
          window &&
          window.speechSynthesis &&
          window.speechSynthesis.getVoices
        ) {
          let voices = window.speechSynthesis.getVoices();
          if (voices.length > 0) {
            resolve(voices);
            return;
          }
          window.speechSynthesis.onvoiceschanged = event => {
            // voices = window.speechSynthesis.getVoices();
            voices = event.target.getVoices();
            resolve(voices);
          };
        } else {
          reject();
        }
      });
    }

    loadVoices()
      .then(voices => processVoices(voices))
      .catch(() => processVoices([]));
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
