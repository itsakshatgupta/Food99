'use client'
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { ArrowRight, Search, TruckElectric } from "lucide-react";
import Link from "next/link";
import { dynamic_ } from "./main-context";

function cdt() {
    const { device } = useContext(dynamic_);

    let r;
    return device === 'pc' ? 3 : 2
}
function imgDimensionCalc() {
    const { device } = useContext(dynamic_);

    let pc_d = { width: 160, height: 170 };
    let mobile_d = { width: 140, height: 150 };

    let width_;
    let height_;

    if (device === 'pc') {
        width_ = pc_d.width;
        height_ = pc_d.height;

    } else {
        width_ = mobile_d.width;
        height_ = mobile_d.height;
    }
    return `min-w-[${width_}px] min-h-[${height_}]`;
}

export function Search_suggestion({ data, title, col }) {
    const [products, setProducts] = useState([]);
    const { device } = useContext(dynamic_);

    return (
        <div className=" pdt1 pdb2 pdx05" style={{ background: 'aliceblue', borderBlock: '4px solid lightgray' }}>
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
    const { device } = useContext(dynamic_);


    return (
        <section className={`w-full pdy1 ${col ? "pdx05" : "bdy3 "} ${bbb.bb && "bdb"} ${bbb.bt && "bdt"}`} style={{
            borderBlock: overflow_x && '4px solid lightgray',
            background: overflow_x && 'white'
        }}>

            {title &&
                <div className={`df aic jcsb mb-4  ${!col && "pdx05"}`}>
                    <h2 className="text-xl font-semibold pdx02">{title}</h2>
                    <span className={`bdrds ${overflow_x ? 'pd05' : 'pdy03 pdx1'} font600 font-sm mgr03`} style={{ color: overflow_x ? 'black' : 'white', borderRadius: overflow_x && "100%", background: overflow_x ? 'ghostwhite' : 'black', border: overflow_x && "1px solid royalblue" }}><ArrowRight size="1.2rem" /></span>
                </div>}
            <div className={`grid ${col>=2?'grid-cols-2':'grid-cols-3'} gap-4`}
            //  style={{
            //     gridTemplateColumns: col === 2 ? 'repeat(auto-fit, minmax(calc(50% - 1rem), 1fr))' : 'repeat(auto-fit,  minmax(calc(33.33% - 0.25rem), 1fr))'
            // }}
            >
                {data.map((item, i) => (
                    <div className={`shadow-md rounded-xl ${device === 'pc' && overflow_x && "xfg"} pd05`} key={i}>
                        <div>{item.sub_cat}</div>
                        <div className={`grid ${col>=2?'grid-cols-2':'grid-cols-3'} gap-2 p-2 ${device === 'pc' && overflow_x ? "wfp bdrds" : "wfc"} xbg`}>
                            {item.items.map((sI, i) => (
                                <div
                                    key={i}
                                    className={`${col ? col <= 2 ? "p-4" : "p-1" : ""} bg-white  oh ${device === 'pc' && overflow_x ? "hover:shadow-md" : col <= 2 && "rounded-xl shadow-sm hover:shadow-md"} transition 
              `} style={{ border: overflow_x && '1px solid #0a0606ff', minWidth: "fit-content" }}
                                >
                                    <div className="mgx04 pdt04 pR">
                                        <div className={`pA w-full h-full`} style={{ background: '#c7c7c717' }}></div>
                                        <Image
                                            src={sI.image}
                                            alt={sI.name}
                                            height={col ? col <= 2 ? 150 : 100 : 140}
                                            width={100}
                                            className={`${imgDimensionCalc()} object-contain rounded-lg`}
                                        />
                                        <p className="mt-2 font-medium md:text-sm">{sI.name}</p>
                                    </div>
                                    <div className="oh">
                                        <div className={`df aic gap03 ${overflow_x && "pdx05"}`}>
                                            <div className={`df mt-2 text-center aic ${overflow_x ? "font600" : "font500"} ${col ? col > 2 ? 'font-sm' : "font-medium" : "md:text-sm"}`} style={{ overflowWrap: 'break-word', color: overflow_x && "#129d00ff" }}>
                                                <div style={{ fontSize: '0.675em' }}>₹</div>
                                                <span className="font-lg" style={{ fontSize: '1.2em' }}>{159}</span><span style={{ alignSelf: 'flex-start', fontSize: '0.675em' }}>00</span>
                                            </div>
                                            <div className={`df mt-2 text-center aic  ${col ? col > 2 ? 'font-sm' : "font-medium" : "md:text-sm"}`} style={{ overflowWrap: 'break-word', textDecoration: 'line-through', color: 'grey' }}>
                                                <div style={{ fontSize: '0.475em' }}>₹</div>
                                                <h1 style={{ fontSize: '1em' }}>{159 - 25}</h1><span style={{ alignSelf: 'flex-start', fontSize: '0.475em' }}>00</span>
                                            </div>
                                        </div>
                                        {overflow_x && <span className={`${overflow_x && "mgt1 bdt"} pd04 font600 md:text-500 df gap03 sm:text-sm md:text-xs`} style={{ background: 'aliceblue' }}><TruckElectric size="1rem" /> Deliver in 2 days</span>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// components/ProductGrid.jsx
export function ProductGrid({ data, title, col, overflow_x, bbb }) {
    const { device } = useContext(dynamic_);
    return (
        <section className={`w-full pdy1 ${col ? "pdx05" : "bdy3 "} ${bbb.bb && "bdb"} ${bbb.bt && "bdt"}`} style={{
            borderBlock: overflow_x && '4px solid lightgray',
            background: overflow_x && 'white'
        }}>

            {title &&
                <div className={`df aic jcsb mb-4  ${!col && "pdx05"}`}>
                    <h2 className="text-xl font-semibold pdx02">{title}</h2>
                    <span className={`bdrds ${overflow_x ? 'pd05' : 'pdy03 pdx1'} font600 font-sm mgr03`} style={{ color: overflow_x ? 'black' : 'white', borderRadius: overflow_x && "100%", background: overflow_x ? 'ghostwhite' : 'black', border: overflow_x && "1px solid royalblue" }}><ArrowRight size="1.2rem" /></span>
                </div>}
            <div className={`
            ${overflow_x ? "df aic ox pd1" : col === 2 ? 'grid grid-cols-[repeat(auto-fill,minmax(21rem,1fr))]' : 'grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'} gap-${!device === 'pc' && overflow_x ? col <= 2 ? 4 : 1 : 2}
            `}
            //  style={{
            //     gridTemplateColumns: col === 2 ? 'repeat(auto-fit, minmax(calc(50% - 1rem), 1fr))' : 'repeat(auto-fit,  minmax(calc(33.33% - 0.25rem), 1fr))'
            // }}
            >
                {data.map((item, i_) => (
                    <div className={`pd05 `} key={i_}>



                        <div

                            className={`"p-4 bg-white  oh ${device === 'pc' && overflow_x ? "hover:shadow-md" : "rounded-xl shadow-sm hover:shadow-md"} transition 
              `}
                        >
                            <div className="mgx04 pdt04 pR">
                                <div className={`pA h-full w-full`} style={{ background: '#c7c7c717' }}></div>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    height={col ? col <= 2 ? 150 : 100 : 140}
                                    width={100}
                                    className={` ${!device === 'pc' && overflow_x ? col ? col <= 2 ? "h-[170px] min-w-[150px]" : "w-full h-[100px]" : "h-[160px] min-w-[170px] " : " min-w-[150px] min-h-[170px]"} object-contain rounded-lg`}
                                />
                                <p className="mt-2 font-medium md:text-sm">{item.name}</p>
                            </div>
                            <div className="oh">
                                <div className={`df aic gap03 ${overflow_x && "pdx05"}`}>
                                    <div className={`df mt-2 text-center aic ${overflow_x ? "font600" : "font500"} ${col ? col > 2 ? 'font-sm' : "font-medium" : "md:text-sm"}`} style={{ overflowWrap: 'break-word', color: overflow_x && "#129d00ff" }}>
                                        <div style={{ fontSize: '0.675em' }}>₹</div>
                                        <span className="font-lg" style={{ fontSize: '1.2em' }}>{159}</span><span style={{ alignSelf: 'flex-start', fontSize: '0.675em' }}>00</span>
                                    </div>
                                    <div className={`df mt-2 text-center aic  ${col ? col > 2 ? 'font-sm' : "font-medium" : "md:text-sm"}`} style={{ overflowWrap: 'break-word', textDecoration: 'line-through', color: 'grey' }}>
                                        <div style={{ fontSize: '0.475em' }}>₹</div>
                                        <h1 style={{ fontSize: '1em' }}>{159 - 25}</h1><span style={{ alignSelf: 'flex-start', fontSize: '0.475em' }}>00</span>
                                    </div>
                                </div>
                                {overflow_x && <span className={`${overflow_x && "mgt1 bdt"} pd04 font600 md:text-500 df gap03 sm:text-sm md:text-xs`} style={{ background: 'aliceblue' }}><TruckElectric size="1rem" /> Deliver in 2 days</span>
                                }
                            </div>
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
        <section className="w-full bg-gradient-to-r from-yellow-100 via-pink-100 to-red-100 pdx1 pdb2 xfg" style={{ paddingTop: '1.5rem' }}>

                <div className={`${col ? col <= 2 ? "h-[150px] min-w-[140px]" : "w-full h-[100px]" : "h-[160px] min-w-[150px]"} rounded-lg`} style={{ background: '#3b49e3ff', zIndex: 1, border: '2px solid #17338fff' }}></div>
      
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
    let c = cdt();

    switch (section.type) {
        case "offers":
            return <OffersSection data={section.items} title={section.title} col={c} overflow_x={section.overflowX} bbb={borderBlockBooleans} />;
        case "category_grid":
            return <CategoryGrid data={section.items} title={section.title} col={c} overflow_x={section.overflowX} bbb={borderBlockBooleans} />;
        case "product_grid":
            return <ProductGrid data={section.items} title={section.title} col={c} overflow_x={section.overflowX} bbb={borderBlockBooleans} />;
        case "search_suggestion":
            return <Search_suggestion data={section.items} title={section.title} col={c} overflow_x={section.overflowX} bbb={borderBlockBooleans} />;

        default:
            return null;
    }

}