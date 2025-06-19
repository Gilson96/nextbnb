"use client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { addToWishlist, removeFromWishlist } from "@/lib/actions/users.actions";

export function useWishlist(userId: string | undefined | null, initialWishlist: { id: string }[] = []) {
  const [wishlist, setWishlist] = useState<{ id: string }[]>(initialWishlist);
  const [isPending, startTransition] = useTransition();

  const isInWishlist = (roomId: string) =>
    wishlist.some((room) => room.id === roomId);

  const addRoomToWishlist = (roomId: string) => {
    if (!userId) return;

    startTransition(async () => {
      try {
        await addToWishlist({ userId, roomId });
        setWishlist((prev) => [...prev, { id: roomId }]);
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
        await removeFromWishlist({ userId, roomId });
        setWishlist((prev) => prev.filter((room) => room.id !== roomId));
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
