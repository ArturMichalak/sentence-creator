import Form from "@/content/form";
import getSentence from "@/services/get-sentence";
import getTranslation from "@/services/get-translation";

export default async function Home() {
  const sentence = await getSentence();
  const translation = await getTranslation(sentence || "");

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <Form {...{ sentence, translation }} />
    </main>
  );
}
