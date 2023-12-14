"use server";

import { bufferToBase64 } from "@/utils/buffer-to-base64";
import {
  SpeechConfig,
  SpeechSynthesizer,
} from "microsoft-cognitiveservices-speech-sdk";

export default async function getVoice(sentence: string) {
  const voiceKey = process.env.VOICE_API_KEY;
  const voiceRegion = process.env.VOICE_API_REGION;
  const voiceName = "en-GB-SoniaNeural";

  if (!(voiceKey && voiceRegion)) return;

  const speechConfig = SpeechConfig.fromSubscription(voiceKey, voiceRegion);
  speechConfig.speechSynthesisVoiceName = voiceName;
  const synthesizer = new SpeechSynthesizer(speechConfig);

  const url: string = await new Promise((resolve, reject) => {
    synthesizer.speakTextAsync(
      sentence,
      (result) => {
        if (result) {
          synthesizer.close();
          resolve(bufferToBase64(result.audioData));
        }
      },
      () => {
        synthesizer.close();
        reject();
      }
    );
  });

  return url;
}
