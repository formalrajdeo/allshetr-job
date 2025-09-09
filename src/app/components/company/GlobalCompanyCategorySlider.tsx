"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "../icons";
import { GlobalCompanyCategorySliderProps } from "@/app/types";

export function GlobalCompanyCategorySlider<T>({
    data,
    renderItem,
    options = {},
}: GlobalCompanyCategorySliderProps<T>) {
    const {
        showScrollbar = false,
        arrowColor = "gray-800",
        itemWidth = 200,
        gap = 16, // 1rem = 16px
    } = options;

    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
        }
    };

    useEffect(() => {
        updateScrollButtons();
        const ref = scrollRef.current;
        if (!ref) return;
        ref.addEventListener("scroll", updateScrollButtons);
        window.addEventListener("resize", updateScrollButtons);
        return () => {
            ref.removeEventListener("scroll", updateScrollButtons);
            window.removeEventListener("resize", updateScrollButtons);
        };
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            // Number of fully visible items
            const itemsInView = Math.floor(clientWidth / (itemWidth + gap));
            const scrollAmount = itemsInView * (itemWidth + gap);

            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative p-4 bg-gray-100 rounded-lg">
            {/* Scrollable container */}
            <div
                ref={scrollRef}
                className={`flex gap-4 overflow-x-auto scroll-smooth ${showScrollbar ? "scrollbar-thin" : "scrollbar-hide"
                    }`}
            >
                {data.map((item, idx) => (
                    <div key={idx} className="flex-shrink-0">
                        {renderItem(item, idx)}
                    </div>
                ))}
            </div>

            {/* Left Button */}
            {canScrollLeft && (
                <button
                    onClick={() => scroll("left")}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100 text-${arrowColor}`}
                >
                    <FaAngleLeft />
                </button>
            )}

            {/* Right Button */}
            {canScrollRight && (
                <button
                    onClick={() => scroll("right")}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100 text-${arrowColor}`}
                >
                    <FaAngleRight />
                </button>
            )}
        </div>
    );
}

export default GlobalCompanyCategorySlider;
