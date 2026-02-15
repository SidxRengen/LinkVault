"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Bookmark } from "@/types/Bookmark";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isEdit: boolean;
  selectedBookmark: Bookmark | null;
  onAdd: (title: string, url: string, tags: string[]) => void;
  onUpdate: (id: number, title: string, url: string, tags: string[]) => void;
}

function BookmarkDialog({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  isEdit,
  selectedBookmark,
}: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  useEffect(() => {
    if (selectedBookmark && isEdit) {
      setTitle(selectedBookmark?.title);
      setUrl(selectedBookmark?.url);
      setTagsInput(selectedBookmark?.tags.join(","));
    }
  }, [selectedBookmark, isEdit]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title || !url) return;

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    if (isEdit && selectedBookmark) {
      onUpdate(selectedBookmark.id, title, url, tags);
    } else {
      onAdd(title, url, tags);
    }

    setTitle("");
    setUrl("");
    setTagsInput("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-secondary border border-border rounded-2xl p-6 w-full max-w-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {isEdit ? "Edit Bookmark" : "Add Bookmark"}
          </h2>
          <button onClick={onClose}>
            <Icon icon="radix-icons:cross-2" width="20" height="20" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="bg-background border border-border rounded-lg p-3 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="URL"
            className="bg-background border border-border rounded-lg p-3 outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="bg-background border border-border rounded-lg p-3 outline-none"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-primary text-background hover:opacity-90"
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookmarkDialog;
