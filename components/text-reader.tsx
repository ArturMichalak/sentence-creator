"use client";

import { FaVolumeHigh } from "react-icons/fa6";

import getVoice from "@/services/get-voice";
import { useEffect, useState } from "react";

interface TextReaderProps {
  sentence: string;
}

export default function TextReader({ sentence }: TextReaderProps) {
  const [audio, setAudio] = useState<HTMLAudioElement>()
  useEffect(() => {
    (async () => {
      const base64 = await getVoice(sentence);
      setAudio(new Audio("data:audio/wav;base64," + base64))
    })()
  }, [sentence])
  const onClick = async () => {
    audio?.play();
  };
  return (
    <button onClick={onClick}>
      <FaVolumeHigh />
    </button>
  );
}
