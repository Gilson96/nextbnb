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
  const filteredReviews = reviews.filter((review) => review.roomId === roomId);

  if (filteredReviews.length === 0) {
    return (
      <section
        aria-label="Guest reviews"
        className="my-[5%] text-center text-neutral-500"
      >
        <p>No reviews yet.</p>
      </section>
    );
  }

  return (
    <section
      aria-label="Guest reviews"
      className="my-[5%] flex w-full flex-col items-center justify-center gap-4"
    >
      {/* Rating summary */}
      <div
        className="flex flex-col items-center justify-center gap-2 md:hidden"
        aria-label="Room rating summary"
      >
        <div className="flex items-end px-[5%]">
          <Star fill="black" size={40} />
          <Star fill="black" size={100} />
          <Star fill="black" size={40} />
        </div>
        <p className="text-xl font-bold">{roomRating} stars</p>
      </div>

      {/* Mobile Carousel */}
      <div
        className="flex gap-2 overflow-hidden md:hidden"
        aria-label="Mobile reviews carousel"
      >
        <Carousel>
          <CarouselContent>
            {filteredReviews.map((review) => (
              <CarouselItem key={review.id}>
                <article
                  className="flex h-[10rem] w-full flex-col rounded-2xl border p-[4%] text-sm shadow"
                  role="article"
                >
                  <header className="flex w-full items-center justify-between pb-[5%]">
                    <p>{review.reviewPersonName}</p>
                    <time dateTime={review.reviewDate}>
                      {review.reviewDate}
                    </time>
                  </header>
                  <p>{review.reviewDescription}</p>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious aria-label="Previous review" />
          <CarouselNext aria-label="Next review" />
        </Carousel>
      </div>

      {/* Desktop Reviews */}
      <div
        className="hidden w-full max-w-7xl gap-3 md:flex"
        aria-label="Desktop reviews list"
      >
        <div className="flex flex-col items-center">
          <div className="flex items-end">
            <Star fill="black" size={70} className="relative left-6" />
            <Star fill="black" size={140} />
            <Star fill="black" size={70} className="relative right-6" />
          </div>
          <p className="text-xl font-bold">{roomRating} stars</p>
        </div>
        <div className="flex gap-3 overflow-hidden max-lg:w-[60%] max-lg:overflow-x-auto">
          {filteredReviews.map((review) => (
            <article
              key={review.id}
              className="flex h-[10rem] lg:w-[14rem] xl:w-[19rem] flex-col rounded-2xl border p-[2%] text-sm shadow max-lg:min-w-[20rem]"
              role="article"
            >
              <header className="flex w-full items-center justify-between pb-[5%]">
                <p>{review.reviewPersonName}</p>
                <time dateTime={review.reviewDate}>{review.reviewDate}</time>
              </header>
              <p>{review.reviewDescription}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
