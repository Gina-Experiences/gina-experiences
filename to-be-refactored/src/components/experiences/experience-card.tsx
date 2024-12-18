'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { Experience } from '@/types/experience';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

interface ExperienceCardProps {
    experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
    const router = useRouter();

    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleBookNowClick = () => {
        router.push(`/experiences/${experience.id}`);
    };

    return (
        <div className="shadow-xl rounded-3xl grid grid-cols-1 grid-rows-2 h-full w-full p-2">
            <Image
                src={experience.image}
                alt="Experience"
                quality={100}
                width={500}
                height={500}
                className="rounded-3xl h-full w-full"
            />
            <div className="flex flex-col justify-between p-4">
                <div className="grid grid-cols-1 space-y-4 h-full">
                    <div className="flex flex-col space-y-3">
                        <span className="font-medium text-xl leading-none">
                            {experience.title}
                        </span>
                        <span className="text-base text-ginaDarkGray leading-none">
                            {experience.location}
                        </span>
                    </div>
                    <span className="text-ginaOrange font-medium flex flex-col justify-center">
                        {experience.price}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <div
                        onClick={handleLikeClick}
                        className="cursor-pointer text-ginaOrange"
                    >
                        {isLiked ? (
                            <FaHeart size={25} />
                        ) : (
                            <FaRegHeart size={25} />
                        )}
                    </div>
                    <button
                        className="bg-ginaYellow text-ginaWhite rounded-xl py-2 px-6 hover:bg-ginaGreen duration-200"
                        onClick={handleBookNowClick}
                    >
                        Book now
                    </button>
                </div>
            </div>
        </div>
    );
}
