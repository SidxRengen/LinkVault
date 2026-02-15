import { Bookmark } from "@/types/Bookmark";
import { Icon } from "@iconify/react";
import React from "react";
import { toast } from "sonner";

function Card({
  bookmark,
  onDelete,
  setIsEdit,
  setSelectedBookmark,
  openDialog,
}: {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  bookmark: Bookmark;
  onDelete: (id: number) => void;
  openDialog: () => void;
  setSelectedBookmark: React.Dispatch<React.SetStateAction<Bookmark | null>>;
}) {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(bookmark.url);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-4 text-foreground shadow-lg hover:shadow-primary/10 hover:border-primary/40 transition-all duration-300">
      <div className="text-lg flex items-center justify-between font-semibold">
        <div className="w-[90%] truncate">{bookmark.title} </div>
        <div>
          <button
            onClick={() => {
              setIsEdit(true);
              openDialog();
              setSelectedBookmark(bookmark);
            }}
            className="p-2 rounded-full bg-accent/20 hover:bg-accent/40 transition"
          >
            <Icon icon="fluent:edit-12-regular" width="18" height="18" />
          </button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground truncate">
        {bookmark.url}
      </div>

      {bookmark.tags && bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {bookmark.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-3">
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-full bg-primary/20 hover:bg-hover-primary transition"
          >
            <Icon icon="mdi:content-copy" width="18" height="18" />
          </button>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-success/20 hover:bg-success/40 transition"
          >
            <Icon icon="mdi:open-in-new" width="18" height="18" />
          </a>
        </div>

        <button
          onClick={() => onDelete(bookmark.id)}
          className="p-2 rounded-full bg-danger/20 hover:bg-danger/40 transition"
        >
          <Icon icon="fluent:delete-12-regular" width="18" height="18" />
        </button>
      </div>
    </div>
  );
}

export default Card;
