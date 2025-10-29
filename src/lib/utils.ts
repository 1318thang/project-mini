import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ✅ Hàm cn() giúp gộp class Tailwind thông minh
export function cn(...inputs: any[]) {
    return twMerge(clsx(inputs));
}