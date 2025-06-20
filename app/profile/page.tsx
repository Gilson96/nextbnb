import { authConfig } from "@/auth";
import Navigator from "@/components/navigator/navigator";
import Bookings from "@/components/profile/bookings";
import NewPlace from "@/components/profile/newPlace";
import OwnHouses from "@/components/profile/ownHouses";
import Wishlists from "@/components/profile/wishlists";
import {
  getHosts,
  getRoomGallery,
  getRooms,
  HostsTypes,
  RoomsType,
} from "@/lib/actions/place.actions";
import {
  BookingTypes,
  getBookings,
  getWishlist,
  WishlistTypes,
} from "@/lib/actions/users.actions";
import { getServerSession } from "next-auth/next";
import { RxAvatar } from "react-icons/rx";

const Profile = async () => {
  const session = await getServerSession(authConfig);
  const admin = session?.user?.name === "Admin";

  const gallery = await getRoomGallery();
  const host: HostsTypes[] = await getHosts();
  const whichlist: WishlistTypes[] = await getWishlist(session?.user.id!);
  const rooms: RoomsType[] = await getRooms();
  const bookings: BookingTypes[] = await getBookings(session?.user.id!);

  const userBookings = bookings.filter(
    (booking) => booking.userId === session?.user.id,
  );
  const ownHouses = rooms.filter((room) => room.hostId === session?.user.id);

  console.log(ownHouses);
  return (
    <>
      <Navigator session={session} />
      <section className="flex flex-col p-[2%]">
        <p className="pb-[3%] text-3xl font-bold">Profile</p>
        <div className="lg:flex lg:items-center lg:justify-center lg:gap-3">
          <div className="flex h-[13rem] items-center justify-center gap-[4rem] rounded-2xl border p-[2%] shadow max-lg:w-full lg:h-[15rem] lg:w-[25rem]">
            <div className="flex w-full flex-col items-center">
              <RxAvatar size={100} />
              <p className="text-xl">{session?.user?.name}</p>
            </div>
            <div className="flex w-[60%] flex-col gap-2 px-[4%]">
              <div className="flex flex-col">
                <p className="text-xl font-bold">{userBookings.length}</p>
                <p>trips</p>
              </div>
              <hr className="h-[1px] w-full text-neutral-400" />
              {admin ? (
                <div className="flex flex-col">
                  <p className="text-xl font-bold">{ownHouses.length}</p>
                  <p>Own houses</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  <p className="text-xl font-bold">4</p>
                  <p>reviews</p>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 max-lg:mt-[2%]">
            <Bookings
              hosts={host}
              bookings={bookings}
              rooms={rooms}
              gallery={gallery}
            />
            {admin && <NewPlace hostId={session.user.id} />}
            <Wishlists
              gallery={gallery}
              host={host}
              rooms={rooms}
              wishlist={whichlist}
            />
            {admin && (
              <OwnHouses
                hostId={session?.user.id!}
                gallery={gallery}
                ownHouses={ownHouses}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
