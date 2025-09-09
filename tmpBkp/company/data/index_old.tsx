"use client";
import React, { useRef, useState, useEffect } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import { FaAngleLeft, FaAngleRight } from "../icons";

type GlobalCompanyCategorySliderProps<T> = {
    data: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    options?: {
        showScrollbar?: boolean; // show/hide native scrollbar
        arrowColor?: string; // Tailwind color classes
        itemWidth?: number; // min card width in px (e.g., 200)
        gap?: number; // gap between items in px
    };
};

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

//  Company data
type CompanyCardData = {
    name: string;
    reviews: string;
    rating: number;
    tags: string[];
    category: string;
};

const companies: CompanyCardData[] = [
    {
        name: "Yashco Systems",
        reviews: "11 reviews",
        rating: 2.8,
        tags: ["Corporate", "IT Services & Consulting"],
        category: "B2C",
    },
    {
        name: "Opus Technologies",
        reviews: "134 reviews",
        rating: 3.4,
        tags: ["FinTech", "Payments"],
        category: "Manufacturing",
    },
    {
        name: "Cbts",
        reviews: "124 reviews",
        rating: 3.9,
        tags: ["Foreign MNC", "IT Services & Consulting"],
        category: "Product",
    },
];

type GlobalCompanyCategoriesData = {
    label: string;
    count: string;
};

const globalCompanyCategoriesData: GlobalCompanyCategoriesData[] = [
    { label: "MNCs", count: "2.1K+ Companies" },
    { label: "Product", count: "1.2K+ Companies" },
    { label: "Banking & Finance", count: "385 Companies" },
    { label: "Hospitality", count: "79 Companies" },
    { label: "Fintech", count: "124 Companies" },
    { label: "FMCG & Retail", count: "145 Companies" },
    { label: "Startups", count: "679 Companies" },
    { label: "Edtech", count: "158 Companies" },
    { label: "Healthcare", count: "594 Companies" },
    { label: "Unicorns", count: "87 Companies" },
    { label: "Internet", count: "242 Companies" },
    { label: "Manufacturing", count: "961 Companies" },
    { label: "Fortune 500", count: "163 Companies" },
    { label: "B2C", count: "2.3K+ Companies" },
];

const QuickFilterLinks = () => {
    return (
        <div className="flex flex-col p-4 border border-gray-200 shadow-md mr-8 rounded-xl">
            <div className="pb-4">
                <span className='font-bold'>Quick links</span>
            </div>
            <ul className='text-sm px-4'>
                {/* {sections.map(({ id, label }) => (
          <li key={id} className='p-3 text-start'>
            <Link href={`#${id}`}>{label}</Link>
          </li>
        ))} */}
            </ul>
        </div>
    )
}

const Company = () => {
    const [globalCompanyCategorySliderValue, setGlobalCompanyCategorySliderValue] = useState<{ label: string; count: string } | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredCompanies = selectedCategory
        ? companies.filter((c) => c.category === selectedCategory)
        : companies;
    return (
        <>
            <Navbar />
            <main className="flex justify-center py-10">
                <div className="w-11/12">
                    {/*  Heading */}
                    <h1 className="font-bold text-lg mb-6">
                        Banking & Financial services companies actively hiring
                    </h1>

                    {/*  Category Slider */}
                    <GlobalCompanyCategorySlider
                        data={globalCompanyCategoriesData}
                        options={{
                            showScrollbar: false,
                            arrowColor: "gray-600",
                            itemWidth: 200, // matches your `min-w-[200px]`
                            gap: 16, // matches `gap-4`
                        }}
                        renderItem={({ label, count }) => (
                            <div
                                onClick={() => setGlobalCompanyCategorySliderValue({ label, count })}
                                className="min-w-[200px] p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
                                <h2 className="font-semibold mb-1">{label}</h2>
                                <p className="text-sm font-medium text-blue-600 flex items-center space-x-1">
                                    <span>{count}</span>
                                    <FaAngleRight />
                                </p>
                            </div>
                        )}
                    />

                    {/*  Show clicked card info */}
                    {/* {globalCompanyCategorySliderValue && (
                        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                            <p className="text-gray-700">
                                <span className="font-bold">globalCompanyCategorySliderValue:</span> {globalCompanyCategorySliderValue.label} ({globalCompanyCategorySliderValue.count})
                            </p>
                        </div>
                    )} */}

                    {/* <div className="m-4 flex justify-between items-start w-11/12">
                         <QuickFilterLinks /> component for All Filter
                        <div className="w-full">
                            <div className="">
                                <span>Showing 8541 companies</span>
                            </div>
                            <div className="">
                                 all ocmpanies cards only 2 cards in one rows, etc
                            </div>
                        </div>
                    </div> */}
                    {/*  Filters + Companies (like Profile page structure) */}
                    <div className="m-4 flex justify-between items-start w-11/12">
                        {/* -------- Left Sidebar Filters -------- */}
                        <aside className="w-64 sticky top-24 bg-white border rounded-lg p-4 shadow-sm">
                            <h2 className="font-bold mb-4">All Filters</h2>

                            {/* Example Filter: Company Type */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-2">Company type</h3>
                                <ul className="space-y-1 text-sm text-gray-700">
                                    {["Corporate", "Foreign MNC", "Startup", "Indian MNC"].map(
                                        (type) => (
                                            <li key={type}>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="checkbox" className="form-checkbox" />
                                                    {type}
                                                </label>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                            {/* Example Filter: Location */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-2">Location</h3>
                                <input
                                    type="text"
                                    placeholder="Search Location"
                                    className="w-full border rounded p-1 text-sm mb-2"
                                />
                                <ul className="space-y-1 text-sm text-gray-700 max-h-40 overflow-y-auto">
                                    {["Bengaluru", "Delhi / NCR", "Mumbai", "Hyderabad"].map(
                                        (loc) => (
                                            <li key={loc}>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="checkbox" className="form-checkbox" />
                                                    {loc}
                                                </label>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </aside>

                        {/* -------- Right Companies Content -------- */}
                        <section className="w-full ml-6">
                            <div className="mb-4">
                                <span className="text-gray-600 text-sm">
                                    Showing {filteredCompanies.length} companies
                                    {selectedCategory ? ` in ${selectedCategory}` : ""}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredCompanies.map((c, i) => (
                                    <div
                                        key={i}
                                        className="p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition flex justify-between items-center"
                                    >
                                        <div>
                                            <h3 className="font-semibold">{c.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                ⭐ {c.rating} | {c.reviews}
                                            </p>
                                            <div className="flex gap-2 flex-wrap mt-2">
                                                {c.tags.map((t, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 text-xs bg-gray-100 rounded"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <FaAngleRight className="text-gray-400" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Company;
