"use server";

export interface Translate {
  data: {
    translations: {
      translatedText: string;
    }[];
  };
}

export default async function getTranslation(q: string) {
  const { url, host, key } = {
    url: process.env.TRANSLATE_API_URL,
    key: process.env.TRANSLATE_API_KEY,
    host: process.env.TRANSLATE_API_HOST,
  };

  if (!(url && key && host)) return;

  const encodedParams = new URLSearchParams({
    source: "en",
    target: "pl",
    q,
  });

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Host": host,
      "X-RapidAPI-Key": key,
    },
    body: encodedParams,
  };

  try {
    const response = await fetch(url, options);
    const result = (await response.json()) as Translate;
    return result.data.translations.find((x) => x)?.translatedText;
  } catch (error) {}
}
