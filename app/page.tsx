"use client";

import Feature from "@/components/Feature";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_SITE_URL);
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      },
    });
  };
  const Features = [
    {
      title: "Private by Design",
      description:
        "Each bookmark is protected with secure user-level isolation.",
    },
    {
      title: "Real-Time Sync",
      description:
        "Open multiple tabs and see updates instantly without refresh.",
    },
    {
      title: "Lightning Fast",
      description: "Built with Next.js App Router and Supabase Realtime.",
    },
  ];
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-100 h-2/3 bg-primary opacity-20 blur-3xl rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-100 h-2/3 bg-primary opacity-20 blur-3xl rounded-full" />

      <header className="w-full flex justify-between items-center px-4 sm:px-8 py-5 sm:py-6 max-w-6xl mx-auto relative z-10">
        <h1 className="text-xl font-semibold tracking-tight">
          <span className="text-white">Link</span>
          <span className="text-primary">Vault</span>
        </h1>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center text-center px-4 sm:px-6 relative z-10">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">
          Store Your Links
          <br />
          <span className="text-primary">Securely. Instantly. Privately.</span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl">
          A real-time bookmark manager built for speed and privacy. Your links.
          Your space. Accessible everywhere.
        </p>

        <button
          onClick={handleLogin}
          className="mt-10 flex items-center gap-3 px-5 sm:px-6 py-3 rounded-xl cursor-pointer border border-primary text-white font-medium shadow-lg shadow-primary/40 hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
        >
          <Image src="/google.svg" alt="Google" width={20} height={20} />
          Sign in with Google
        </button>

        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl w-full">
          {Features.map((feature, key) => (
            <Feature
              key={key}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </main>

      <footer className="py-6 text-center text-xs sm:text-sm text-muted-foreground relative z-10 px-4">
        © {new Date().getFullYear()} LinkVault
      </footer>
    </div>
  );
}
