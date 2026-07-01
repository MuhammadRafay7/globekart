'use client'
import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'

const contactInfo = [
    {
        icon: Phone,
        title: 'Phone',
        detail: '+1-212-456-7890',
        sub: 'Mon-Fri 9am to 6pm',
        color: '#00C950',
    },
    {
        icon: Mail,
        title: 'Email',
        detail: 'support@globekart.com',
        sub: 'We reply within 24 hours',
        color: '#A684FF',
    },
    {
        icon: MapPin,
        title: 'Office',
        detail: '794 Francisco St',
        sub: 'San Francisco, CA 94102',
        color: '#FF8904',
    },
    {
        icon: Clock,
        title: 'Working Hours',
        detail: 'Mon - Fri: 9am - 6pm',
        sub: 'Weekend: 10am - 4pm',
        color: '#FF4D6D',
    },
]

const faqs = [
    { q: 'How do I track my order?', a: 'Once your order is shipped, you\'ll receive a tracking number via email. You can also view order status in the My Orders section.' },
    { q: 'What is your return policy?', a: 'We offer a 7-day hassle-free return policy. Simply contact us and we\'ll arrange a pickup at no extra cost.' },
    { q: 'Do you ship internationally?', a: 'Yes! We ship to over 25 countries. International shipping typically takes 7-14 business days.' },
    { q: 'How can I become a seller?', a: 'Visit our "Create Your Store" page to apply. We review applications within 2-3 business days.' },
]

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [sending, setSending] = useState(false)
    const [openFaq, setOpenFaq] = useState(null)

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSending(true)
        await new Promise(r => setTimeout(r, 1200))
        toast.success('Message sent! We\'ll get back to you shortly.')
        setForm({ name: '', email: '', subject: '', message: '' })
        setSending(false)
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">

            {/* Hero */}
            <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 py-20 px-6 overflow-hidden">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                        <MessageSquare size={12} />
                        Get in Touch
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                        We&apos;d love to <span className="text-purple-500 dark:text-purple-400">hear from you</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        Have a question, suggestion, or just want to say hello? Our team is here to help.
                    </p>
                </div>
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
            </section>

            {/* Contact Info Cards */}
            <section className="py-14 px-6 border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
                    {contactInfo.map((info, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 text-center hover:shadow-md transition-shadow group">
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                                style={{ backgroundColor: info.color + '20' }}
                            >
                                <info.icon size={22} style={{ color: info.color }} />
                            </div>
                            <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{info.title}</p>
                            <p className="text-slate-800 dark:text-slate-100 font-medium text-sm mt-1">{info.detail}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{info.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Form + FAQ */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">

                    {/* Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Send us a message</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Fill out the form and we&apos;ll get back to you as soon as possible.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Your Name *</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 dark:focus:border-purple-500 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Email Address *</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 dark:focus:border-purple-500 transition"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Subject</label>
                                <input
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 dark:focus:border-purple-500 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Message *</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Tell us more about your question..."
                                    className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 dark:focus:border-purple-500 transition resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={sending}
                                className="flex items-center gap-2 w-full justify-center bg-purple-500 hover:bg-purple-600 disabled:opacity-70 text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                            >
                                <Send size={16} />
                                {sending ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* FAQ */}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Frequently Asked</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Quick answers to common questions.</p>

                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                    >
                                        {faq.q}
                                        <span className={`ml-3 text-lg transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}>
                                            ↓
                                        </span>
                                    </button>
                                    {openFaq === i && (
                                        <div className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 animate-fade-in-up">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Map placeholder */}
                        <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                            <div className="text-center text-slate-400 dark:text-slate-500">
                                <MapPin size={32} className="mx-auto mb-2" />
                                <p className="text-sm font-medium">794 Francisco St, San Francisco</p>
                                <p className="text-xs mt-1">CA 94102, USA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
