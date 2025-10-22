import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
type BannerCarouselProps = {
    images: string[];
};

const BannerCarousel: React.FC<BannerCarouselProps> = ({ images }) => {
    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            loop={true}
            pagination={{ clickable: true }}
            className="md:w-[960px] w-full"
        >
            {images.map((img, index) => (
                <SwiperSlide key={index}>
                    <img
                        src={img}
                        alt={`carousel-${index}`}
                        className="w-full h-full"

                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default BannerCarousel;
