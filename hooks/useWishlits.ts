"use client";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { addToWishlist, removeFromWishlist, getWishlist } from "@/lib/actions/users.actions";

export function useWishlist(userId: string | undefined | null) {
  const [wishlist, setWishlist] = useState<{ id: string; roomId: string }[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!userId) return;

    const fetchWishlist = async () => {
      try {
        const data = await getWishlist(); // Assuming this returns [{ id, roomId }]
        setWishlist(data);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };

    fetchWishlist();
  }, [userId]);

  const isInWishlist = (roomId: string) => wishlist.some((item) => item.roomId === roomId);

  const addRoomToWishlist = (roomId: string) => {
    if (!userId) return;

    startTransition(async () => {
      try {
        const newWishlistItem = await addToWishlist({ userId, roomId }); // Ideally returns the created wishlist item
        setWishlist((prev) => [...prev, newWishlistItem]); // Use the full item returned from the server
        toast.success("Added to wishlist", { position: "top-center" });
      } catch (error) {
        console.error("Failed to add to wishlist", error);
        toast.error("Failed to add to wishlist");
      }
    });
  };

  const removeRoomFromWishlist = (roomId: string) => {
    if (!userId) return;

    startTransition(async () => {
      try {
        await removeFromWishlist({ roomId });
        setWishlist((prev) => prev.filter((item) => item.roomId !== roomId));
        toast.success("Removed from wishlist", { position: "top-center" });
      } catch (error) {
        console.error("Failed to remove from wishlist", error);
        toast.error("Failed to remove from wishlist");
      }
    });
  };

  const toggleWishlist = (roomId: string) => {
    if (isInWishlist(roomId)) {
      removeRoomFromWishlist(roomId);
    } else {
      addRoomToWishlist(roomId);
    }
  };

  return {
    wishlist,
    isInWishlist,
    addToWishlist: addRoomToWishlist,
    removeFromWishlist: removeRoomFromWishlist,
    toggleWishlist,
    loading: isPending,
  };
}
