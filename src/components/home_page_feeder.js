'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Search, TruckElectric } from "lucide-react";
import Link from "next/link";

export function Search_suggestion({ data, title, col }) {
    const [products, setProducts] = useState([]);

    return (
        <div className=" pdt1 pdb2 pdx05" style={{ background: 'aliceblue', borderBlock:'4px solid lightgray' }}>
            <h2 className="text-xl font-semibold mb-3">{title}</h2>

            <div className={`grid gap-${col <= 2 ? 4 : 1} pdt05`} style={{ gridTemplateColumns: col === 2 ? 'repeat(auto-fit, minmax(calc(50% - 1rem) , 1fr))' : 'repeat(auto-fit,  minmax(calc(33.33% - 0.25rem), 1fr))' }}>
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
export function CategoryGrid({ data, title, col, overflow_x, bbb }) {
    return (
        <section className={`w-full pdy1 ${col?"pdx05":"bdy3 "} ${bbb.bb&&"bdb"} ${bbb.bt&&"bdt"}`} style={{borderBlock:overflow_x&& '4px solid lightgray',
    background: overflow_x&&'white'}}>
   

            {title &&
                <div className={`df aic jcsb mb-4  ${!col&&"pdx05"}`}>
                    <h2 className="text-xl font-semibold pdx02">{title}</h2>
                    <span className={`bdrds ${overflow_x?'pd05':'pdy03 pdx1'} font600 font-sm mgr03`} style={{ color: overflow_x?'black':'white', borderRadius:overflow_x&&"100%", background:overflow_x?'ghostwhite':'black', border:overflow_x&&"1px solid royalblue"}}><ArrowRight size="1.2rem"/></span>
                </div>}
            <div className={`${overflow_x?"df aic ox pd1": col === 2 ? 'grid grid-cols-[repeat(auto-fit,minmax(50%,1fr))]' : 'grid grid-cols-[repeat(auto-fit,minmax(33.33%,1fr))]'} gap-${col <= 2 ? 4 : 1}`} style={{
                gridTemplateColumns: col === 2 ? 'repeat(auto-fit, minmax(calc(50% - 1rem), 1fr))' : 'repeat(auto-fit,  minmax(calc(33.33% - 0.25rem), 1fr))'
            }}>
                {data.map((item, i) => (
                    <div
                        key={i}
                        className={`${col? col <= 2 ? "p-4" : "p-1": "" } bg-white  oh ${col <= 2 && "rounded-xl shadow-sm hover:shadow-md"} transition 
              `} style={{border:overflow_x&&'1px solid #ccccccff', minWidth:"fit-content"}}
                    >   
                        <div className="pdx04 pdt04 pR">
                            <div className={`pA ${col? col <= 2 ? "h-[170px] min-w-[150px]" : "w-full h-[100px]": "h-[160px] min-w-[150px]"}`} style={{background:'#c7c7c717'}}></div>
                        <Image
                            src={item.image}
                            alt={item.name}
                            height={col?col <= 2 ? 150 : 100:150}
                            width={100}
                            className={` ${col? col <= 2 ? "h-[170px] min-w-[150px]" : "w-full h-[100px]": "h-[160px] min-w-[150px] "} object-cover rounded-lg`}
                        />
                        <p className="mt-2 font-medium">{item.name}</p>
                        </div>
                        <div className="oh">
                        <div className="df aic gap03 ">
                            <div className={`df mt-2 text-center aic ${overflow_x?"pdx05 font600":"font500"} ${col>2?'font-sm':"font-medium"}`} style={{ overflowWrap: 'break-word',color:overflow_x&&"#129d00ff"}}>
                                <div style={{fontSize:'0.9em'}}>₹</div>
                                <span className="font-lg" style={{fontSize:'1.2em'}}>{159}</span><span style={{ alignSelf: 'flex-start', fontSize:'0.9em' }}>00</span>
                            </div>
                            <div className={`df mt-2 font-medium text-center aic  ${col>2?'font-sm':"font-medium"}`} style={{ overflowWrap: 'break-word', textDecoration: 'line-through', color:'grey' }}>
                                <div style={{fontSize:'0.7em'}}>₹</div>
                                <h1 style={{fontSize:'1rem'}}>{159 - 25}</h1><span style={{ alignSelf: 'flex-start', fontSize:'0.7em' }}>00</span>
                            </div>
                        </div>
                        {overflow_x&&<span className={`${overflow_x&&"mgt1 bdt"} pd04 font600 df gap03`} style={{background:'aliceblue', fontSize:'0.825rem'}}><TruckElectric size="1rem"/> Deliver in 2 days</span>
                    }
                    </div>
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

export function Feeder({ section, borderBlockBooleans }) {
    console.log(2256565484, borderBlockBooleans)

    switch (section.type) {
        case "offers":
            return <OffersSection data={section.items} title={section.title} col={section.gridCol} overflow_x={section.overflowX} bbb={borderBlockBooleans} />;
        case "category_grid":
            return <CategoryGrid data={section.items} title={section.title} col={section.gridCol} overflow_x={section.overflowX} bbb={borderBlockBooleans} />;
        case "search_suggestion":
            return <Search_suggestion data={section.items} title={section.title} col={section.gridCol} overflow_x={section.overflowX} bbb={borderBlockBooleans} />;

        default:
            return null;
    }

}