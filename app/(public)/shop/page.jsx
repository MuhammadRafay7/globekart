'use client'
import { Suspense, useState, useMemo } from "react"
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"
import { categories } from "@/assets/assets"

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Best Rated' },
    { value: 'discount', label: 'Biggest Discount' },
]

function ShopContent() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search') || ''
    const router = useRouter()
    const products = useSelector(state => state.product.list)

    const [selectedCategories, setSelectedCategories] = useState([])
    const [priceRange, setPriceRange] = useState([0, 500])
    const [sortBy, setSortBy] = useState('newest')
    const [showFilters, setShowFilters] = useState(false)
    const [showCatFilter, setShowCatFilter] = useState(true)

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const toggleCategory = (cat) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        )
    }

    const filteredProducts = useMemo(() => {
        let list = products

        if (search) {
            list = list.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.category.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (selectedCategories.length > 0) {
            list = list.filter(p => selectedCategories.includes(p.category))
        }

        list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

        switch (sortBy) {
            case 'price-asc': return [...list].sort((a, b) => a.price - b.price)
            case 'price-desc': return [...list].sort((a, b) => b.price - a.price)
            case 'rating': return [...list].sort((a, b) => b.rating.length - a.rating.length)
            case 'discount': return [...list].sort((a, b) => (b.mrp - b.price) - (a.mrp - a.price))
            default: return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }
    }, [products, search, selectedCategories, priceRange, sortBy])

    const clearFilters = () => {
        setSelectedCategories([])
        setPriceRange([0, 500])
        setSortBy('newest')
    }

    const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 500 || sortBy !== 'newest'

    return (
        <div className="min-h-[70vh] mx-6 py-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                        {search && (
                            <button onClick={() => router.push('/shop')} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition">
                                <MoveLeftIcon size={20} />
                            </button>
                        )}
                        <div>
                            <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                                {search ? `Results for "${search}"` : 'All Products'}
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-3 py-2 outline-none cursor-pointer"
                        >
                            {SORT_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>

                        {/* Filter toggle (mobile) */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition lg:hidden"
                        >
                            <SlidersHorizontal size={16} />
                            Filters
                            {hasActiveFilters && <span className="bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">!</span>}
                        </button>

                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 flex items-center gap-1 transition">
                                <X size={14} /> Clear
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <aside className={`w-60 shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
                        <div className="sticky top-4 space-y-6">

                            {/* Category Filter */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
                                <button
                                    className="flex items-center justify-between w-full text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4"
                                    onClick={() => setShowCatFilter(!showCatFilter)}
                                >
                                    Categories
                                    {showCatFilter ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                                {showCatFilter && (
                                    <div className="space-y-2">
                                        {categories.map(cat => (
                                            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(cat)}
                                                    onChange={() => toggleCategory(cat)}
                                                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 accent-green-500 cursor-pointer"
                                                />
                                                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">
                                                    {cat}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Price Range Filter */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
                                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">Price Range</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                                        <span>{currency}{priceRange[0]}</span>
                                        <span>{currency}{priceRange[1]}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="500"
                                        step="10"
                                        value={priceRange[1]}
                                        onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full accent-green-500 cursor-pointer"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <div className="flex-1">
                                            <label className="text-[10px] text-slate-400 dark:text-slate-500">Min</label>
                                            <input
                                                type="number"
                                                min="0"
                                                max={priceRange[1]}
                                                value={priceRange[0]}
                                                onChange={e => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                                                className="w-full text-xs border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded px-2 py-1 outline-none"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-[10px] text-slate-400 dark:text-slate-500">Max</label>
                                            <input
                                                type="number"
                                                min={priceRange[0]}
                                                max="500"
                                                value={priceRange[1]}
                                                onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value) || 500])}
                                                className="w-full text-xs border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded px-2 py-1 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Active filters summary */}
                            {selectedCategories.length > 0 && (
                                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Active Filters</h3>
                                        <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-600">Clear all</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCategories.map(cat => (
                                            <span key={cat} className="flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2.5 py-1 rounded-full">
                                                {cat}
                                                <button onClick={() => toggleCategory(cat)} className="hover:text-red-500 transition ml-0.5">
                                                    <X size={10} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-8">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center min-h-[40vh] text-slate-400 dark:text-slate-500 gap-4">
                                <div className="text-6xl">🔍</div>
                                <p className="text-xl font-medium">No products found</p>
                                <p className="text-sm">Try adjusting your filters or search terms</p>
                                <button onClick={clearFilters} className="mt-2 px-6 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition">
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Shop() {
    return (
        <Suspense fallback={
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-slate-400 dark:text-slate-500 text-lg">Loading shop...</div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    )
}
