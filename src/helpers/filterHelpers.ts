import { keywordCategoryMap } from '../config/filtersConfig';

export const getCategoryFromKeyword = (keyword?: string): string => {
    if (!keyword) return "fashion"; // default
    const kw = keyword.toLowerCase();
    return Object.entries(keywordCategoryMap).find(([key]) => kw.includes(key))?.[1] || "fashion";
};