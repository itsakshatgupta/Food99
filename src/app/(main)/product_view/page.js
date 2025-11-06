"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowLeft, Mic, Search, Verified, PhoneCall, MessageCircle, MessageSquare, MessageSquareX, ShoppingCartIcon, ShoppingBasket, ShoppingBag, ThumbsUp, ArrowRight } from "lucide-react"; // optional icon lib
import { useEffect, useState, useContext } from "react";
import { Icon } from "@/components/lib/icons";
import { dynamic_ } from "@/components/main-context";

// SAMPLE product data (replace with real props/fetch)
const sampleProduct = {
    id: "prod-123",
    title: "Double Beam EOT Crane - 10 Ton Capacity",
    sku: "EOT-10T-DB",
    price: 600000,
    mrp: 700000,
    currency: "₹",
    rating: 4.3,
    ratingCount: 54,
    thumbnails: [
        "/test_img/nmk12.webp",
        "/test_img/nmk13.jpg",
        "/test_img/nmk14.jpeg",
        "/test_img/nmk14.jpeg",
        "/test_img/nmk14.png"
    ],
    highlights: [
        "Capacity: 10 Ton",
        "Span: 12m",
        "Manufacturer warranty: 12 months",
        "Factory-tested, ready to ship"
    ],
    description:
        "High-quality Double Beam EOT Crane suited for manufacturing and warehouses. Robust structure, energy efficient motor, and seamless controls.",
    specs: {
        capacity: "10 Ton",
        span: "12 m",
        voltage: "415 V",
        speed: "2 m/min (hoist), 20 m/min (trolley)"
    },
    seller: {
        id: "seller-987",
        name: "Akshat Machinary Distributors",
        city: "Varanasi",
        verified: true,
        phone: "+91-98xxxxxxx",
        responseTime: "1-6 hours"
    },
    offers: ["10% off on first order", "Free installation support"],
    reviews: [
        {
            user: "Rahul Verma",
            rating: 5,
            comment: "Excellent build quality!",
            img: [
                "/test_img/nmk4.jpg",
                "/test_img/nmk10.jpeg",
                "/test_img/nmk11.webp",
                "/test_img/nmk1.jpg",
                "/test_img/nmk12.jpeg",
            ],
        },
        {
            user: "Manoj Kumar",
            rating: 4,
            comment: "Good crane but delivery was delayed.",
            img: [
                "/test_img/nmk12.jpeg",
                "/test_img/nmk11.webp",
                "/test_img/nmk1.jpg",
            ],
        },
        {
            user: "Sneha Patil",
            rating: 5,
            comment: "Very reliable and smooth operation.",
            img: [
                "/test_img/nmk1.jpg",
                "/test_img/nmk10.jpeg",
                "/test_img/nmk11.webp",
                "/test_img/nmk4.jpg",
            ],
        },
    ],
    questions: [
        {
            q: "Can this be customized for 25-ton load?",
            a: "Yes, we provide custom load capacities on request.",
        },
        {
            q: "What is the delivery time?",
            a: "Usually within 15–20 business days depending on location.",
        },
    ],

};

function Price({ price, mrp, currency = "₹" }) {
    const savings = mrp ? Math.max(0, mrp - price) : 0;
    return (
        <div className="space-y-1">
            <div className="flex items-end gap-3">
                <div className="text-3xl font-bold text-emerald-600">
                    {currency}{price.toLocaleString()}
                </div>
                {mrp && (
                    <div className="text-sm text-gray-400 line-through">
                        {currency}{mrp.toLocaleString()}
                    </div>
                )}
            </div>
            {savings > 0 && (
                <div className="text-xs text-gray-600">You save {currency}{savings.toLocaleString()}</div>
            )}
        </div>
    );
}

