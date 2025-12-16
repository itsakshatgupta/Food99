'use client'
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { ArrowRight, Search, TruckElectric } from "lucide-react";
import Link from "next/link";
import { dynamic_ } from "./main-context";
import { useRouter } from "next/navigation";

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
        <div className=" pdt1 pdb2 pdx05 border-y-2 border-blue-200" style={{ background: 'aliceblue', borderBlock: '4px_ solid lightgray_' }}>
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
export function CategoryGrid({ data, title, col, overflow_x, bbb, c__ }) {
    const { device } = useContext(dynamic_);
    // console.log('c__:', c__, c__.c_palette_name);
    const router = useRouter();

    return (
        <section className={`w-full border-y-4 border-white pdy1 ${col ? "pdx05" : "bdy3 "} ${bbb.bb && "bdb"} ${bbb.bt && "bdt"}`} style={{
            borderBlock: overflow_x && '4px solid lightgray',
            background: c__.c_palette.sec_bg_ || "#f7f7f7ff"
        }}>

            {title &&
                <div className={`df aic jcsb mb-4  ${!col && "pdx05"}`}>
                    <h2 className="text-xl font-semibold pdx02">{title}</h2>
                    <span className={`bdrds ${overflow_x ? 'pd05' : 'pdy03 pdx1'} font600 font-sm mgr03`} style={{ color: overflow_x ? 'black' : 'white', borderRadius: overflow_x && "100%", background: overflow_x ? 'ghostwhite' : 'black', border: overflow_x && "1px solid royalblue" }}><ArrowRight size="1.2rem" /></span>
                </div>}
            <div className={`grid ${col <= 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-2`}
            //  style={{
            //     gridTemplateColumns: col === 2 ? 'repeat(auto-fit, minmax(calc(50% - 1rem), 1fr))' : 'repeat(auto-fit,  minmax(calc(33.33% - 0.25rem), 1fr))'
            // }}
            ><>
                    {data.map((item, i) => (
                        <div className={`${i} bg-white shadow-sm_ rounded-md border pd05 df fd-c`} style={{
                            background: c__.c_palette.sec_card_bg
                        }} key={i}>

                            <div className="text-[md] font-semibold">{item.sub_cat}</div>
                            <div className={`border_ rounded-sm ${device === 'pc' && item.items.length === 3 ? 'grid grid-cols-3 grid-rows-1' : 'grid grid-cols-3 '} gap-1 p-1 oh fx1 xbg_`}>
                                {item.items.map((sI, i) => (
                                    <div
                                        key={i}
                                        className={`${col ? col <= 2 ? "p-4" : "p-1_" : ""} bg-white  oh  min-w-[110px] cursor-pointer group  hover:border-gray-200/80 border border-white transition px-1 rounded-md ${device === 'pc' && overflow_x ? "hover:shadow-md" : col <= 2 && "rounded-xl shadow-sm hover:shadow-md"} transition 
              `} style={{ border: overflow_x && '1px solid #0a0606ff'}}
                                    onClick={()=>router.push("product_view")}>
                                        <div className="mgx04 pdt04 pR">
                                            <div className={`pA w-full h-full   group-hover:bg-gray-400/5 bg-[#dee2ff17]`}></div>
                                            <Image
                                                src={sI.image}
                                                alt={sI.name}
                                                height={col ? col <= 2 ? 150 : 100 : 140}
                                                width={100}
                                                className={`min-w-[60px] h-[100px] object-contain rounded-lg`}
                                            />
                                        </div>
                                        <div>
                                            <p className="mt-2 font-medium md:text-sm">{sI.name}</p>
                                            <p className="font-medium_ md:text-sm  whitespace-nowrap oh text-gray-900" style={{ textOverflow: "ellipsis" }}>Italian flavored with huang sauce and much more</p>
                                        </div>
                                        <div className="oh">
                                            <div className={`df aic gap03 ${overflow_x && "pdx05"}`}>
                                                <div className={`df mt-1 text-center aic ${overflow_x ? "font600" : "font500"} ${col ? col > 2 ? 'font-sm' : "font-medium" : "md:text-sm"}`} style={{ overflowWrap: 'break-word', color: overflow_x && "#129d00ff" }}>
                                                    <div style={{ fontSize: '0.675em' }}>₹</div>
                                                    <span className="font-lg" style={{ fontSize: '1.2em' }}>{159}</span><span style={{ alignSelf: 'flex-start', fontSize: '0.675em' }}>00</span>
                                                </div>
                                                <div className={`df mt-2 text-center aic  ${col ? col > 2 ? 'font-sm' : "font-medium" : "md:text-sm"}`} style={{ overflowWrap: 'break-word', textDecoration: 'line-through', color: 'grey' }}>
                                                    <div style={{ fontSize: '0.675em' }}>₹</div>
                                                    <h1 style={{ fontSize: '1.1em' }}>{159 - 25}</h1><span style={{ alignSelf: 'flex-start', fontSize: '0.675em' }}>00</span>
                                                </div>
                                            </div>
                                            {overflow_x && <span className={`${overflow_x && "mgt1 bdt"} pd04 font600 md:text-500 df gap03 sm:text-sm md:text-xs`} style={{ background: 'aliceblue' }}><TruckElectric size="1rem" /> Deliver in 2 days</span>
                                            }
                                        </div>
                                    </div>
                                ))}
                                {item.items.length <= 5 && data.some(v => v.items.length > 3) ? ![4, 7, 10, 13].some(v => v === i + 1) || item.items.length > 3 ? <div className={`bd  ${device === 'pc' && item.items.length === 3 ? ' col-span-3 row-start-1  df' : item.items.length === 4 ? 'col-span-2 df' : 'w-auto df'} bg-[orangered]  h-[auto] fx1 mgy1 mgx05 text-xl font800 text-white  jcc aic`}>Ads</div> : '' : ''}
                            </div>
                        </div>
                    ))}
                    {[4, 7, 10, 13].some(v => v === data.length) && <div className="col-span-2 bg-[#4a4a4a] text-white p-1 h-auto "><div className="hfp wfp" style={{ background: 'repeating-linear-gradient(45deg, black, transparent 100px)' }}>juijiuj</div></div>}
                </>
            </div>
        </section>
    );
}

