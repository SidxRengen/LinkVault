"use client";
import BookmarkDialog from "@/components/BookmarkDialog";
import Card from "@/components/Card";
import SearchBox from "@/components/SearchBox";
import { useAuth } from "@/context/ProfileProvider";
import { supabase } from "@/lib/supabase";
import { Bookmark } from "@/types/Bookmark";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(
    null,
  );

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBookmarks(data || []);
    } catch (error: any) {
      console.error("Error fetching bookmarks:", error);
      toast.error(error.message || "Failed to fetch bookmarks");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!user?.id) return;
    fetchBookmarks();
  }, [user?.id]);

  const addBookmark = async (title: string, url: string, tags: string[]) => {
    try {
      const { error } = await supabase.from("bookmarks").insert([
        {
          title,
          url,
          user_id: user?.id,
          tags,
        },
      ]);

      if (error) throw error;

      toast.success("Bookmark added successfully");
    } catch (error: any) {
      console.error("Error adding bookmark:", error);
      toast.error(error.message || "Failed to add bookmark");
    }
  };

  const updateBookmark = async (
    id: number,
    title: string,
    url: string,
    tags: string[],
  ) => {
    try {
      const { error } = await supabase
        .from("bookmarks")
        .update({ title, url, tags })
        .eq("id", id);

      if (error) throw error;

      setIsEdit(false);
      setSelectedBookmark(null);
      toast.success("Bookmark updated successfully");
    } catch (error: any) {
      console.error("Error updating bookmark:", error);
      toast.error(error.message || "Failed to update bookmark");
    }
  };

  const deleteBookmark = async (id: number) => {
    try {
      const { error } = await supabase.from("bookmarks").delete().eq("id", id);

      if (error) throw error;

      toast.success("Bookmark removed successfully");
    } catch (error: any) {
      console.error("Error deleting bookmark:", error);
      toast.error(error.message || "Failed to delete bookmark");
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`bookmarks-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchBookmarks();
        },
      )
      .subscribe((status) => {
        console.log("Realtime status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const filteredBookmarks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return bookmarks;

    return bookmarks.filter((bookmark) => {
      const inTitle = bookmark.title.toLowerCase().includes(term);
      const inUrl = bookmark.url.toLowerCase().includes(term);
      const inTags = bookmark.tags?.some((tag) =>
        tag.toLowerCase().includes(term),
      );

      return inTitle || inUrl || inTags;
    });
  }, [searchTerm, bookmarks]);

  return (
    <div className="px-4 sm:px-6 py-6  mx-auto h-full max-w-7xl overflow-auto">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center mb-8">
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <button
          onClick={() => setIsDialogOpen(true)}
          className="rounded-full bg-primary p-2 sm:p-1 hover:scale-105 transition self-center sm:self-auto"
        >
          <Icon
            icon="fluent:add-12-filled"
            color="black"
            width="24"
            height="24"
          />
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="mt-4 text-sm text-muted-foreground">
            Fetching your bookmarks...
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredBookmarks.map((bookmark) => (
              <Card
                openDialog={() => setIsDialogOpen(true)}
                setIsEdit={setIsEdit}
                key={bookmark.id}
                bookmark={bookmark}
                setSelectedBookmark={setSelectedBookmark}
                onDelete={deleteBookmark}
              />
            ))}
          </div>

          {filteredBookmarks.length === 0 && (
            <p className="text-center text-muted-foreground mt-8 sm:mt-10 text-sm sm:text-base">
              No bookmarks found.
            </p>
          )}
        </>
      )}
      <BookmarkDialog
        isEdit={isEdit}
        selectedBookmark={selectedBookmark}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setIsEdit(false);
          setSelectedBookmark(null);
        }}
        onAdd={addBookmark}
        onUpdate={updateBookmark}
      />
    </div>
  );
}
