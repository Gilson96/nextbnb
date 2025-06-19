// components/WishlistProvider.tsx (server component)
import { getWishlist } from "@/lib/actions/users.actions";
import RoomGallery from "@/components/room/gallery";

export default async function WishlistProvider({
  userId,
  ...otherProps
}: {
  userId: string;
}) {
  const initialWishlist = await getWishlist(userId);

  // pass initialWishlist to RoomGallery
  return (
    <RoomGallery
      session={null}
      roomId={""}
      room={{
        id: "",
        roomDescription: "",
        roomType: "",
        roomRating: 0,
        roomLatitude: 0,
        roomLongitude: 0,
        roomLocation: "",
        roomPrice: 0,
        roomAbout: "",
        hostId: "",
      }}
      {...otherProps}
      userId={userId}
      initialWishlist={initialWishlist}
    />
  );
}
