import React from "react";
type SkeletonProps = {
    type: "cart" | "product";
    count?: number; // số ô skeleton cần hiển thị
};
const Skeleton: React.FC<SkeletonProps> = ({ type, count = 6 }) => {
    return type === "cart" ? (
        <ul className="flex flex-col gap-4 animate-pulse">
            <li className="flex flex-row gap-4 bg-white p-3 rounded shadow-sm">
                <div className="w-[120px] h-[140px] bg-gray-300 rounded-lg flex-shrink-0" />
                <div className="flex-1 flex flex-col justify-between">
                    <div className="hidden lg:flex flex-col gap-2">
                        <div className="h-5 w-1/2 bg-gray-300 rounded-md"></div>
                        <div className="h-4 w-1/3 bg-gray-300 rounded-md"></div>
                        <div className="h-10 w-2/3 bg-gray-300 rounded-md"></div>
                    </div>
                    <div className="flex flex-col gap-2 lg:hidden">
                        <div className="h-5 w-2/3 bg-gray-300 rounded-md"></div>
                        <div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>
                        <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                    </div>
                </div>
                <div className="w-16 h-5 bg-gray-300 rounded-md flex-shrink-0 self-start"></div>
            </li>
        </ul>
    ) : type === "product" ? (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-[1px] lg:gap-[41.5px] animate-pulse">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="bg-white p-3 rounded-lg shadow flex flex-col gap-2"
                >
                    {/* Image */}
                    <div className="w-full h-[180px] bg-gray-300 rounded-lg"></div>
                    {/* Title */}
                    <div className="h-5 w-3/4 bg-gray-300 rounded-md"></div>
                    {/* Price */}
                    <div className="h-5 w-1/4 bg-gray-300 rounded-md mt-auto"></div>
                </div>
            ))}
        </div>
    ) : (
        <div></div>
    );
};
export default Skeleton;