// components/ProductGrid.jsx
export function ProductGrid({ data, title, col, overflow_x, bbb }) {
    const { device } = useContext(dynamic_);
    return (
        <section className={`w-full pdy1 border-y ${overflow_x && "bg-white"} ${col ? "pdx05" : "bdy3 "} ${bbb.bb && "bdb"} ${bbb.bt && "bdt"}`} style={{
            borderBlock: overflow_x && '4px solid lightgray_',
        }}>

            {title &&
                <div className={`df aic jcsb  ${!col && "pdx05"}`}>
                    <h2 className="text-xl font-semibold pdx02">{title}</h2>
                    <span className={`bdrds ${overflow_x ? 'pd05' : 'pdy03 pdx1'} font600 font-sm mgr03`} style={{ color: overflow_x ? 'black' : 'white', borderRadius: overflow_x && "100%", background: overflow_x ? 'ghostwhite' : 'black', border: overflow_x && "1px solid royalblue" }}><ArrowRight size="1.2rem" /></span>
                </div>}
            <div className={`
            ${overflow_x ? "df aic ox pd1" : col === 2 ? 'grid grid-cols-[repeat(auto-fill,minmax(21rem,1fr))]' : 'grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'} gap-${!device === 'pc' && overflow_x ? col <= 2 ? 4 : 1 : 3}
            `}
            //  style={{
            //     gridTemplateColumns: col === 2 ? 'repeat(auto-fit, minmax(calc(50% - 1rem), 1fr))' : 'repeat(auto-fit,  minmax(calc(33.33% - 0.25rem), 1fr))'
            // }}
            >
                {data.map((item, i_) => (
                    <div className={`border border-gray-300_ cursor-pointer rounded-sm oh shadow-sm_ hover:shadow-sm min-w-[fit-content]`} key={i_}>



                        <div

                            className={`"bg-white transition 
              `}
                        >
                            <div className="mgx04_ pdt04_ pR">
                                <div className={`pA h-full w-full`} style={{ background: '#c7c7c717' }}></div>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    height={col ? col <= 2 ? 150 : 100 : 140}
                                    width={100}
                                    className={` ${!device === 'pc' && overflow_x ? col ? col <= 2 ? "h-[170px] min-w-[150px]" : "w-full h-[100px]" : "h-[160px] min-w-[170px] " : " min-w-[150px] min-h-[170px]"} object-contain rounded-lg`}
                                />
                            </div>
                            <div className="oh">
                                <div className={`${overflow_x && "pdx05"}`}>
                                    <p className="mt-2 font-medium md:text-sm">{item.name}</p>
                                    <div className={`df aic gap03`}>
                                        <div className={`df mt-2 text-center aic ${overflow_x ? "font600" : "font500"} ${col ? col > 2 ? 'font-sm' : "font-medium" : "md:text-sm"}`} style={{ overflowWrap: 'break-word', color: overflow_x && "#129d00ff" }}>
                                            <div style={{ fontSize: '0.675em' }}>₹</div>
                                            <span className="font-lg" style={{ fontSize: '1.2em' }}>{159}</span><span style={{ alignSelf: 'flex-start', fontSize: '0.675em' }}>00</span>
                                        </div>
                                        <div className={`df mt-2 text-center aic  ${col ? col > 2 ? 'font-sm' : "font-medium" : "md:text-sm"}`} style={{ overflowWrap: 'break-word', textDecoration: 'line-through', color: 'grey' }}>
                                            <div style={{ fontSize: '0.475em' }}>₹</div>
                                            <h1 style={{ fontSize: '1em' }}>{159 - 25}</h1><span style={{ alignSelf: 'flex-start', fontSize: '0.475em' }}>00</span>
                                        </div>
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
        <section className="w-full bg-gradient-to-r from-yellow-100 via-pink-100 to-red-100 pdx2 pdb2 xbg" style={{ paddingTop: '1.5rem' }}>

            <div
                // w-full h-[100px] rounded-lg overflow-hidden flex items-center
                className="w-full h-[100px] rounded-lg overflow-hidden flex items-center"
                style={{
                    background: 'linear-gradient(to right, royalblue, blue)',
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        width: '170px',
                        height: '225px',
                        backgroundSize: 'contain',
                        position: 'relative',
                        top: '48px',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            background: '#3f51b51f',
                            zIndex: 3,
                            height: '100%',
                            width: '100%',
                        }}
                    ></div>
                    {/* Using the Next.js Image component */}
                    <Image
                        alt="platform_advertising"
                        loading="lazy"
                        // width and height are required for the Image component
                        width={150}
                        height={160}
                        src="/static-img/businessman-shows-his-finger-up.jpg"
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundSize: 'contain',
                            position: 'relative',
                            zIndex: 2,
                        }}
                    />
                </div>
                <div
                    style={{
                        fontSize: 'larger',
                        margin: '8px',
                        fontWeight: 500,
                        color: 'white',
                    }}
                >
                    Starting from <b>10-12</b>
                </div>
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
    // console.log(2256565484, borderBlockBooleans)
    let c = cdt();
    let color__ = [
        { c_palette_name: 'focus vibe', c_palette: { sec_bg: '#eefee5', sec_card_bg: '#C5E1A5_' } },
        { c_palette_name: 'fresh vibe', c_palette: { sec_bg: '#f2f9ff', sec_card_bg: '#c9f9ffff_' } },
        { c_palette_name: 'discover vibe', c_palette: { sec_bg: '#fffcebff ', sec_card_bg: '#FFE082_' } },
        { c_palette_name: 'woman fav', c_palette: { sec_bg: '#FFEBEE', sec_card_bg: '#F48FB1_' } },
        { c_palette_name: 'default', c_palette: { sec_bg: '#ffffffff', sec_card_bg: '#fffae9ff_ ' } },
    ]
    const key = Object.hasOwn(section, 'color_theme_name')
        ? section.color_theme_name
        : 'default';
    const get_theme = color__.find(v => v.c_palette_name === key);
    switch (section.type) {
        case "offers":
            return <OffersSection data={section.items} title={section.title} col={c} overflow_x={section.overflowX} bbb={borderBlockBooleans} c__={get_theme} />;
        case "category_grid":
            return <CategoryGrid data={section.items} title={section.title} col={c} overflow_x={section.overflowX} bbb={borderBlockBooleans} c__={get_theme} />;
        case "product_grid":
            return <ProductGrid data={section.items} title={section.title} col={c} overflow_x={section.overflowX} bbb={borderBlockBooleans} c__={get_theme} />;
        case "search_suggestion":
            return <Search_suggestion data={section.items} title={section.title} col={c} overflow_x={section.overflowX} bbb={borderBlockBooleans} c__={color__} />;

        default:
            return null;
    }

}