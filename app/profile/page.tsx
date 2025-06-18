import { authConfig } from "@/auth";
import Navigator from "@/components/navigator/navigator";
import NewPlace from "@/components/profile/newPlace";
import { prisma } from "@/db/prisma";
import { RoomsType } from "@/lib/actions/place.actions";
import { Decimal } from "@prisma/client/runtime/library";
import { Heart, MapPinHouse, Plus } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { RxAvatar } from "react-icons/rx";

const Profile = async () => {
  const session = await getServerSession(authConfig);
  const admin = session?.user?.name === "Admin";

  let userRooms: RoomsType[] = [];

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { rooms: true },
    });

    userRooms = userRooms = (user?.rooms || []).map((room) => ({
      ...room,
      roomRating: (room.roomRating as Decimal).toNumber(), // Convert Decimal to number
      roomLatitude: (room.roomLatitude as Decimal).toNumber(),
      roomLongitude: (room.roomLongitude as Decimal).toNumber(),
      roomLocation: room.roomLocation,
    }));
  }

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
                <p className="text-xl font-bold">4</p>
                <p>trips</p>
              </div>
              <hr className="h-[1px] w-full text-neutral-400" />
              {admin ? (
                <div className="flex flex-col">
                  <p className="text-xl font-bold">4</p>
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
          <div className="max-lg:mt-[2%] grid grid-cols-2 gap-2.5">
            <div className="flex h-[7rem] cursor-pointer flex-col items-center justify-center rounded-2xl border shadow">
              <MapPinHouse size={40} />
              <p>Past trips</p>
            </div>
            {admin && <NewPlace hostId={session.user.id} />}
            <div className="flex h-[7rem] cursor-pointer flex-col items-center justify-center rounded-2xl border shadow">
              <Heart size={40} />
              <p>Wishlists</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
