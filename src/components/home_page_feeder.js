'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import Link from "next/link";

export function Search_suggestion({ data, title, col }) {
    const [products, setProducts] = useState([]);

    return (
        <div className=" pdy1 pdx05" style={{ background: 'aliceblue' }}>
            <h2 className="text-xl font-semibold mb-3">{title}</h2>

            <div className={`grid gap-${col <= 2 ? 4 : 1}`} style={{ gridTemplateColumns: col === 2 ? 'repeat(auto-fit, minmax(calc(50% - 1rem) , 1fr))' : 'repeat(auto-fit,  minmax(calc(33.33% - 0.25rem), 1fr))' }}>
                {data.map((item, i) => (
                    <Link href={`/${item.api}`} key={i} className="rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-all bdArds pdy05 pdx1 flex gap-1 align-center">
                        <Search size="1.275rem" />
                        <h3 className="text-sm font-medium truncate">{item.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// components/CategoryGrid.jsx
export function CategoryGrid({ data, title, col }) {
    return (
        <section className="w-full pdx05 pdy1">
            {title &&             
            <div className="df aic jcsb mb-4 ">
                <h2 className="text-xl font-semibold pdx02">{title}</h2>
                <span className="bdrds pdy02 pdx08 font600 font-sm mgr03" style={{color:'white', background:'black'}}>See all</span>
            </div>}
            <div className={`grid ${col === 2 ? 'grid-cols-[repeat(auto-fit,minmax(50%,1fr))' : 'grid-cols-[repeat(auto-fit,minmax(33.33%,1fr))'} gap-${col <= 2 ? 4 : 1}`} style={{
                gridTemplateColumns: col === 2 ? 'repeat(auto-fit, minmax(calc(50% - 1rem), 1fr))' : 'repeat(auto-fit,  minmax(calc(33.33% - 0.25rem), 1fr))'
            }}>
                {data.map((item, i) => (
                    <div
                        key={i}
                        className={`${col <= 2 ? "p-4" : "p-1"} bg-white ${col <= 2 && "rounded-xl shadow-sm hover:shadow-md"} transition 
              `}
                    >
                        <Image
                            src={item.image}
                            alt={item.name}
                            height={col <= 2 ? 150 : 100}
                            width={100}
                            className={`w-full ${col <= 2 ? " h-[150px]" : "h-[100px]"} object-cover rounded-lg`}
                        />
                        <p className="mt-2 font-medium text-center">{item.name}{typeof col}{col ? col : "nuulll"}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

// components/OffersSection.jsx
export function OffersSection({ data, title, col }) {
    return (
        <section className="w-full bg-gradient-to-r from-yellow-100 via-pink-100 to-red-100 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold mb-3">{title}</h2>
            <div className={`grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-${col <= 2 ? 4 : 1}`}>
                {data.map((offer, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
                        <div className={`${title.bg} w-full h-${col <= 2 ? 32 : 12} pd2 rounded-md`}></div>
                        <p className="mt-2 font-medium text-center">{offer.title}{col ? col : 2222}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

// components/TrendingSection.jsx
export function TrendingSection({ items, col }) {
    return (
        <section className="w-full mt-8">
            <h2 className="text-xl font-semibold mb-4">🔥 Trending Now</h2>
            <div className="flex gap-4 overflow-x-auto">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="min-w-[200px] bg-white p-4 rounded-xl shadow-sm hover:shadow-md"
                    >
                        <img
                            src={item.image}
                            className="w-full h-40 object-cover rounded-lg"
                            alt={item.name}
                        />
                        <p className="mt-2 text-center font-medium">{item.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function Feeder({ section }) {

    switch (section.type) {
        case "offers":
            return <OffersSection data={section.items} title={section.title} col={section.gridCol} overflow_x={section.overflowX} />;
        case "category_grid":
            return <CategoryGrid data={section.items} title={section.title} col={section.gridCol} overflow_x={section.overflowX} />;
        case "search_suggestion":
            return <Search_suggestion data={section.items} title={section.title} col={section.gridCol} overflow_x={section.overflowX} />;

        default:
            return null;
    }

}