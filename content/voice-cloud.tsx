"use client";

import { Tooltip } from "antd";
import { FaPerson } from "react-icons/fa6";

import TextReader from "@/components/text-reader";
import { useEffect, useMemo, useState } from "react";
import getTranslation from "@/services/get-translation";

interface VoiceCloudProp {
  sentence?: string;
}

export default function VoiceCloud({ sentence }: VoiceCloudProp) {
  const [open, setOpen] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [translations, setTranslations] = useState<string[]>([]);
  const Title = useMemo(
    () => (
      <div className="text-xl flex gap-4 mx-3">
        <TextReader sentence={sentence || ""} />
        <div className="flex gap-1 flex-wrap">
          {sentence?.split(" ").map((w, key) => {
            const translation = translations[words.indexOf(w)];
            return (
              <span title={translation} className={translation && 'underline'} key={key}>
                {w}
              </span>
            );
          })}
        </div>
      </div>
    ),
    [sentence, translations, words]
  );

  useEffect(() => {
    if (sentence) {
      const words = sentence
        ?.split(" ")
        .map((x) => x?.toLowerCase())
        .filter((x) => x && !["the", "a", "an"].includes(x));

      if (words) {
        const nawTranslations = words.map((word) => getTranslation(word));

        Promise.all(nawTranslations).then((translations) => {
          setWords(words.filter((x) => x));
          setTranslations(
            translations
              .filter((x) => x)
              .map((x) => x?.toLocaleLowerCase()) as string[]
          );
          setOpen(true);
        });
      }
    }
  }, [sentence]);

  if (!Title) return null;
  return (
    <Tooltip open={open} placement="right" title={Title}>
      <div className="mb-10 text-9xl">
        <FaPerson />
      </div>
    </Tooltip>
  );
}
