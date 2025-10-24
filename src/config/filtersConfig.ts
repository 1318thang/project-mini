export const keywordCategoryMap: Record<string, string> = {
    shirt: "fashion",
    jean: "fashion",
    chair: "furniture",
    table: "furniture",
    nike: "sport",
    adidas: "sport",
    phone: "electronic",
    laptop: "electronic",
};
export const filtersByCategory: Record<string, { title: string; options: string[] }[]> = {
    fashion: [
        { title: "Size", options: ["S", "M", "L", "XL"] },
        { title: "Color", options: ["Red", "Blue", "Black", "White"] },
        { title: "Material", options: ["Cotton", "Polyester", "Wool"] },
    ],
    furniture: [
        { title: "Material", options: ["Wood", "Metal", "Plastic"] },
        { title: "Color", options: ["Brown", "Black", "White"] },
        { title: "Size", options: ["Small", "Medium", "Large"] },
    ],
    sport: [
        { title: "Brand", options: ["Nike", "Adidas", "Puma"] },
        { title: "Weight", options: ["Light", "Medium", "Heavy"] },
        { title: "Type", options: ["Basketball", "Soccer", "Tennis"] },
    ],
    electronic: [
        { title: "Brand", options: ["Apple", "Samsung", "Sony"] },
        { title: "Features", options: ["Bluetooth", "Wi-Fi", "Touchscreen"] },
        { title: "Warranty", options: ["1 Year", "2 Years", "3 Years"] },
    ],
};