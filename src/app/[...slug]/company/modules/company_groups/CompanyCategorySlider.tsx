"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "@/app/components/icons";
import {
    CompanyCategoriesData,
    CompanyCategorySliderProps,
} from "@/app/types";

export type CompanyCategoryRenderItem<T> = {
    renderItem: (item: T, index: number) => React.ReactNode;
};

export type CompanyCategoryOptions = {
    options?: {
        showScrollbar?: boolean;
        arrowColor?: string; // tailwind color class suffix like "gray-800"
        itemWidth?: number; // in px
        gap?: number; // in px
    };
};

const DEFAULT_OPTIONS = {
    showScrollbar: false,
    arrowColor: "gray-800",
    itemWidth: 200,
    gap: 16,
};

const companyCategories: CompanyCategoriesData[] = [
    { id: 101, label: "MNCs", value: "Foreign MNC", count: "144 companies" },
    { id: 102, label: "Unicorns", value: "Unicorn", count: "144 companies" },
    { id: 103, label: "Startups", value: "Startup", count: "144 companies" },
    { id: 104, label: "B2C", value: "B2C", count: "144 companies" },
    { id: 105, label: "Internet", value: "Internet", count: "144 companies" },
    { id: 106, label: "Product", value: "Product", count: "144 companies" },
    { id: 107, label: "Edtech", value: "Edtech", count: "144 companies" },
    { id: 108, label: "Fintech", value: "Fintech", count: "144 companies" },
    { id: 110, label: "Banking & Finance", value: "Banking", count: "144 companies" },
    { id: 111, label: "Healthcare", value: "Medical Services / Hospital", count: "144 companies" },
    { id: 112, label: "Manufacturing", value: "Manufacturing", count: "144 companies" },
    { id: 113, label: "FMCG & Retail", value: "FMCG", count: "144 companies" },
    { id: 114, label: "Hospitality", value: "Hospitality", count: "144 companies" },
    { id: 115, label: "Fortune 500", value: "Fortune 500", count: "144 companies" },
];

function CompanyCategorySlider<T>({
    setSelectedCategory,
}: CompanyCategorySliderProps<T>) {
    const {
        showScrollbar,
        arrowColor,
        itemWidth,
        gap,
    } = { ...DEFAULT_OPTIONS };

    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Auto-update scroll buttons state
    const updateScrollButtons = () => {
        const el = scrollRef.current;
        if (el) {
            setCanScrollLeft(el.scrollLeft > 0);
            setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
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

    // Scroll handler
    const scroll = (direction: "left" | "right") => {
        const el = scrollRef.current;
        if (el) {
            const itemsInView = Math.floor(el.clientWidth / (itemWidth + gap));
            const scrollAmount = itemsInView * (itemWidth + gap);
            el.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    // Default renderer
    const renderItem = (
        item: CompanyCategoriesData,
        index: number
    ): React.ReactNode => (
        <div
            key={index}
            onClick={() => setSelectedCategory(item.value)}
            className="min-w-[200px] p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
        >
            <h2 className="font-semibold mb-1">{item.label}</h2>
            <p className="text-sm font-medium text-blue-600 flex items-center space-x-1">
                <span>{item.count}</span>
                <FaAngleRight />
            </p>
        </div>
    );

    return (
        <div className="relative p-4 bg-gray-100 rounded-lg">
            {/* Scrollable content */}
            <div
                ref={scrollRef}
                className={`flex gap-[${gap}px] overflow-x-auto scroll-smooth ${showScrollbar ? "scrollbar-thin" : "scrollbar-hide"
                    }`}
            >
                {companyCategories.map((item, index) => (
                    <div key={item.id} className="flex-shrink-0 mr-1.5">
                        {renderItem(item, index)}
                    </div>
                ))}
            </div>

            {/* Left scroll button */}
            {canScrollLeft && (
                <button
                    onClick={() => scroll("left")}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100 text-${arrowColor}`}
                    aria-label="Scroll left"
                >
                    <FaAngleLeft />
                </button>
            )}

            {/* Right scroll button */}
            {canScrollRight && (
                <button
                    onClick={() => scroll("right")}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100 text-${arrowColor}`}
                    aria-label="Scroll right"
                >
                    <FaAngleRight />
                </button>
            )}
        </div>
    );
}

export default CompanyCategorySlider;
