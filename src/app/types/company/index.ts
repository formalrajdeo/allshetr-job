// -------------------- components/company/index.tsx --------------------
export interface GroupTagMap {
    businessSize?: string[];
    natureofBusiness?: string[];
    ownershipType?: string[];
    [key: string]: string[] | undefined;
}

export interface GroupDetails {
    groupId: number;
    groupName: string;
    groupLogo: {
        desktop: string;
        mobile?: string;
    };
    groupTags: GroupTagMap;
    noOfReviews?: number;
    rating?: number;
    industry?: string;
    location?: string;
}

export interface FilterItem {
    id: string;
    label: string;
    count: number;
}

export interface Cluster {
    id: string;
    label: string;
    paramKey: string;
    selectType: "multi" | "single";
    isSearchApplicable?: boolean;
    state?: string;
    type?: string;
    data: FilterItem[];
}

export interface CompanySearchData {
    noOfGroups: number;
    clusters: Record<string, Cluster>;
    clusterOrder: string[];
    groupDetails: GroupDetails[];
}

export type GlobalCompanyCategoriesData = {
    id: number;
    label: string;
    count: string;
    value: string;
};

// -------------------- GlobalCompanyCategorySlider.tsx --------------------

export type GlobalCompanyCategorySliderProps<T> = {
    data: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    options?: {
        showScrollbar?: boolean; // show/hide native scrollbar
        arrowColor?: string; // Tailwind color classes
        itemWidth?: number; // min card width in px (e.g., 200)
        gap?: number; // gap between items in px
    };
};

// -------------------- FilterSidebar.tsx --------------------
export type FilterValue = { id: string; label: string; count?: number };
export type FilterDef = {
    id: string;
    label: string;
    paramKey: string;
    selectType: "multi" | "single";
    isSearchApplicable?: boolean;
    state?: string;
    type?: string;
    data: FilterValue[];
};

export type FiltersMap = Record<string, FilterDef>;

export type FilterSidebarProps = {
    clusterOrder: string[];
    filters: FiltersMap;
    selectedFilters: Record<string, string[]>; // id -> values
    onChange: (filterId: string, values: string[]) => void;
};

// -------------------- CompanyCard.tsx --------------------
export interface CompanyCardGroupDetails {
    groupId: number;
    groupName: string;
    groupLogo: {
        desktop: string;
        mobile?: string;
    };
    groupTags?: {
        businessSize?: string[];
        natureofBusiness?: string[];
        ownershipType?: string[];
        [key: string]: string[] | undefined;
    };
    noOfReviews?: number;
    rating?: number;
    industry?: string;
    location?: string;
}

// -------------------- sample.tsx --------------------
// -------------------- sample.tsx --------------------
// -------------------- sample.tsx --------------------

