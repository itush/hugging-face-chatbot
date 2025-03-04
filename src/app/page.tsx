import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold mb-4">Hugging Face Chatbot</h1>
      <Chat />
    </main>
  );
}
