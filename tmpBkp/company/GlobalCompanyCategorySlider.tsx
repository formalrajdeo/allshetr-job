// components/GlobalCompanyCategorySlider.tsx
"use client";
import React, { useRef, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "../icons";

type Options = {
    showScrollbar?: boolean;
    arrowColor?: string;
    itemWidth?: number;
    gap?: number;
};

type GlobalCompanyCategorySliderProps<T> = {
    data: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    options?: Options;
};

export function GlobalCompanyCategorySlider<T>({
    data,
    renderItem,
    options = {}
}: GlobalCompanyCategorySliderProps<T>) {
    const { showScrollbar = false, arrowColor = "gray-800", itemWidth = 200, gap = 16 } = options;
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateButtons = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 5);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    };

    useEffect(() => {
        updateButtons();
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener("scroll", updateButtons);
        window.addEventListener("resize", updateButtons);
        return () => {
            el.removeEventListener("scroll", updateButtons);
            window.removeEventListener("resize", updateButtons);
        };
    }, []);

    const scroll = (dir: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        const visibleItems = Math.max(1, Math.floor(el.clientWidth / (itemWidth + gap)));
        const amount = visibleItems * (itemWidth + gap);
        el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    };

    return (
        <div className="relative">
            <div
                ref={scrollRef}
                className={`flex gap-4 overflow-x-auto scroll-smooth py-2 ${showScrollbar ? "scrollbar-thin" : "scrollbar-hide"}`}
            >
                {data.map((d, i) => (
                    <div key={i} className="flex-shrink-0">
                        {renderItem(d, i)}
                    </div>
                ))}
            </div>

            {canScrollLeft && (
                <button
                    aria-label="Scroll left"
                    onClick={() => scroll("left")}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100 text-${arrowColor}`}
                >
                    <FaAngleLeft />
                </button>
            )}

            {canScrollRight && (
                <button
                    aria-label="Scroll right"
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
