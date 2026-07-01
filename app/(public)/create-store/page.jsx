'use client'
import { assets } from "@/assets/assets"
import { useEffect, useState } from "react"
import Image from "next/image"
import toast from "react-hot-toast"
import Loading from "@/components/Loading"
import { Store, Upload } from "lucide-react"

export default function CreateStore() {
    const [alreadySubmitted, setAlreadySubmitted] = useState(false)
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")

    const [storeInfo, setStoreInfo] = useState({
        name: "", username: "", description: "", email: "", contact: "", address: "", image: ""
    })

    const onChangeHandler = (e) => {
        setStoreInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const fetchSellerStatus = async () => {
        setLoading(false)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        fetchSellerStatus()
    }, [])

    const inputClass = "border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 w-full max-w-lg p-3 px-4 rounded-xl outline-none focus:border-green-400 transition text-sm"

    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            {!alreadySubmitted ? (
                <div className="mx-6 py-14">
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-10">
                            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                                <Store size={12} />
                                Seller Program
                            </div>
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                                Create Your <span className="text-green-500">Store</span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                Become a seller on GoCart. Submit your store details for review — you&apos;ll be activated after admin verification within 2-3 business days.
                            </p>
                        </div>

                        <form onSubmit={e => toast.promise(onSubmitHandler(e), { loading: 'Submitting...' })} className="space-y-5">
                            {/* Logo upload */}
                            <label className="block cursor-pointer">
                                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">Store Logo</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center">
                                        {storeInfo.image
                                            ? <Image src={URL.createObjectURL(storeInfo.image)} className="w-full h-full object-cover" alt="" width={80} height={80} />
                                            : <Upload size={24} className="text-slate-400" />
                                        }
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Upload logo</p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500">PNG, JPG up to 5MB</p>
                                    </div>
                                </div>
                                <input type="file" accept="image/*" onChange={e => setStoreInfo(p => ({ ...p, image: e.target.files[0] }))} hidden />
                            </label>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1.5">Store Name *</label>
                                    <input name="name" onChange={onChangeHandler} value={storeInfo.name} type="text" placeholder="My Awesome Store" className={inputClass} required />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1.5">Username *</label>
                                    <input name="username" onChange={onChangeHandler} value={storeInfo.username} type="text" placeholder="myawesomestore" className={inputClass} required />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1.5">Description *</label>
                                <textarea name="description" onChange={onChangeHandler} value={storeInfo.description} rows={4} placeholder="Tell customers what your store is about..." className={`${inputClass} resize-none`} required />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1.5">Email *</label>
                                    <input name="email" onChange={onChangeHandler} value={storeInfo.email} type="email" placeholder="store@example.com" className={inputClass} required />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1.5">Contact Number</label>
                                    <input name="contact" onChange={onChangeHandler} value={storeInfo.contact} type="tel" placeholder="+1 234 567 8900" className={inputClass} />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide block mb-1.5">Store Address</label>
                                <textarea name="address" onChange={onChangeHandler} value={storeInfo.address} rows={3} placeholder="Your store's physical address..." className={`${inputClass} resize-none`} />
                            </div>

                            <button className="w-full sm:w-auto px-12 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all mt-4">
                                Submit for Review
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
                    <p className="sm:text-2xl lg:text-3xl font-semibold text-slate-600 dark:text-slate-300 max-w-2xl">{message}</p>
                    {status === "approved" && (
                        <p className="mt-5 text-slate-400 dark:text-slate-500">
                            Redirecting to dashboard in <span className="font-semibold text-green-500">5 seconds</span>
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
