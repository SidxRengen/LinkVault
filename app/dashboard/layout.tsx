"use client";

import Header from "@/components/Header";
import AuthContext from "@/context/ProfileProvider";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>
      <div className="relative h-screen w-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary)_1px,transparent_0)] bg-[size:24px_24px]" />
        <div className="h-14 sm:h-16 flex-shrink-0">
          <Header user={user} />
        </div>

        <div className="relative flex-1 overflow-y-auto w-full px-4 sm:px-6 py-6">
          {children}
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </AuthContext.Provider>
  );
}

export default Layout;
