import { categories } from "@/assets/assets";
import Link from "next/link";

const CategoriesMarquee = () => {
    return (
        <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group sm:my-16 my-10">
            <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-r from-white dark:from-slate-900 to-transparent" />
            <div className="flex min-w-[200%] animate-[marqueeScroll_10s_linear_infinite] sm:animate-[marqueeScroll_30s_linear_infinite] group-hover:[animation-play-state:paused] gap-3">
                {[...categories, ...categories, ...categories, ...categories].map((cat, index) => (
                    <Link
                        href={`/shop?search=${cat.toLowerCase()}`}
                        key={index}
                        className="px-5 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 text-xs sm:text-sm hover:bg-green-500 hover:text-white dark:hover:bg-green-500 dark:hover:text-white active:scale-95 transition-all duration-300 whitespace-nowrap font-medium"
                    >
                        {cat}
                    </Link>
                ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-white dark:from-slate-900 to-transparent" />
        </div>
    );
};

export default CategoriesMarquee;
