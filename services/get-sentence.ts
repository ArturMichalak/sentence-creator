"use server";

export interface Sentence {
  Sentence: { Sentence_value: string }[];
}

export default async function getSentence(): Promise<string | undefined> {
  const { url, key, host } = {
    url: process.env.SENTENCES_API_URL,
    key: process.env.SENTENCES_API_KEY,
    host: process.env.SENTENCES_API_HOST,
  };

  if (!url || !key || !host) return;
  try {
    const res = (await fetch(url, {
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": host,
      },
    }).then((res) => res.json())) as Sentence;

    return res?.Sentence[0].Sentence_value;
  } catch (error) {
    console.error(error);
  }
}
