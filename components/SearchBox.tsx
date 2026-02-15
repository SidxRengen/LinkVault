"use client";
import { Icon } from "@iconify/react";
import React from "react";

function SearchBox({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex items-center gap-3 px-3 sm:px-4 bg-secondary border border-border rounded-xl w-full sm:w-96 h-12 shadow-sm focus-within:border-primary transition">
      <Icon
        icon="material-symbols:search"
        width="20"
        height="20"
        className="text-muted-foreground"
      />
      <input
        name="search"
        placeholder="Search Your Bookmarks"
        className="flex-1 bg-transparent outline-none text-sm sm:text-base placeholder:text-muted-foreground"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm.length > 0 && (
        <div
          className="p-1.5 rounded-lg cursor-pointer hover:bg-primary/20 transition"
          onClick={() => setSearchTerm("")}
        >
          <Icon
            icon="radix-icons:cross-2"
            width="18"
            height="18"
          />
        </div>
      )}
    </div>
  );
}

export default SearchBox;
