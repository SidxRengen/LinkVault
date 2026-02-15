"use client";

import { supabase } from "@/lib/supabase";
import { Icon } from "@iconify/react";
import { useState } from "react";

function Header({ user }: { user: any }) {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="h-full w-full bg-secondary relative border-b border-border">
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
          <span className="text-white">Link</span>
          <span className="text-primary">Vault</span>
        </h1>

        <div className="relative">
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            {user?.user_metadata?.picture ? (
              <img
                src={user?.user_metadata?.picture}
                alt="profile"
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-800" />
            )}
            <div className="flex items-center gap-1">
              <span className="hidden sm:inline text-sm">
                {user?.user_metadata?.name}
              </span>
              <Icon icon="mdi:chevron-down" width="16" height="16" />
            </div>
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-40 sm:w-44 bg-card/95 z-50 backdrop-blur-md border border-border rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-foreground hover:bg-danger/10 cursor-pointer hover:text-danger transition-all duration-200"
              >
                <Icon icon="material-symbols:logout" width="18" height="18" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
