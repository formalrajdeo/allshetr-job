// components/CompanyCard.tsx
import React from "react";
import { FaAngleRight } from "../icons";
import { CompanyCardGroupDetails } from "@/app/types";

export default function CompanyCard({ company }: { company: CompanyCardGroupDetails }) {
    return (
        <div className="p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition flex justify-between items-center">
            <div className="flex gap-3">
                {company.groupLogo?.desktop && (
                    <img
                        src={company.groupLogo.desktop}
                        alt={company.groupName}
                        className="w-12 h-12 object-contain border rounded"
                    />
                )}
                <div>
                    <h3 className="font-semibold">{company.groupName}</h3>
                    {company.rating && (
                        <p className="text-sm text-gray-500">
                            ⭐ {company.rating} | {company.noOfReviews ?? 0} reviews
                        </p>
                    )}
                    <div className="flex gap-2 flex-wrap mt-2">
                        {company.groupTags?.businessSize?.map((t, i) => (
                            <span key={i} className="px-2 py-1 text-xs bg-gray-100 rounded">
                                {t}
                            </span>
                        ))}
                        {company.groupTags?.natureofBusiness?.map((t, i) => (
                            <span key={i} className="px-2 py-1 text-xs bg-gray-100 rounded">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <FaAngleRight className="text-gray-400" />
        </div>
    );
}