export default function ProductPage({ product = sampleProduct }) {
    const { device, cart__i, set_dynamics_portal_main, usr, floaters, set_floaters, set_feature_option, set_dynamics_portal_ab } = useContext(dynamic_);
    const [mainIndex, setMainIndex] = useState(0);
    const [qty, setQty] = useState(1);

    const addToCart = () => {
        // wire to your cart handler
        alert("Added to cart (demo)");
    };

    const enquireSeller = () => {
        // open modal or start chat / lead flow
        alert("Enquiry sent to seller (demo)");
    };







    return (
        <>

            <div className={`df aic jcsb pdx08 ${device==='pc'&& 'pdy01'} gap1 z-50  bg-[#EFEBE9] pS top-0`} style={{ boxShadow: device==='mobile'&&'0 0 5px 1px #f1f1f1ff' }}>

                <span className="df aic font-medium font500 gap03"><ArrowLeft size="22px" className="font300" />Continue The Shopping</span>
                {device==='pc'&&<div className=" ox  fx1 bg-[#fff8f5] pdx05" style={{
    scrollbarWidth: 'thin',
    scrollbarColor:' #efebe9 #80808000'
}}><div className="c df gap1 pdy02" style={{
    userSelect: 'none'
}}>{['Microwave oven','Paint','Cement','Toys','Hand', 'bags','Clothes','Seeds','Fmcg','Bike Accesscories','Kicthen applications','Books','Fruits','Electronics','Hardware','Decorations'].map(v=><span className="text-sm font400 whitespace-nowrap">{v}</span>)}</div></div>}
                <div className="df aic gap08">
                    <span className="df aic pdx02 pdy02" ><Search /></span>
                    <span className="df aic pdx02 pdy02" ><ShoppingBag /></span>

                </div>

            </div>
            <div className=" mx-auto py-6">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-600 mb-4 px-4" aria-label="Breadcrumb">
                    <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/category/equipment" className="hover:underline">Industrial Machines</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800">{product.title}</span>
                </nav>

                {/* Grid: Media | Info */}
                <div className="df jcsb text-xs mgy03 px-4">
                    <div className="df" style={{ alignItems: 'flex-end' }}>
                        <span className="df oh pR" style={{ borderRadius: '100%', zIndex: 1, background: '#c3d5ff', border: '1px solid #5100ffff' }}>
                            <div className="pA hfp wfp" style={{ background: '#ffffffff', zIndex: 1 }}></div>

                            <span className="df aic oh min-w-[31px] h-[31px]" style={{ borderRadius: '200%', border: '1px solid #323232_' }}>

                                <Image
                                    src="/food_img/k.jpg"
                                    alt="{product.title}"
                                    fill
                                    className="object-cover wfp hfp"
                                    style={{ zIndex: 2 }}
                                    priority
                                />
                            </span>
                        </span>
                        <u className=" xfg oh pdr05 pdl08 pR z-0 left-[-8px] top-[-3px]" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px', paddingBlock: '0.2rem' }}>Vist store</u>
                    </div>
                    <div className="df aic gap02 font-xs">{[1, 2, 3, 4, 5].map(i => <Star fill="gold" size="1rem" color="gold" />)} (432)</div>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-6 px-4`}>
                    {/* Media */}
                    <div className="oh">
                        <div className="bg-white rounded-lg border overflow-hidden">
                            <div className="relative w-full h-[320px] bg-gray-50">
                                <Image
                                    src={product.thumbnails[mainIndex]}
                                    alt={product.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-2 p-3 overflow-x-auto">
                                {product.thumbnails.map((t, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setMainIndex(i)}
                                        className={`inline-block rounded-md overflow-hidden border ${i === mainIndex ? "border-blue-500" : "border-transparent"}`}
                                        aria-label={`Show image ${i + 1}`}
                                    >
                                        <div className="relative w-24 h-16">
                                            <Image src={t} fill className="object-cover" alt={`thumb-${i}`} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* mini trust block */}
                        {device === 'pc' && <div className="mt-4 p-4 bg-white rounded-lg border text-sm space-y-2 hfc">
                            <div className="flex items-center gap-2">
                                <span className="font-medium font600">{product.seller.name}</span>
                                {product.seller.verified && <>•<span className="ml-1 px-1 py-0.5 rounded bg-emerald-600 text-white text-xs df aic gap01 font600"><Verified size="0.9rem" /> Verified</span></>}
                            </div>
                            <div className="text-xs font500 text-gray-600">Location: {product.seller.city}</div>
                            <div className="text-xs font500 text-gray-600">Response time: {product.seller.responseTime}</div>
                            <div className="mt-2 flex gap-2">
                                <button onClick={enquireSeller} className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Enquire Now</button>
                                <a href={`tel:${product.seller.phone}`} className="px-3 py-2 border rounded-md text-sm df aic gap03"><PhoneCall size="0.9rem" />Call</a>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">View seller catalog or contact for bulk pricing.</div>
                            <Link href={`/seller/${product.seller.id}`} className="mt-2 inline-block text-blue-600 hover:underline text-sm">View seller profile</Link>
                        </div>}
                        {device === 'pc' &&
                            <div className="bg-white rounded-lg border overflow-hidden pd1 mg1 ">
                                <div className="relative w-full h-[320px] bg-gray-50">
                                    <Image
                                        src={product.thumbnails[mainIndex]}
                                        alt={product.title}
                                        fill
                                        className="object-contain h-[10rem] w-[25rem]"
                                        priority
                                    />
                                </div>

                                {/* Thumbnails */}
                                <div className="flex gap-2 p-3 overflow-x-auto">
                                    {product.thumbnails.map((t, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setMainIndex(i)}
                                            className={`inline-block rounded-md overflow-hidden border ${i === mainIndex ? "border-blue-500" : "border-transparent"}`}
                                            aria-label={`Show image ${i + 1}`}
                                        >
                                            <div className="relative w-[3rem] h-[4rem]">
                                                <Image src={t} fill className="object-cover" alt={`thumb-${i}`} />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="text-gray-500 text-xs" style={{ textAlign: 'end' }}>Sponsered</div>
                            </div>
                        }

                    </div>


                    {/* Info */}
                    <div className="oh">
                        <h1 className="text-2xl font-semibold">{product.title}</h1>

                        <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" /> <span className="font-medium">{product.rating}</span>
                                <span className="text-xs text-gray-500">({product.ratingCount})</span>
                            </div>
                            <div className="px-2 py-0.5 bg-gray-100 rounded text-xs">{product.sku}</div>
                            <div className="px-2 py-0.5 bg-gray-100 rounded text-xs">In stock</div>
                        </div>

                        <div className="mt-4 flex flex-col gap-4 md:items-start sm:items-center justify-between">
                            <div>
                                <Price price={product.price} mrp={product.mrp} currency={product.currency} />
                                {product.offers?.length > 0 && (
                                    <div className="mt-2 flex gap-2">
                                        {product.offers.map((o, i) => (
                                            <span key={i} className="text-xs bg-yellow-100 px-2 py-1 rounded">{o}</span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Quantity + CTA area */}
                            <div className="w-full sm:w-auto flex gap-3 items-center jcsb">
                                <div className="df gap08 aic">
                                    <span>Quantity:</span>

                                    <div className="flex items-center border rounded-md overflow-hidden">
                                        <button
                                            className="px-3 py-1 hover:bg-gray-100"
                                            aria-label="Decrease quantity"
                                        >
                                            -
                                        </button>

                                        <div className="px-4 py-1">1</div>

                                        <button
                                            className="px-3 py-1 hover:bg-gray-100"
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="pdx03 wfp df gap1">
                                <button
                                    className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-md font-medium wfp bdrds"
                                    style={{ border: "2px solid orange" }}
                                >
                                    Add to Wishlist
                                </button>

                                <button
                                    className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-md font-medium wfp bdrds"
                                    style={{
                                        background: "none",
                                        border: "2px solid orange",
                                    }}
                                >
                                    Send Enquire
                                </button>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold mb-2">Key Highlights</h3>
                                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                                    {product.highlights.map((h, i) => <li key={i}>{h}</li>)}
                                </ul>
                            </div>

                            {/* mini trust block */}
                            {device === 'mobile' && <div className="mt-4 p-4 bg-white rounded-lg border text-sm space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium font600">{product.seller.name}</span>
                                    {product.seller.verified && <>•<span className="ml-1 px-1 py-0.5 rounded bg-emerald-600 text-white text-xs df aic gap01 font600"><Verified size="0.9rem" /> Verified</span></>}
                                </div>
                                <div className="text-xs font500 text-gray-600">Location: {product.seller.city}</div>
                                <div className="text-xs font500 text-gray-600">Response time: {product.seller.responseTime}</div>
                                <div className="mt-2 flex gap-2">
                                    <button onClick={enquireSeller} className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Enquire Now</button>
                                    <a href={`tel:${product.seller.phone}`} className="px-3 py-2 border rounded-md text-sm df aic gap03"><PhoneCall size="0.9rem" />Call</a>
                                </div>
                                <div className="mt-2 text-xs text-gray-500">View seller catalog or contact for bulk pricing.</div>
                                <Link href={`/seller/${product.seller.id}`} className="mt-2 inline-block text-blue-600 hover:underline text-sm">View seller profile</Link>
                            </div>}
                        </div>

                        {/* Tabs */}
                        <div className="mt-6">
                            <div className="border-b">
                                <nav className="flex gap-4 overflow-x-auto">
                                    <a href="#desc" className="py-3 text-sm font-medium" style={{ borderBottom: '3px solid' }}>Description</a>
                                    <a href="#specs" className="py-3 text-sm font-medium">Specifications</a>
                                    <a href="#reviews" className="py-3 text-sm font-medium">Reviews</a>
                                    <a href="#qa" className="py-3 text-sm font-medium">Q & A</a>
                                </nav>
                            </div>

                            <div id="desc" className="py-6 prose max-w-none">
                                <p>{product.description}</p>
                            </div>

                            <div id="specs" className="py-6">
                                <h4 className="font-semibold text-lg mb-2">Technical Specifications</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {Object.entries(product.specs).map(([k, v]) => (
                                        <div key={k} className="flex justify-between border-b py-2">
                                            <div className="text-gray-600">{k}</div>
                                            <div className="font-medium">{v}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div id="qa" className="py-6">
                                <h4 className="font-semibold text-lg">Q & A</h4>
                                <div className="text-sm text-gray-600">Buyers ask & sellers answer — integrate chat / email.</div>
                                <div className="space-y-4">
                                    {product.questions.map((qa, i) => (
                                        <div key={i} className="border rounded-xl p-4 bg-gray-50">
                                            <p className="font-semibold">Q: {qa.q}</p>
                                            <p className="text-gray-700 mt-1">A: {qa.a}</p>
                                        </div>
                                    ))}
                                </div>
                                <div class=" mgt1 bd bdrds pdy02 tac"> <span class="font600 font-sm text-[#1565C0]">See all questions</span></div>
                            </div>

{device==='pc'&&<section className="mb-10">
                    <div id="reviews" className="py-6">
                        <h4 className="font-semibold text-lg ml-2 mb-3">Customer Reviews</h4>
                        {/* Rating Overview Section */}
                        <div className="flex flex md:flex-row items-center gap1 pd08" style={{ background: 'radial-gradient(#00ffcf33, transparent)', boxShadow: 'inset 0 10px 23px 1px #E3F2FD;' }}>

                            {/* Left: Circular Rating Display */}
                            <div className="df fd-c gap05 jcc aic pd06 bdrds xbg" style={{ boxShadow: '0 0 10px 1px #ddddddff' }}>
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    {/* Circle background */}
                                    <svg className="absolute w-full h-full transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            stroke="#e5e7eb"
                                            strokeWidth="10"
                                            fill="none"
                                        />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            stroke="#16a34a"
                                            strokeWidth="10"
                                            strokeLinecap="round"
                                            fill="none"
                                            strokeDasharray="364"
                                            strokeDashoffset={364 - (4 / 5) * 364}
                                            className="transition-all duration-700"
                                        />
                                    </svg>
                                    <div className="absolute text-center">
                                        <p className="text-3xl font-semibold text-gray-900">{4}</p>
                                        <p className="text-sm text-gray-600">out of 5</p>
                                    </div>
                                </div>
                                <span className="font08 font500">8656</span>
                            </div>

                            {/* Right: Rating Distribution Bars */}
                            <div className="flex-1 w-full">
                                {Array.from({ length: 5 }, (_, i) => {
                                    const star = 5 - i;
                                    const count = product.reviews.filter(r => r.rating === star).length;
                                    const percentage = (count / product.reviews.length) * 100;

                                    return (
                                        <div key={star} className="flex items-center gap-1 mb-2">
                                            <span className="w-5_ text-sm font-medium text-gray-700" style={{ whiteSpace: 'nowrap' }}>
                                                {star} ★
                                            </span>
                                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 rounded-full"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-600 w-10 text-right">
                                                {count}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="bdt oh">
                            <div className="pdx05 pdt08 pdb03 text-medium font600 df aic jcsb ">Reviews Image <ArrowRight size="20px" /></div>
                            <div className="df gap1 ox mgb1 mgt05 sbn mgx05">

                                {product.reviews.map((d, i) =>
                                    d.img.map(img =>

                                        <div className="df aic pR z-0 bd oh min-w-[120px] h-[130px] rounded-[5px] oh">
                                            <div className="pA wfp hfp" style={{ zIndex: 1, background: 'black' }}></div>
                                            <Image
                                                src={img}
                                                fill
                                                style={{ zIndex: 2 }}
                                                className="object-cover"
                                                priority

                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* --- Reviews Section --- */}
                        <div className="bdt mgt05">
                            {product.reviews.map((r, i) => (
                                <div key={i} className=" oh bg-white bdb pdt03 pdx02 mgt02">
                                    {/* User image */}
                                    <div className="flex items-center gap02">
                                        <img
                                            src={'/default_user.png'}
                                            alt={r.user}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-sm">{r.user}</p>
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, idx) => (
                                                    <Star
                                                        key={idx}
                                                        size={14}
                                                        fill={idx < r.rating ? "#fbbf24" : "none"}
                                                        stroke="#fbbf24"
                                                    />
                                                ))}
                                                <span className="text-xs mgl02 font500" style={{ color: 'black' }}>• 9 days ago.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wfp df xbg aic ox gap1 sbn pdy08 pdx05">
                                        {r.img.map((img, i) => <div className="df aic pR z-0 bd oh min-w-[90px] h-[90px] bdArds">
                                            <div className="pA wfp hfp" style={{ zIndex: 1, background: 'black' }}></div>
                                            <Image
                                                src={img}
                                                fill
                                                style={{ zIndex: 2 }}
                                                className="object-cover"
                                                priority

                                            />
                                        </div>)}
                                    </div>
                                    <div className="pd05">

                                        <p className="text-gray-800">{r.comment}</p>
                                        <div className="df aic gap1 mgt1 mgb08 text-xs"><span className="pdx05 pdy02 bd bdrds oh df aic gap03 font500 xbg">Helpful <ThumbsUp size="12px" /></span></div>
                                    </div>
                                </div>
                            ))}
                            <div className="tac mgt1"> <span className="pdx1 pdy05 font600 font-sm  bdArds" style={{ color: 'white', background: 'royalblue' }}>See all reviews</span></div>
                        </div>
                    </div>
                </section>}


                        </div>
                    </div>

                        
                </div>
               { device==='mobile'&&<section className="mb-10">
                    <div id="reviews" className="py-6">
                        <h4 className="font-semibold text-lg ml-2 mb-3">Customer Reviews</h4>
                        {/* Rating Overview Section */}
                        <div className="flex flex md:flex-row items-center gap1 pd08" style={{ background: 'radial-gradient(#00ffcf33, transparent)', boxShadow: 'inset 0 10px 23px 1px #E3F2FD;' }}>

                            {/* Left: Circular Rating Display */}
                            <div className="df fd-c gap05 jcc aic pd06 bdrds xbg" style={{ boxShadow: '0 0 10px 1px #ddddddff' }}>
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    {/* Circle background */}
                                    <svg className="absolute w-full h-full transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            stroke="#e5e7eb"
                                            strokeWidth="10"
                                            fill="none"
                                        />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            stroke="#16a34a"
                                            strokeWidth="10"
                                            strokeLinecap="round"
                                            fill="none"
                                            strokeDasharray="364"
                                            strokeDashoffset={364 - (4 / 5) * 364}
                                            className="transition-all duration-700"
                                        />
                                    </svg>
                                    <div className="absolute text-center">
                                        <p className="text-3xl font-semibold text-gray-900">{4}</p>
                                        <p className="text-sm text-gray-600">out of 5</p>
                                    </div>
                                </div>
                                <span className="font08 font500">8656</span>
                            </div>

                            {/* Right: Rating Distribution Bars */}
                            <div className="flex-1 w-full">
                                {Array.from({ length: 5 }, (_, i) => {
                                    const star = 5 - i;
                                    const count = product.reviews.filter(r => r.rating === star).length;
                                    const percentage = (count / product.reviews.length) * 100;

                                    return (
                                        <div key={star} className="flex items-center gap-1 mb-2">
                                            <span className="w-5_ text-sm font-medium text-gray-700" style={{ whiteSpace: 'nowrap' }}>
                                                {star} ★
                                            </span>
                                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 rounded-full"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-600 w-10 text-right">
                                                {count}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="bdt oh">
                            <div className="pdx05 pdt08 pdb03 text-medium font600 df aic jcsb ">Reviews Image <ArrowRight size="20px" /></div>
                            <div className="df gap1 ox mgb1 mgt05 sbn mgx05">

                                {product.reviews.map((d, i) =>
                                    d.img.map(img =>

                                        <div className="df aic pR z-0 bd oh min-w-[120px] h-[130px] rounded-[5px] oh">
                                            <div className="pA wfp hfp" style={{ zIndex: 1, background: 'black' }}></div>
                                            <Image
                                                src={img}
                                                fill
                                                style={{ zIndex: 2 }}
                                                className="object-cover"
                                                priority

                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* --- Reviews Section --- */}
                        <div className="bdt mgt05">
                            {product.reviews.map((r, i) => (
                                <div key={i} className=" oh bg-white bdb pdt03 pdx02 mgt02">
                                    {/* User image */}
                                    <div className="flex items-center gap02">
                                        <img
                                            src={'/default_user.png'}
                                            alt={r.user}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-sm">{r.user}</p>
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, idx) => (
                                                    <Star
                                                        key={idx}
                                                        size={14}
                                                        fill={idx < r.rating ? "#fbbf24" : "none"}
                                                        stroke="#fbbf24"
                                                    />
                                                ))}
                                                <span className="text-xs mgl02 font500" style={{ color: 'black' }}>• 9 days ago.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wfp df xbg aic ox gap1 sbn pdy08 pdx05">
                                        {r.img.map((img, i) => <div className="df aic pR z-0 bd oh min-w-[90px] h-[90px] bdArds">
                                            <div className="pA wfp hfp" style={{ zIndex: 1, background: 'black' }}></div>
                                            <Image
                                                src={img}
                                                fill
                                                style={{ zIndex: 2 }}
                                                className="object-cover"
                                                priority

                                            />
                                        </div>)}
                                    </div>
                                    <div className="pd05">

                                        <p className="text-gray-800">{r.comment}</p>
                                        <div className="df aic gap1 mgt1 mgb08 text-xs"><span className="pdx05 pdy02 bd bdrds oh df aic gap03 font500 xbg">Helpful <ThumbsUp size="12px" /></span></div>
                                    </div>
                                </div>
                            ))}
                            <div className="tac mgt1"> <span className="pdx1 pdy05 font600 font-sm  bdArds" style={{ color: 'white', background: 'royalblue' }}>See all reviews</span></div>
                        </div>
                    </div>
                </section>}

                {/* Similar / You may like */}
                <section className="mt-8 px-2">
                    <h3 className="text-lg font-semibold mb-3">Similar Products</h3>
                    <div className="flex gap-4 overflow-x-auto">
                        {/* map your similar products */}
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="min-w-[200px] bg-white rounded-lg p-3 shadow-sm">
                                <div className="w-full h-36 relative"><Image src="/sample/crane-1.jpg" fill className="object-cover rounded" alt="similar" /></div>
                                <div className="mt-2 text-sm font-medium">Product {i}</div>
                                <div className="text-amber-600 font-semibold">₹{(product.price - i * 1000).toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Structured Data JSON-LD (SEO) */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": product.title,
                        "image": product.thumbnails,
                        "description": product.description,
                        "sku": product.sku,
                        "brand": { "@type": "Organization", "name": product.seller.name },
                        "offers": {
                            "@type": "Offer",
                            "url": `https://yourdomain.com/product/${product.id}`,
                            "priceCurrency": "INR",
                            "price": product.price,
                            "availability": "https://schema.org/InStock"
                        }
                    })
                }} />
            </div>
        </>
    );
}
