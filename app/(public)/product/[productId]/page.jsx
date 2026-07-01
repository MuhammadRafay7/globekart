'use client'
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const products = useSelector(state => state.product.list);

    useEffect(() => {
        if (products.length > 0) {
            setProduct(products.find(p => p.id === productId) || null);
        }
        scrollTo(0, 0);
    }, [productId, products]);

    if (!product && products.length > 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center text-slate-500 dark:text-slate-400">
                <p>Product not found.</p>
            </div>
        );
    }

    return (
        <div className="mx-6 bg-white dark:bg-slate-900 min-h-screen">
            <div className="max-w-7xl mx-auto py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-8">
                    <Link href="/" className="hover:text-green-500 transition">Home</Link>
                    <ChevronRight size={12} />
                    <Link href="/shop" className="hover:text-green-500 transition">Products</Link>
                    {product && (
                        <>
                            <ChevronRight size={12} />
                            <span className="text-slate-600 dark:text-slate-300">{product.name}</span>
                        </>
                    )}
                </nav>

                {product ? (
                    <>
                        <ProductDetails product={product} />
                        <ProductDescription product={product} />
                    </>
                ) : (
                    <div className="flex items-center justify-center min-h-60">
                        <div className="text-slate-400 dark:text-slate-500">Loading...</div>
                    </div>
                )}
            </div>
        </div>
    );
}
