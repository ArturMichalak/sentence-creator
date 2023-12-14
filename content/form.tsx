"use client";

import { useDeferredValue, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useForm } from "react-hook-form";

import TextArea from "@/content/text-area";
import VoiceCloud from "@/content/voice-cloud";
import getSentence from "@/services/get-sentence";
import getTranslation from "@/services/get-translation";

interface FormProps {
  sentence?: string;
  translation?: string;
}

export default function Form(props: FormProps) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<{ answer: string }>();
  const [confetti, setConfetti] = useState(false);
  const [lastCorrect, setLastCorrect] = useState("");

  const [rawSentence, setSentence] = useState(props.sentence);
  const [rawTranslation, setTranslation] = useState(props.translation);

  const sentence = useDeferredValue(rawSentence);
  const translation = useDeferredValue(rawTranslation);

  const basicText = (text?: string) =>
    text
      ?.trim()
      .replaceAll(/[.,\s]/g, "")
      .toLocaleLowerCase();

  useEffect(() => {
    const controller = new AbortController();
    if (lastCorrect !== "") {
      (async () => {
        const stc = await getSentence();
        setSentence(stc);
        if (stc) {
          setTranslation(await getTranslation(stc));
        }

        setConfetti(false);
      })();
    }

    return () => controller.abort();
  }, [lastCorrect]);

  const onSubmit = handleSubmit((data) => {
    if (basicText(translation) !== basicText(data.answer))
      setError("answer", { type: "custom" });
    else {
      setConfetti(true);
      setTimeout(() => setLastCorrect(data.answer), 5e4);
    }
  });

  if (!(sentence && translation)) return null;
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-start">
      {confetti && <Confetti width={width} height={height} />}
      <VoiceCloud sentence={sentence} />
      <TextArea answer={translation} control={control} error={errors.answer} />
      <span className="text-xs text-gray-500">{translation}</span>
    </form>
  );
}
