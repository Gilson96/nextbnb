import { getRoomReviews } from "@/lib/actions/place.actions";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ReviewsProps = {
  roomId: string;
  roomRating: number;
};

const Reviews = async ({ roomId, roomRating }: ReviewsProps) => {
  const reviews = await getRoomReviews();
  const findReviews = reviews.filter((review) => review.roomId === roomId);

  return (
    <div className="my-[5%] flex w-full flex-col items-center justify-center gap-1">
      <div className="flex flex-col items-center justify-center gap-2 md:hidden">
        <div className="flex items-end px-[5%]">
          <i className="relative left-[10%]">
            <Star fill="black" size={40} />
          </i>
          <Star fill="black" size={100} />
          <i className="relative right-[10%]">
            <Star fill="black" size={40} />
          </i>
        </div>
        <p className="text-xl font-bold">{roomRating} stars</p>
      </div>
      <div className="flex gap-2 overflow-hidden md:hidden">
        <Carousel>
          <CarouselContent>
            {findReviews.map((review) => (
              <CarouselItem>
                <div className="flex h-[10rem] w-full flex-col rounded-2xl border p-[4%] text-sm shadow">
                  <div className="flex w-full items-center justify-between pb-[5%]">
                    <p>{review?.reviewPersonName}</p>
                    <p>{review?.reviewDate}</p>
                  </div>
                  <p>{review?.reviewDescription}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="max-md:hidden flex">
        <div className="flex flex-col items-center">
          <div className="flex items-end">
            <i className="relative left-[10%]">
              <Star fill="black" size={70} />
            </i>
            <Star fill="black" size={140} />
            <i className="relative right-[10%]">
              <Star fill="black" size={70} />
            </i>
          </div>
          <p className="text-xl font-bold">{roomRating} stars</p>
        </div>
        <div className="flex gap-3 p-[2%]">
          {findReviews.map((review) => (
            <div className="flex h-[10rem] w-full flex-col rounded-2xl border p-[2%] text-sm shadow">
              <div className="flex w-full items-center justify-between pb-[5%]">
                <p>{review?.reviewPersonName}</p>
                <p>{review?.reviewDate}</p>
              </div>
              <p>{review?.reviewDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
