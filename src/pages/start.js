import React, { useState, useEffect } from "react";
import useSpeechSynthesis from "../lib/useSpeechSynthesis";

import Layout from "../components/layout";
import SEO from "../components/seo";

function loadPhrases() {
  return import(
    /* webpackChunkName: "english-phrases" */ "raw-loader!./english-phrases.txt"
  ).then(({ default: fileContent }) => {
    return fileContent.trim().split("\n");
  });
}

function getRandomItemFromArray(arr) {
  return arr.length > 0
    ? arr[Math.floor(Math.random() * arr.length)].replace(/^[-\s]+/, "")
    : null;
}

// @see https://eeejay.github.io/webspeechdemos/
// @see https://github.com/eeejay/webspeechdemos

// @see https://responsivevoice.org/
// @see https://github.com/MikeyParton/react-speech-kit

// @see https://text-to-speech-demo.ng.bluemix.net/

// @see https://www.acapela-group.com/

// @see https://azure.microsoft.com/en-us/services/cognitive-services/text-to-speech/
// @see https://aws.amazon.com/polly/
// @see https://www.ibm.com/watson/services/text-to-speech/
// @see https://cloud.google.com/text-to-speech/

function useEnglishSpeaker() {
  const {
    voices,
    speak,
    cancel: cancelSpeak,
    speaking: isSpeaking
  } = useSpeechSynthesis();

  let prefferedVoices = [];
  prefferedVoices = prefferedVoices.length
    ? prefferedVoices
    : voices.filter(
        voice => voice.lang === "en-US" && voice.name.match(/Microsoft Zira/i)
      );
  prefferedVoices = prefferedVoices.length
    ? prefferedVoices
    : voices.filter(
        voice => voice.lang === "en-US" && voice.name.match(/Microsoft Mark/i)
      );
  prefferedVoices = prefferedVoices.length
    ? prefferedVoices
    : voices.filter(
        voice => voice.lang === "en-US" && voice.name.match(/Microsoft David/i)
      );
  prefferedVoices = prefferedVoices.length
    ? prefferedVoices
    : voices.filter(voice => voice.lang === "en-US" && voice.default === true);
  prefferedVoices = prefferedVoices.length
    ? prefferedVoices
    : voices.filter(voice => voice.lang === "en-US");
  prefferedVoices = prefferedVoices.length
    ? prefferedVoices
    : voices.filter(
        voice => voice.lang.match(/^en-/i) && voice.default === true
      );
  prefferedVoices = prefferedVoices.length
    ? prefferedVoices
    : voices.filter(voice => voice.lang.match(/^en-/i));

  const voice = prefferedVoices.length > 0 ? prefferedVoices[0] : null;

  return voice
    ? [isSpeaking, speak, cancelSpeak, voice, voices]
    : [false, null, null, null, []];
}

export default function StartPage({ location }) {
  const [isReady, setIsReady] = useState(false);
  const [phrases, setPhrases] = useState(null);
  const [phrase, setPhrase] = useState(null);
  const [isSpeaking, speak, cancelSpeak, voice, voices] = useEnglishSpeaker();

  useEffect(() => {
    let isMounted = true;

    loadPhrases()
      .then(phrases => {
        const randomPhrase = getRandomItemFromArray(phrases);

        isMounted && setPhrases(phrases);
        isMounted && setPhrase(randomPhrase);
        isMounted && setIsReady(true);
      })
      .catch(e => {
        isMounted && setPhrases([]);
        isMounted && setPhrase(null);
        isMounted && setIsReady(true);
      });

    return () => {
      isMounted = false;
    };
  }, [setIsReady, setPhrase]);

  function handleMore() {
    if (isSpeaking) {
      cancelSpeak && cancelSpeak();
    }
    if (phrases.length) {
      const randomPhrase = getRandomItemFromArray(phrases);

      setPhrase(randomPhrase);

      if (false && voice && speak && randomPhrase) {
        speak({
          text: randomPhrase,
          voice: voice
        });
      }
    }
  }

  function handleVoiceOver() {
    if (isSpeaking) {
      cancelSpeak && cancelSpeak();
    } else {
      voice &&
        speak &&
        phrase &&
        speak({
          text: phrase,
          voice: voice
        });
    }
  }

  if (!isReady) {
    return (
      <Layout location={location}>
        <SEO title="ы" />
        <p>Загрузка…</p>
      </Layout>
    );
  }

  return (
    <Layout location={location}>
      <SEO title="ы" />
      <div className="app-body">
        <div style={{ margin: "auto", fontSize: "2em" }}>
          <span>{phrase}</span>
        </div>
      </div>
      {false && voices.length > 0 && (
        <div>
          {voices.map(v => (
            <div key={v.name}>{v.name}</div>
          ))}
        </div>
      )}
      <div className="app-foot" style={{ textAlign: "right" }}>
        {voice && (
          <button
            className="zbz-button"
            type="button"
            onClick={handleVoiceOver}
            disabled={false && isSpeaking}
            title={voice.name}
          >
            <span role="img" aria-label="play">
              🔊
            </span>
          </button>
        )}
        {true && (
          <button className="zbz-button" type="button" onClick={handleMore}>
            Еще…
          </button>
        )}
      </div>
    </Layout>
  );
}
