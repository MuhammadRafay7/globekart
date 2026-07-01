'use client'
import { XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"

const AddressModal = ({ setShowAddressModal }) => {
    const [address, setAddress] = useState({ name: '', email: '', street: '', city: '', state: '', zip: '', country: '', phone: '' })

    const handleAddressChange = (e) => {
        setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowAddressModal(false)
    }

    const inputClass = "p-3 px-4 outline-none border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl w-full text-sm focus:border-green-400 transition"

    return (
        <div className="fixed inset-0 z-50 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md p-7 relative">
                <button
                    onClick={() => setShowAddressModal(false)}
                    className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                    <XIcon size={20} />
                </button>

                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
                    Add New <span className="text-green-500">Address</span>
                </h2>

                <form onSubmit={e => toast.promise(handleSubmit(e), { loading: 'Saving address...' })} className="space-y-3">
                    <input name="name" onChange={handleAddressChange} value={address.name} className={inputClass} type="text" placeholder="Full Name" required />
                    <input name="email" onChange={handleAddressChange} value={address.email} className={inputClass} type="email" placeholder="Email address" required />
                    <input name="street" onChange={handleAddressChange} value={address.street} className={inputClass} type="text" placeholder="Street address" required />
                    <div className="flex gap-3">
                        <input name="city" onChange={handleAddressChange} value={address.city} className={inputClass} type="text" placeholder="City" required />
                        <input name="state" onChange={handleAddressChange} value={address.state} className={inputClass} type="text" placeholder="State" required />
                    </div>
                    <div className="flex gap-3">
                        <input name="zip" onChange={handleAddressChange} value={address.zip} className={inputClass} type="text" placeholder="Zip code" required />
                        <input name="country" onChange={handleAddressChange} value={address.country} className={inputClass} type="text" placeholder="Country" required />
                    </div>
                    <input name="phone" onChange={handleAddressChange} value={address.phone} className={inputClass} type="tel" placeholder="Phone number" required />
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl hover:scale-[1.02] active:scale-95 transition-all mt-2">
                        Save Address
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddressModal
