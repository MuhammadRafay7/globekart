'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Check, X, Zap, Crown, Star, Users } from 'lucide-react'

const plans = [
    {
        name: 'Free',
        icon: Users,
        price: { monthly: 0, yearly: 0 },
        description: 'Perfect for casual shoppers getting started with GoCart.',
        color: '#64748B',
        badge: null,
        features: [
            { text: 'Browse all products', included: true },
            { text: 'Basic search & filters', included: true },
            { text: 'Shopping cart', included: true },
            { text: 'Order tracking', included: true },
            { text: 'Email support', included: true },
            { text: 'Priority shipping', included: false },
            { text: 'Exclusive member deals', included: false },
            { text: 'Early access to sales', included: false },
            { text: 'Free shipping (always)', included: false },
            { text: 'Dedicated support', included: false },
        ],
        cta: 'Get Started Free',
        ctaHref: '/shop',
        ctaStyle: 'border',
    },
    {
        name: 'Plus',
        icon: Zap,
        price: { monthly: 9, yearly: 79 },
        description: 'For smart shoppers who want more savings and perks.',
        color: '#00C950',
        badge: 'Most Popular',
        features: [
            { text: 'Browse all products', included: true },
            { text: 'Advanced search & filters', included: true },
            { text: 'Shopping cart', included: true },
            { text: 'Order tracking', included: true },
            { text: 'Priority email support', included: true },
            { text: 'Priority shipping', included: true },
            { text: 'Exclusive member deals', included: true },
            { text: 'Early access to sales', included: true },
            { text: 'Free shipping (always)', included: true },
            { text: 'Dedicated support', included: false },
        ],
        cta: 'Become a Plus Member',
        ctaHref: '/create-store',
        ctaStyle: 'solid',
    },
    {
        name: 'Pro',
        icon: Crown,
        price: { monthly: 29, yearly: 249 },
        description: 'For power users and sellers who need everything GoCart offers.',
        color: '#A684FF',
        badge: 'Best Value',
        features: [
            { text: 'Browse all products', included: true },
            { text: 'Advanced search & filters', included: true },
            { text: 'Shopping cart', included: true },
            { text: 'Order tracking', included: true },
            { text: '24/7 priority support', included: true },
            { text: 'Priority shipping', included: true },
            { text: 'Exclusive member deals', included: true },
            { text: 'Early access to sales', included: true },
            { text: 'Free shipping (always)', included: true },
            { text: 'Dedicated account manager', included: true },
        ],
        cta: 'Go Pro',
        ctaHref: '/create-store',
        ctaStyle: 'purple',
    },
]

const faqs = [
    { q: 'Can I switch plans at any time?', a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.' },
    { q: 'Is there a free trial for paid plans?', a: 'Absolutely. All paid plans come with a 14-day free trial. No credit card required to start.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers. All payments are secured with SSL encryption.' },
    { q: 'Can I cancel my subscription?', a: 'Yes, you can cancel anytime. You\'ll retain access until the end of your billing period with no hidden fees.' },
    { q: 'Do you offer team or business plans?', a: 'Yes! Contact our sales team at sales@globekart.com to discuss custom enterprise pricing.' },
]

export default function PricingPage() {
    const [yearly, setYearly] = useState(false)
    const [openFaq, setOpenFaq] = useState(null)

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">

            {/* Hero */}
            <section className="relative bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 px-6 text-center overflow-hidden">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                        <Star size={12} />
                        Membership Plans
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4 leading-tight">
                        Simple, transparent <span className="text-green-500">pricing</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
                        Choose the plan that works for you. Upgrade or cancel anytime.
                    </p>

                    {/* Billing toggle */}
                    <div className="inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-full p-1.5">
                        <button
                            onClick={() => setYearly(false)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!yearly ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setYearly(true)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${yearly ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        >
                            Yearly
                            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-30%</span>
                        </button>
                    </div>
                </div>
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-200/30 dark:bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />
            </section>

            {/* Plans */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan, i) => {
                        const price = yearly ? plan.price.yearly : plan.price.monthly
                        const isPopular = plan.badge === 'Most Popular'
                        return (
                            <div
                                key={i}
                                className={`relative flex flex-col rounded-3xl border p-7 transition-all duration-300 hover:shadow-xl ${isPopular
                                    ? 'border-green-400 dark:border-green-600 bg-white dark:bg-slate-800 shadow-lg scale-[1.02]'
                                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                                    }`}
                            >
                                {plan.badge && (
                                    <div
                                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap"
                                        style={{ backgroundColor: plan.color }}
                                    >
                                        {plan.badge}
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: plan.color + '20' }}>
                                        <plan.icon size={20} style={{ color: plan.color }} />
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{plan.name}</h2>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-end gap-1">
                                        <span className="text-4xl font-bold text-slate-800 dark:text-slate-100">
                                            {currency}{price}
                                        </span>
                                        {price > 0 && (
                                            <span className="text-slate-400 dark:text-slate-500 pb-1 text-sm">
                                                /{yearly ? 'yr' : 'mo'}
                                            </span>
                                        )}
                                    </div>
                                    {yearly && price > 0 && (
                                        <p className="text-xs text-green-500 mt-1">
                                            Save {currency}{(plan.price.monthly * 12 - plan.price.yearly)} per year
                                        </p>
                                    )}
                                </div>

                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{plan.description}</p>

                                <ul className="space-y-2.5 flex-1 mb-8">
                                    {plan.features.map((feature, j) => (
                                        <li key={j} className={`flex items-center gap-2.5 text-sm ${feature.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-300 dark:text-slate-600'}`}>
                                            {feature.included
                                                ? <Check size={16} className="text-green-500 shrink-0" />
                                                : <X size={16} className="text-slate-300 dark:text-slate-600 shrink-0" />
                                            }
                                            {feature.text}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={plan.ctaHref}
                                    className={`w-full text-center py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95 ${plan.ctaStyle === 'solid'
                                        ? 'bg-green-500 text-white hover:bg-green-600 shadow-md shadow-green-200 dark:shadow-green-900/30'
                                        : plan.ctaStyle === 'purple'
                                            ? 'bg-purple-500 text-white hover:bg-purple-600 shadow-md shadow-purple-200 dark:shadow-purple-900/30'
                                            : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* Feature comparison table */}
            <section className="py-10 px-6 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center mb-10">Compare All Features</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="text-left py-3 text-slate-600 dark:text-slate-400 font-semibold">Feature</th>
                                    {plans.map(p => (
                                        <th key={p.name} className="py-3 text-center font-semibold" style={{ color: p.color }}>{p.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {plans[0].features.map((feature, i) => (
                                    <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                        <td className="py-3 text-slate-700 dark:text-slate-300">{feature.text}</td>
                                        {plans.map(plan => (
                                            <td key={plan.name} className="py-3 text-center">
                                                {plan.features[i].included
                                                    ? <Check size={16} className="text-green-500 mx-auto" />
                                                    : <X size={16} className="text-slate-300 dark:text-slate-600 mx-auto" />
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 px-6 bg-slate-50 dark:bg-slate-800/50">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-green-500 dark:hover:text-green-400 transition"
                                >
                                    {faq.q}
                                    <span className={`text-lg transition-transform duration-200 ml-4 ${openFaq === i ? 'rotate-180' : ''}`}>↓</span>
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 px-6">
                <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">Start shopping smarter today</h2>
                    <p className="text-green-100 mb-8">Join thousands of members enjoying exclusive deals and perks.</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/shop" className="px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg">
                            Browse Free
                        </Link>
                        <Link href="/create-store" className="px-8 py-3 bg-white/20 text-white border border-white/40 rounded-full font-semibold hover:bg-white/30 transition-all">
                            Become Plus Member
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
