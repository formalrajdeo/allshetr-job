// components/FilterSidebar.tsx
"use client";
import React, { useMemo, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "../icons";
import { FilterDef, FilterValue, FilterSidebarProps } from "@/app/types";

function ModalAllValues({
    filter,
    currentSelected,
    onClose,
    onApply
}: {
    filter: FilterDef;
    currentSelected: string[];
    onClose: () => void;
    onApply: (selected: string[]) => void;
}) {
    const PAGE_SIZE = 24; // 3 columns x 8 rows
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState("");
    const [localSel, setLocalSel] = useState<string[]>(currentSelected || []);

    const filtered = useMemo(
        () =>
            filter.data.filter((v) => v.label.toLowerCase().includes(query.toLowerCase())),
        [filter.data, query]
    );

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

    const pageItems = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

    function toggle(v: string) {
        setLocalSel((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>
            <div className="bg-white rounded-lg p-6 relative max-w-4xl w-11/12 shadow-xl">
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-500">✕</button>
                <h3 className="text-lg font-semibold mb-4">{filter.label}</h3>
                {filter.isSearchApplicable && (
                    <input
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setPage(0); }}
                        className="w-full border rounded px-3 py-2 mb-4"
                        placeholder={`Search ${filter.label}`}
                    />
                )}

                <div className="grid grid-cols-3 gap-3 max-h-[420px] overflow-auto">
                    {pageItems.map((item: any, pageItemIdx) => {
                        return (
                            <label key={pageItemIdx} className="flex items-center gap-2 p-2 border rounded">
                                <input
                                    type="checkbox"
                                    checked={localSel.includes(item.id)}
                                    onChange={() => toggle(item.id)}
                                />
                                <span className="text-sm">{item.label} {item.count ? <span className="text-xs text-gray-400">({item.count})</span> : null}</span>
                            </label>
                        )
                    })}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            disabled={page === 0}
                            className={`px-3 py-1 border rounded ${page === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
                        >
                            <FaAngleLeft />
                        </button>
                        <span className="text-sm text-gray-600">Page {page + 1} / {totalPages || 1}</span>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                            disabled={page >= totalPages - 1}
                            className={`px-3 py-1 border rounded ${page >= totalPages - 1 ? "opacity-40 cursor-not-allowed" : ""}`}
                        >
                            <FaAngleRight />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={() => { setLocalSel([]); }} className="px-3 py-1 border rounded">Clear</button>
                        <button
                            onClick={() => { onApply(localSel); onClose(); }}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FilterSidebar({ clusterOrder, filters, selectedFilters, onChange }: FilterSidebarProps) {
    const [openModalFor, setOpenModalFor] = useState<string | null>(null);
    const [searchMap, setSearchMap] = useState<Record<string, string>>({});

    function handleToggle(filterId: string, value: string, selectType: string) {
        const current = selectedFilters[filterId] || [];
        if (selectType === "single") {
            // toggle single selection
            const newVal = current.includes(value) ? [] : [value];
            onChange(filterId, newVal);
            return;
        }
        const exists = current.includes(value);
        const newVals = exists ? current.filter((v) => v !== value) : [...current, value];
        onChange(filterId, newVals);
    }

    return (
        <aside className="w-72">
            <div className="bg-white border rounded-lg p-4 shadow-sm sticky top-24">
                <h2 className="font-bold text-lg mb-4">All Filters</h2>

                <div className="space-y-6">
                    {clusterOrder.map((id, idx) => {
                        const f = filters[id];
                        if (!f) return null;
                        const shownCount = 4; // show first N inline
                        const searchQuery = searchMap[id] || "";
                        const displayList = (f.data || [])
                            .filter((v: FilterValue) => v.label.toLowerCase().includes(searchQuery.toLowerCase()))
                            .slice(0, shownCount);
                        return (
                            <div key={id}>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold">{f.label}</h3>
                                    {/* collapse arrow placeholder */}
                                    <span className="text-gray-400">▾</span>
                                </div>

                                {f.isSearchApplicable && (
                                    <input
                                        placeholder={`Search ${f.label}`}
                                        className="w-full border rounded px-2 py-1 mb-2 text-sm"
                                        value={searchQuery}
                                        onChange={(e) => setSearchMap((s) => ({ ...s, [id]: e.target.value }))}
                                    />
                                )}

                                <div className="space-y-1">
                                    {/* {displayList.map((val, displayIdx) => {
                                        const checked = (selectedFilters[id] || []).includes(val.id);
                                        return (
                                            <label key={displayIdx} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => handleToggle(id, val.id, f.selectType)}
                                                />
                                                <span className="text-sm">{val.label} <span className="text-xs text-gray-400">({val.count})</span></span>
                                            </label>
                                        );
                                    })} */}
                                    {displayList.map((val, displayIdx) => {
                                        const checked = (selectedFilters[id] || []).includes(val.id);

                                        // Tag-style radio buttons
                                        if (!f.isSearchApplicable && f.selectType === "single") {
                                            return (
                                                <button
                                                    key={displayIdx}
                                                    onClick={() => handleToggle(id, val.id, f.selectType)}
                                                    className={`text-sm mr-2 px-3 py-1 rounded-full border ${checked ? "bg-gray-600 text-white border-gray-600" : "bg-gray-100 text-gray-700 border-gray-300"
                                                        }`}
                                                >
                                                    {val.label} <span className="text-xs text-gray-400">({val.count})</span>
                                                </button>
                                            );
                                        }

                                        // Default checkbox UI
                                        return (
                                            <label key={displayIdx} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => handleToggle(id, val.id, f.selectType)}
                                                />
                                                <span className="text-sm">{val.label} <span className="text-xs text-gray-400">({val.count})</span></span>
                                            </label>
                                        );
                                    })}
                                </div>

                                {Array.isArray(f.data) && f.data.length > shownCount && (
                                    <div className="mt-2">
                                        <button onClick={() => setOpenModalFor(id)} className="text-sm text-blue-600">+{f.data.length - shownCount} more</button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal rendering */}
            {openModalFor && filters[openModalFor] && (
                <ModalAllValues
                    filter={filters[openModalFor]}
                    currentSelected={selectedFilters[openModalFor] || []}
                    onClose={() => setOpenModalFor(null)}
                    onApply={(sel) => onChange(openModalFor, sel)}
                />
            )}
        </aside>
    );
}
