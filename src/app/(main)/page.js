'use client'
import ContainerAContents from '@/components/container-A-contents';
import { dynamic_, floaters_, menu_ } from '@/components/main-context';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useRef } from "react"
import Portal_ from "@/components/main_portal/main_protral";
import Link from 'next/link';
import { Icon } from '@/components/lib/icons';
import Image from 'next/image';
import { Cart_Control_Direct, Cart_Control_Indirect } from '@/components/lib/cart_control';
import Topbar_ from '@/components/topbar_/topbar';
import { BookOpen, ChevronLeftCircle, ChevronRightCircle, ChevronRight, ChevronUp, CircleArrowDown, Search, Mic, ChevronDown, ArrowLeft, Filter, TrendingUp, ExternalLink, LucideHistory, Mic2, Verified, Smile, Star, Pizza, PizzaIcon, LucidePizza, ForkKnife, ThumbsUp, Stars, Clock, Clock7, Clock3, TruckElectric, Truck } from 'lucide-react';
import {
    fetchAPI
} from '../(api)/api';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import useSWR from "swr";
import { mutate } from 'swr';
import { menu, menu_dummy } from '@/components/dummy_data';
import dynamic from 'next/dynamic';
import { Feeder } from '@/components/home_page_feeder';



export default function branches() {

    const product = {
        name: "Sage Square Adjustable Strap Muzzle",
        price: 179,
        oldPrice: 349,
        image: "https://m.media-amazon.com/images/I/51hh5hEqQ2S._MCnd_AC_.jpg",
        slug: "sage-square-adjustable-muzzle",
        distributor: "Sage Square Distributors"
    }

    const { device, cart__i, set_dynamics_portal_main, usr, floaters, set_floaters, set_feature_option, set_dynamics_portal_ab, user } = useContext(dynamic_);
    const { menu___i } = useContext(menu_);

    const [sildeshow_data, set_slideshow_data] = useState([]);
    const [sildeshow_current, set_slideshow_current] = useState(0);
    const [sildeshow_next, set_slideshow_next] = useState(1);
    const [sildeshow_isAnimating, set_slideshow_isAnimating] = useState(false);
    const [sildeshow_content, set_slideshow_content] = useState(<h1>Hii</h1>);
    const [sildeshow_TI, set_slideshow_TI] = useState(null);
    const [sildeshow_dots, set_slideshow_dots] = useState(null);
    const [sildeshow_direction, set_slideshow_direction] = useState('right');

    const top_header = useRef(null);
    const filter_bar = useRef(null);
    const [search_mode, set_search_mode] = useState(false)

    const [isScrolled, setIsScrolled] = useState(false);
    const [menuLister, set_menuLister] = useState(false)
    const [top_bar_, set_top_bar_] = useState(null)
    const [food_filter, set_food_filter] = useState([])
    const [menu_filtered, set_menu_filtered] = useState(null)

    const [searchText, set_searchText] = useState("")

    const [sections, setSections] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);  


    const fetchSections = async () => {
        if (!hasMore) return;
        const res = await fetchAPI(`/home-sections`);
        // setSections(prev => [...prev, ...data.results]);
        // setHasMore(!!data.next);
        setSections(res)
        console.log('res:', res)
    };

    useEffect(() => { fetchSections()},[]);

    // Infinite scroll logic
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore) {
                setPage(p => p + 1);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore]);


    const banner_ = <>
        <div className="df jcsb wfp hfp" style={{ background: '#f1f8e9' }}>
            <div className="pdx1" style={{ justifyItems: 'center' }}>
                <h2>Sales Live</h2>
                <h1 className="pdx05" style={{
                    background: '#FFEB3B',
                    border: '1px solid #33691E'
                }}>Get 50% Off</h1>
            </div>
            <div className="fx1 pdx05 pdy05" style={{ alignContent: 'center' }}>
                <div className=" catg df aic pdy05 pdx1 gap2 fxw">
                    <div>
                        <div className="pR">
                            <div className="bd" style={{ width: '75px', height: '80px', borderRadius: '10px', justifySelf: 'center', background: 'white' }}></div>
                        </div>
                        <div style={{ justifySelf: 'center', marginTop: '3px', fontSize: '0.8rem' }}>Veggie house 'aaa'</div>
                        <div className="font07 pdx05 bdrds" style={{ justifySelf: 'center', background: 'beige', color: 'black' }}>250</div>
                    </div>
                    <div>
                        <div className="pR">
                            <div className="bd" style={{ width: '75px', height: '80px', borderRadius: '10px', justifySelf: 'center', background: 'white' }}></div>
                        </div>
                        <div style={{ justifySelf: 'center', marginTop: '3px', fontSize: '0.8rem' }}>Veggie house 'aaa'</div>
                        <div className="font07 pdx05 bdrds" style={{ justifySelf: 'center', background: 'beige', color: 'black' }}>250</div>
                    </div>
                    <div>
                        <div className="pR">
                            <div className="bd" style={{ width: '75px', height: '80px', borderRadius: '10px', justifySelf: 'center', background: 'white' }}></div>
                        </div>
                        <div style={{ justifySelf: 'center', marginTop: '3px', fontSize: '0.8rem' }}>Veggie house 'aaa'</div>
                        <div className="font07 pdx05 bdrds" style={{ justifySelf: 'center', background: 'beige', color: 'black' }}>250</div>
                    </div>
                    <div>
                        <div className="pR">
                            <div className="bd" style={{ width: '75px', height: '80px', borderRadius: '10px', justifySelf: 'center', background: 'white' }}></div>
                        </div>
                        <div style={{ justifySelf: 'center', marginTop: '3px', fontSize: '0.8rem' }}>Veggie house 'aaa'</div>
                        <div className="font07 pdx05 bdrds" style={{ justifySelf: 'center', background: 'beige', color: 'black' }}>250</div>
                    </div>
                    <div>
                        <div className="pR">
                            <div className="bd" style={{ width: '75px', height: '80px', borderRadius: '10px', justifySelf: 'center', background: 'white' }}></div>
                        </div>
                        <div style={{ justifySelf: 'center', marginTop: '3px', fontSize: '0.8rem' }}>Veggie house 'aaa'</div>
                        <div className="font07 pdx05 bdrds" style={{ justifySelf: 'center', background: 'beige', color: 'black' }}>250</div>
                    </div>
                </div>
            </div>
        </div>
    </>

    const mobile_banner = <>
        <div className="" style={{ color: 'white' }}>
            <div className="df aic gap1 pR ybg" style={{ height: '250px' }}>

                <style>{`
                          .w100{
                          min-width:100%;
                          }
                .op0{
                opacity:0;
                }
                .inward{
                display:block;

                left:calc(100% + 1rem);
                    animation:inward_ 0.6s linear;

                }
                @keyframes inward_{
                // opacity:1 ;
                    0%{
                        left:calc(100%);
                    }
                    100%{
// opacity:0;
                    left:0%;
                    }
                    }
                    
                .outward{
                                        // opacity:0;
                    animation:outward_ 0.6s linear;

                }
                @keyframes outward_{
                    0%{
                                        // opacity:1;
                    left:0%;
                        }
                    100%{
                    opacity:0;
                    left:calc(-100%);
                    }
                    }

                .inward-l{
                display:block;
                
                    animation:inward-l_ 0.6s linear;

                }
                @keyframes inward-l_{
                    0%{
                    left:calc(-100% );
                        }
                    100%{
                // display:none;

                    left:0;
               
                    }
                    }
                .outward-r{
                    // opacity:0;

                    animation:outward-r_ 0.6s linear;

                }
                @keyframes outward-r_{
                    0%{
                    // opacity:1;
                    left:0%;
                        }
                    100%{
                    opacity:0;
                    left:calc(100% );
                    }
                    }

                
                `}</style>

                <div className={`${sildeshow_isAnimating ? sildeshow_direction === 'right' ? 'outward' : 'outward-r' : ''} pA wfp pdx05 C`} style={{ zIndex: 1 }}>
                    <div className="pR oh bdrds">
                        {sildeshow_data[sildeshow_current]}
                    </div>
                </div>

                <div className={`${sildeshow_isAnimating ? sildeshow_direction === 'right' ? 'inward' : 'inward-l' : ''} pA wfp pdx05 N `}>
                    <div className="pR oh bdrds">
                        {sildeshow_data[sildeshow_next]}
                    </div>
                </div>





            </div>
            <div className="df aic jcsb mgt06" style={{ justifyContent: 'space-evenly' }}>
                <ChevronLeftCircle color='#E91E63' onClick={(e) => {
                    e.preventDefault();
                    if (sildeshow_TI) clearTimeout(sildeshow_TI);
                    set_slideshow_direction('left');
                    set_slideshow_isAnimating(true);

                    if (sildeshow_current === 0) {

                        set_slideshow_next(sildeshow_data.length - 1)
                    } else {

                        set_slideshow_next(sildeshow_current - 1);
                    }


                    setTimeout(() => {
                        if (sildeshow_current === 0) {

                            set_slideshow_current(sildeshow_data.length - 1)
                        } else {

                            set_slideshow_current(sildeshow_current - 1);
                        }

                        set_slideshow_isAnimating(false);
                    }, 600)

                }} />
                <style>{`.more- span{
                    padding: 4px;
                    background: #dadada;
                    border-radius: 100%;
                    }`}</style>
                <div className='df aic gap08 more-'>
                    {sildeshow_dots}
                </div>
                <ChevronRightCircle color='#E91E63' onClick={(e) => {
                    e.preventDefault();
                    if (sildeshow_TI) clearTimeout(sildeshow_TI);
                    set_slideshow_direction('right');

                    set_slideshow_isAnimating(true);

                    if (sildeshow_current === sildeshow_data.length - 1) {

                        set_slideshow_next(0)
                    } else {

                        set_slideshow_next(sildeshow_current + 1);
                    }


                    setTimeout(() => {
                        if (sildeshow_current === sildeshow_data.length - 1) {

                            set_slideshow_current(0)
                        } else {

                            set_slideshow_current(sildeshow_current + 1);
                        }

                        set_slideshow_isAnimating(false);
                    }, 600)



                }} />

            </div>
        </div>
        <div className='mgx05 mgy05 dfl dn fd-c'>
            <h4 className="mgx03 mgb08 mg0 font500" style={{ color: '#0e0e0e' }}>Don't Miss this Deal</h4>
            <div className="oh bdrds bd" style={{
                background: 'linear-gradient(0deg, rgb(205 233 255), #e4d4ff)'
            }}><div className="pdx08 pdb05 pdt08 df">
                    <div className="fx1">
                        <h2 className="mg0">Get 50% Off</h2>
                    </div>
                    <span className='font-sm' style={{ alignSelf: 'self-end' }}><b>See All</b></span>
                </div>
                <div className="pdx05 pdy05 oh" style={{
                    color: 'black'
                }}>
                    <div className=" catg df aic pdx1 gap2 ox sbn">

                        <style>{`.e{width: 75px; height: 80px; border-radius: 10px; justify-self: center; background: white; box-shadow:2px 2px 3px 1px #3d3d3dc9`}</style>
                        <div>
                            <div className="pR">
                                <div className="bd e oh">
                                    <Image
                                        alt="offer"
                                        src="/static-img/stack-of-garlic-butter-naan-bread-garnished-with-fresh-herbs_60423589.png"
                                        width={75}
                                        height={80}
                                    />
                                </div>
                                <div className="pA pdx04 bdrds font500" style={{ justifySelf: 'end', background: 'green', border: '1px solid black', color: 'white', fontSize: '0.65rem', bottom: '-3px' }}>$250</div>
                            </div>
                            <div style={{ justifySelf: 'cente1r', marginTop: '5px', fontSize: '0.65rem' }} className="font500">Heavy Veggie Loaded</div>

                        </div>
                        <div>
                            <div className="pR">
                                <div className="bd e oh">
                                    <Image
                                        alt="offer"
                                        src="/static-img/stack-of-garlic-butter-naan-bread-garnished-with-fresh-herbs_60423589.png"
                                        width={75}
                                        height={80}
                                    />
                                </div>
                                <div className="pA pdx04 bdrds font500" style={{ justifySelf: 'end', background: 'green', border: '1px solid black', color: 'white', fontSize: '0.65rem', bottom: '-3px' }}>$250</div>
                            </div>
                            <div style={{ justifySelf: 'cente1r', marginTop: '5px', fontSize: '0.65rem' }} className="font500">Heavy Veggie Loaded</div>

                        </div>
                        <div>
                            <div className="pR">
                                <div className="bd e oh">
                                    <Image
                                        alt="offer"
                                        src="/static-img/stack-of-garlic-butter-naan-bread-garnished-with-fresh-herbs_60423589.png"
                                        width={75}
                                        height={80}
                                    />
                                </div>
                                <div className="pA pdx04 bdrds font500" style={{ justifySelf: 'end', background: 'green', border: '1px solid black', color: 'white', fontSize: '0.65rem', bottom: '-3px' }}>$250</div>
                            </div>
                            <div style={{ justifySelf: 'cente1r', marginTop: '5px', fontSize: '0.65rem' }} className="font500">Heavy Veggie Loaded</div>

                        </div>
                        <div>
                            <div className="pR">
                                <div className="bd e oh">
                                    <Image
                                        alt="offer"
                                        src="/static-img/stack-of-garlic-butter-naan-bread-garnished-with-fresh-herbs_60423589.png"
                                        width={75}
                                        height={80}
                                    />
                                </div>
                                <div className="pA pdx04 bdrds font500" style={{ justifySelf: 'end', background: 'green', border: '1px solid black', color: 'white', fontSize: '0.65rem', bottom: '-3px' }}>$250</div>
                            </div>
                            <div style={{ justifySelf: 'cente1r', marginTop: '5px', fontSize: '0.65rem' }} className="font500">Heavy Veggie Loaded</div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

    const mobile_animation_promo = <>
        <style>{`
.animated-header {
    padding-block: 10px;
    padding-inline: 10px;
    // background: linear-gradient(0deg, #f8f8f7, #ffffff);
    animation: slideDown 1s ease-out forwards;
    border-color:black;
}

.animated-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
  animation: fadeInl 2s ease-in-out infinite alternate;
}

.animated-header p {
      font-size: 0.7rem;
    animation: bounce 2s infinite;
    background-color: #173363;
    color: white;
    font-weight: 800;
    width: fit-content;
    padding-inline: 0.2rem;
    border-radius: 5px;
}

@keyframes fadeIn {
  from { opacity: 0.5; transform: scale(1); }
  to { opacity: 1; transform: scale(1.05); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes slideDown {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}`}
        </style>
        <div className="df fd-c xbg_ bdBrds pR pS" id="m-container-2" style={{ background: 'linear-gradient(180deg, whitesmoke, #e9e9e9ff))_', top: '131.56px' }}>

            <div className='df aic font600 font08 pdx1' style={{ justifyContent: 'flex-end' }} ><span className='df aic bdTrds bdBrds pd03 ' style={{ background: 'orange_' }}><Icon.restart s={22} /> Reorder</span></div><div className="df animated-header oh">
                <div className="fx1">
                    <h1 className='mg0'>Delicious Deals</h1>
                    <p>Enjoy tasty meals at unbeatable prices!</p>
                </div>
                <span style={{
                    height: '70px',
                    width: '100px',
                    display: 'flex',
                    transform: 'scale(2)',
                    marginRight: '5px'
                }}>
                    <DotLottieReact
                        src="https://lottie.host/fa2f1462-060e-4c10-8b30-dd0925c3bb7a/9JlxUiE7fq.lottie"
                        loop
                        autoplay
                    />
                </span>

            </div>
        </div>

    </>

    const food_filter_data = [
        { f_name: '5 min', f_logo: <Clock3 size="1.175rem" />, f_property: { f_type: 'tag', f_action: '5min' } },
        { f_name: 'Recommended', f_logo: <Verified size="1.175rem" fill="white" />, f_property: { f_type: 'tag', f_action: 'recommended' } },
        { f_name: 'Trending', f_logo: <TrendingUp size="1.175rem" fill="white" />, f_property: { f_type: 'tag', f_action: 'trending' } },
        { f_name: 'Price < 150', f_logo: <Star size="1.175rem" fill="white" />, f_property: { f_type: 'price_range', f_action: 150 } },
        { f_name: 'Chilly', f_logo: <ForkKnife size="1.175rem" fill="white" />, f_property: { f_type: 'tag', f_action: 'chilly' } },
        { f_name: 'Chef Choice', f_logo: <ThumbsUp size="1.175rem" fill="white" />, f_property: { f_type: 'tag', f_action: 'chef choice' } },
        { f_name: 'Rated 5+', f_logo: <Star size="1.175rem" fill="white" />, f_property: { f_type: 'ct', f_action: 'pizza' } },
    ]
    // useEffect(() => {
    //     set_slideshow_content(<>
    //         <style>{`
    //             .go_from_right{
    //                 animation:gfr 5s linear;

    //             }
    //             @keyframes gfr{
    //                 0%{
    //                 right:0px;
    //                     }
    //                 100%{
    //                 right:-50px;
    //                 }
    //                 }

    //             .come_from_right{

    //                 animation:cfr 5s linear;

    //             }
    //             @keyframes cfr{
    //                 0%{
    //                 right:-50px;
    //                     }
    //                 100%{
    //                 right:0
    //                 }
    //                 }

    //             .go_from_left{
    //                 animation:gfl 5s linear;
    //             }
    //             @keyframes gfl{
    //                 0%{
    //                 left:0px;
    //                     }
    //                 100%{
    //                 left:-50px
    //                 }
    //                 }

    //             .come_from_left{
    //                 animation:cfl 5s linear;
    //             }  
    //             @keyframes cfl{
    //                 0%{
    //                 left:-50px;
    //                     }
    //                 100%{
    //                 left:0
    //                 }
    //                 }

    //             `}</style>
    //         <div className={`${sildeshow_isAnimating ? 'go_from_left come_from_right' : 'go_from_right come_from_left'} pR wfp`}>{sildeshow_data[sildeshow_current]}</div>

    //         <div className={`${sildeshow_isAnimating ? 'go_from_left come_from_right' : 'go_from_right come_from_left'} pR wfp`}>{sildeshow_data[sildeshow_next]}</div>

    //     </>);
    // }, [])

    useEffect(() => {
        set_slideshow_dots(<>
            {sildeshow_data.map((element, i) =>
                <span style={{ background: sildeshow_current === i && '#E91E63' }} key={i}></span>

            )}
        </>)

    }, [sildeshow_current, sildeshow_data])

    useEffect(() => {
        if (sildeshow_TI) clearTimeout(sildeshow_TI);

        set_slideshow_TI(
            setInterval(() => {
                set_slideshow_isAnimating(true);
                set_slideshow_direction('right');
                setTimeout(() => {
                    set_slideshow_current(sildeshow_next);
                    set_slideshow_next((sildeshow_next + 1) % sildeshow_data.length);
                    set_slideshow_isAnimating(false);
                }, 600)
            }
                , 5000)
        )
    }, [sildeshow_data.length, sildeshow_next])

    useEffect(() => {
        if (filter_bar.current) {
            const top_header_height = top_header.current?.offsetHeight;
            filter_bar.current.style.top = `${top_header_height}px`;
        }
    }, [filter_bar, top_header])

    useEffect(() => {
        if (food_filter.length > 0) {

            function filterMenuSmart({
                menuData,
                rawFilters,
                activeFilters = [],
                compareMap,
                matchAll = true, // true = AND logic, false = OR logic
            }) {
                if (!activeFilters?.length) return menuData;

                const active = activeFilters.map(i => rawFilters[i].f_property);

                // 🔁 Recursive comparison (deep scan)
                function deepCompare(value, filter, mapType) {
                    if (Array.isArray(value)) {
                        return value.some(v => deepCompare(v, filter, mapType));
                    }

                    if (typeof value === "object" && value !== null) {
                        return Object.entries(value).some(([k, v]) => {
                            const expectedType = compareMap[k];
                            return deepCompare(v, filter, expectedType);
                        });
                    }

                    if (filter.f_type === mapType) {
                        if (typeof value === "string") {
                            return value.toLowerCase().includes(String(filter.f_action).toLowerCase());
                        }
                        if (typeof value === "number" && typeof filter.f_action === "number") {
                            return value < filter.f_action;
                        }
                    }

                    return false;
                }

                // 🎯 Eligibility check (handles all active filters)
                function isItemEligible(item) {
                    const results = active.map(filter =>
                        Object.entries(compareMap).some(([key, type]) =>
                            deepCompare(item[key], filter, type)
                        )
                    );
                    return matchAll ? results.every(Boolean) : results.some(Boolean);
                }

                // 🔍 Apply filter
                return menuData
                    .map(category => {
                        const filteredItems = category.items.filter(isItemEligible);
                        return { ...category, items: filteredItems };
                    })
                    .filter(cat => cat.items.length > 0);
            }
            let f = filterMenuSmart(
                {
                    menuData: menu___i,
                    rawFilters: food_filter_data,
                    activeFilters: food_filter, // "Price < 150" and "Chilly"
                    compareMap: { name: "ct", tags: "tag", price: "price_range", items: "ct" },
                    matchAll: true, // ✅ require both filters (AND)
                }
            );
            set_menu_filtered(f);
            if (f) {
                let n = document.querySelector('#m-container-2').offsetHeight + document.querySelector('#m-container-user-focus-stuffs-1').offsetHeight + 16 + 16;

                console.log('n', document.querySelector('body').scrollTop + n, '1:', document.querySelector('#m-container-1').offsetHeight, '2:', document.querySelector('#m-container-2').offsetHeight, '3:', document.querySelector('#m-container-user-focus-stuffs-1').offsetHeight);

                document.querySelector('body').scrollBy(0, (-document.querySelector('body').scrollTop) + n);
            }
        }
        // if (food_filter) {
        //     let getPresentMenu = menu___i;

        //     let ct;
        //     let tag;
        //     let price_range;


        //     // getPresentMenu = menu___i;
        //     food_filter.map(v => {
        //         console.log(1000, v, food_filter_data[v])
        //         let get_ = food_filter_data[v].f_property;
        //         switch (get_.f_type) {
        //             case 'ct':
        //                 ct = get_.f_action;
        //                 break;
        //             case 'tag':
        //                 tag = get_.f_action;
        //                 break;
        //             case 'price_range':
        //                 price_range = get_.f_action;
        //                 break;
        //         }
        //     })


        //     console.log('pm', getPresentMenu)
        //     const a = getPresentMenu.map(v => {
        //         let f_data;
        //         if (ct) {
        //             if (v.name === ct) {
        //                 f_data = { ...v };
        //             } else {
        //                 return []
        //             }
        //         } else {
        //             f_data = v
        //         }
        //         const itemList =
        //             f_data.items.filter(i => {
        //                 function checking_same_item_with_other_active_filters() {

        //                     let tagcl = [];
        //                     const exempt_list = ['ct', 'price_range'];
        //                     food_filter.forEach(element => {
        //                         if (!exempt_list.includes(food_filter_data[element].f_property.f_type)) {
        //                             tagcl.push(i.tags.includes(food_filter_data[element].f_property.f_action));
        //                         }
        //                         console.log(food_filter_data[element].f_property.f_action);
        //                     })
        //                     console.log(tagcl, tagcl.includes(false));
        //                     return !tagcl.includes(false)
        //                 }
        //                 const catagorieCheck = ct ? v.name === ct : true;
        //                 const tagCheck = tag ? i.tags.includes(tag) && checking_same_item_with_other_active_filters() : true;
        //                 const priceCheck = price_range ? i.price <= price_range : true
        //                 return catagorieCheck && tagCheck && priceCheck
        //             })

        //         return { ...f_data, items: itemList }
        //     }).filter(list => list.length !== 0);

        //     set_menu_filtered(a);
        //     console.log(123, a, menu_filtered)

        // }
    }, [food_filter])
    //menu-btn(soft pop up)
    // useEffect(() => {

    //     set_floaters((prev) => [{
    //         name: 'menu-btn', child:
    //             <>
    //                 <div className='df aic jcc pd05 pR' id="lsn-2" style={{ zIndex: 1 }}>
    //                     <span className="font600 bdBrds bdTrds font1 pdx08 pdy04 df aic gap01" style={{
    //                         background: 'black',
    //                         color: 'white',
    //                         boxShadow: !menuLister && '0 0 12px 1px #b2b2b2',
    //                         border: '1px solid black',
    //                         borderRadius: '2rem',
    //                         transition: 'all 0.5sec'
    //                     }} onClick={(e) => { if (menu___i) { menuLister ? set_menuLister(false) : set_menuLister(true) } }}><ChevronDown fill='black' color='white' size={22} style={{ transition: 'all 0.6s ease', transform: menuLister && 'rotate(180deg)' }} /><b>Menu</b></span>
    //                 </div>

    //                 {menuLister && <div className='menu-list'> <>
    //                     <style>{`
    //     lowscreen-nav{
    //     border-top:none !important;
    //     }
    //     #lsn-1{
    //     border-top:1px solid #f8f8f8;
    //     }
    //                     `}</style>
    //                     <style>{`
    //                         .menu_list{width: 55vw;
    // // position: absolute;
    // // bottom: 5px;
    // // right: 10px;
    // height: 30vh;
    // box-shadow: 0 0 12px 1px #b2b2b2;
    // animation:menu_ani 0.5s linear;
    // // z-index:1;
    // }

    // @keyframes menu_ani {
    // 0% {
    //     height:0;
    //     width:0;
    //     opacity: 0.8;
    // }
    // 100% {
    //     opacity: 1;
    // }
    //         }
    //                     `}</style>
    //                     <div className="menu_list bdTrds bdBrds oh pA mgy2 bd" style={{ background: '#323232', color: 'white', placeSelf: 'center', bottom: 0, borderColor: 'black' }}>
    //                         <div className="df fd-c aic gap08 pdy08 hfp oy pdb1">
    //                             {menu___i && menu___i.map((v, i) => <div className="bdy df aic jcsb wfp pdx1 pdy01" key={i}><div className="df aic gap02"><span className="font500">{v.name}</span></div><span>{v.items.length}</span></div>)}
    //                         </div>
    //                     </div>
    //                 </>
    //                 </div>}
    //             </>
    //     }, ...prev]
    //     );
    //     return () => {
    //         set_floaters((prev) => prev.filter((v, i) => v.name !== 'menu-btn'))

    //         // // This runs when the component is unmounted
    //         // mutate("/cart"); // Refresh the cart data when leaving
    //     };
    // }, [menu___i, menuLister])

    useEffect(() => {

        if (search_mode) {
            set_dynamics_portal_ab(
                <div className="hfp oy">
                    <style>{`
                                   .dropdowneffect{
                                   overflow:hidden;
                                   transition:all 1s;
                                   animation:a_dropdowneffect 0.15s linear;
                                   }
                                   @keyframes a_dropdowneffect{
                                   0%{
                                   position:relative;
                                   top:-50px;
                                   }
                                   100%{
                                   position:relative;
    
                                   top:0px;
                                   }
                                   }
                                   `}</style>
                    <div className="df aic pd08 gap1 xbg dropdowneffect pS" style={{ boxShadow: '0 0 5px 1px #a7a7a7ff', top: 0 }}
                    //  Jng
                    >

                        <span className="df aic" onClick={() => set_search_mode(false)}><ArrowLeft /></span>

                        <div className="df aic gap05 wfp fx1">
                            <div className="df aic gap03 pdy06 bd bdrds pdl05 xbg wfp xbg" onClick={() => set_search_mode(true)} style={{ borderColor: '#6e70faff', color: 'black', borderWidth: '2px', background: '#ffffffff' }}>
                                <span className="df aic pdx02 pdy02" ><Search /></span>
                                <style jsx>{`
                                .focus-border{
                                border:2px solid black !important;
                                }
                                `}</style>
                                <style>{`.search-animation-container {
    
        overflow: hidden;
    }
    
    .search-animation-inner {
        height: 24px; /* adjust as needed */
    }
    
    .search-item {
        position: absolute;
        width: 100%;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }
    
    .search-item.active {
        opacity: 1;
        transform: translateY(0);
    }
    `}</style>
                                <div className="fx1 df aic gap03 " style={{ borderColor: '#323232' }}>
                                    <input type="text" autoFocus="true" placeholder="Search dishes, food.." className="wfp bdn font1 font600" id="search-input" style={{ outline: 'none', background: 'transparent' }} onChange={(e) => set_searchText(e.target.value)} />
                                </div>
                                <span className="df" style={{ visibility: searchText === "" && 'hidden' }} onClick={(e) => { document.querySelector('#search-input').value = ""; set_searchText("") }}><Icon.close fill="#414141ff" /></span>
                                <span className="df aic pdx051 pdy02 mgr02" ><Mic size={22} className="mgx05" /></span>
                            </div>
                        </div>

                    </div>
                    <div className="hfp" style={{ background: !searchText && "#f2f2ffff" }}>

                        {searchText ? <>
                            <div className="df aic pdx05 pdt08 font-sm font500 gap05 ox " style={{ scrollbarWidth: 'none' }}>
                                <span className="df aic"><Filter size={15} /> Filters</span> |
                                <span className="bdArds font600 pdy04 pdx05 font08 xfg" style={{ textWrap: 'nowrap', borderColor: 'black' }}>Price below 200</span>
                                <span className="bdArds font600 pdy04 pdx05 font08 xfg" style={{ textWrap: 'nowrap', borderColor: 'black' }}>Price below 200</span>
                                <span className="bdArds font600 pdy04 pdx05 font08 xfg" style={{ textWrap: 'nowrap', borderColor: 'black' }}>Price below 200</span>
                                <span className="bdArds font600 pdy04 pdx05 font08 xfg" style={{ textWrap: 'nowrap', borderColor: 'black' }}>Price below 200</span>
                                <span className="bdArds font600 pdy04 pdx05 font08 xfg" style={{ textWrap: 'nowrap', borderColor: 'black' }}>Price below 200</span>
                                <span className="bdArds font600 pdy04 pdx05 font08 xfg" style={{ textWrap: 'nowrap', borderColor: 'black' }}>Price below 200</span>
                            </div>
                            <div className="df fd-c">
                                <div className="df aic gap05 pdx05 pdy2 bdb"><Search /><div className="font600">{searchText}<span className="font700" style={{ color: '#6e70faff' }}> See all result</span></div></div>
                            </div>
                        </> :
                            <>

                                <div className="pdt1 pS" style={{ top: '79.16px', background: !searchText && "#f2f2ffff" }}><span className="font600 font-sm tac df aic gap01 pdx05 oh"> <LucideHistory size={20} /> Recent Searches
                                </span><div className="df aic ox pdx08 pd1 sbn"><div className="df gap1"><span className="bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={48}
                                    height={48}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span></div></div></div>

                                <div className="df fd-c bdTrds bd xbg pR oy" style={{ zIndex: 1, height: 'calc(100vh - 79.16px)' }}>

                                    <span className="pd05 font500 font-sm" style={{ color: 'gray' }}>Suggestions</span>
                                    <div className="df aic gap05 pdx05 pdy1 bdb" style={{ paddingBlock: '1.5rem' }}><Search size={22} style={{ alignSelf: 'start' }} />
                                        <div className="font600 fx1"><div className="font1 font600">Panner Handi</div><div className="df aic font08 gap03 mgt03" style={{ color: 'green' }}><TrendingUp size={15} /> Trending</div></div><span className="df mgr05 aic gap1" style={{ float: 'right' }}>                                <Image
                                            src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                            width={48}
                                            height={48}
                                            alt='food'
                                        />
                                            <ExternalLink color="gray" size={20} />
                                        </span></div>
                                    <div className="df aic gap05 pdx05 pdy1 bdb" style={{ paddingBlock: '1.5rem' }}><Search size={22} style={{ alignSelf: 'start' }} />
                                        <div className="font600 fx1"><div className="font1 font600">Panner Handi</div><div className="df aic font08 gap03 mgt03" style={{ color: 'green' }}><TrendingUp size={15} /> Trending</div></div><span className="df mgr05 aic gap1" style={{ float: 'right' }}>                                <Image
                                            src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                            width={48}
                                            height={48}
                                            alt='food'
                                        />
                                            <ExternalLink color="gray" size={20} />
                                        </span></div>
                                    <div className="df aic gap05 pdx05 pdy1 bdb" style={{ paddingBlock: '1.5rem' }}><Search size={22} style={{ alignSelf: 'start' }} />
                                        <div className="font600 fx1"><div className="font1 font600">Panner Handi</div><div className="df aic font08 gap03 mgt03" style={{ color: 'green' }}><TrendingUp size={15} /> Trending</div></div><span className="df mgr05 aic gap1" style={{ float: 'right' }}>                                <Image
                                            src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                            width={48}
                                            height={48}
                                            alt='food'
                                        />
                                            <ExternalLink color="gray" size={20} />
                                        </span></div>
                                    <div className="df aic gap05 pdx05 pdy1 bdb" style={{ paddingBlock: '1.5rem' }}><Search size={22} style={{ alignSelf: 'start' }} />
                                        <div className="font600 fx1"><div className="font1 font600">Panner Handi</div><div className="df aic font08 gap03 mgt03" style={{ color: 'green' }}><TrendingUp size={15} /> Trending</div></div><span className="df mgr05 aic gap1" style={{ float: 'right' }}>                                <Image
                                            src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                            width={48}
                                            height={48}
                                            alt='food'
                                        />
                                            <ExternalLink color="gray" size={20} />
                                        </span></div>
                                    <div className="df aic gap05 pdx05 pdy1 bdb" style={{ paddingBlock: '1.5rem' }}><Search size={22} style={{ alignSelf: 'start' }} />
                                        <div className="font600 fx1"><div className="font1 font600">Panner Handi</div><div className="df aic font08 gap03 mgt03" style={{ color: 'green' }}><TrendingUp size={15} /> Trending</div></div><span className="df mgr05 aic gap1" style={{ float: 'right' }}>                                <Image
                                            src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                            width={48}
                                            height={48}
                                            alt='food'
                                        />
                                            <ExternalLink color="gray" size={20} />
                                        </span></div>
                                    <div className="df aic gap05 pdx05 pdy1 bdb" style={{ paddingBlock: '1.5rem' }}><Search size={22} style={{ alignSelf: 'start' }} />
                                        <div className="font600 fx1"><div className="font1 font600">Panner Handi</div><div className="df aic font08 gap03 mgt03" style={{ color: 'green' }}><TrendingUp size={15} /> Trending</div></div><span className="df mgr05 aic gap1" style={{ float: 'right' }}>                                <Image
                                            src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                            width={48}
                                            height={48}
                                            alt='food'
                                        />
                                            <ExternalLink color="gray" size={20} />
                                        </span></div>
                                    <div className="df aic gap05 pdx05 pdy1 bdb" style={{ paddingBlock: '1.5rem' }}><Search size={22} style={{ alignSelf: 'start' }} />
                                        <div className="font600 fx1"><div className="font1 font600">Panner Handi</div><div className="df aic font08 gap03 mgt03" style={{ color: 'green' }}><TrendingUp size={15} /> Trending</div></div><span className="df mgr05 aic gap1" style={{ float: 'right' }}>                                <Image
                                            src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                            width={48}
                                            height={48}
                                            alt='food'
                                        />
                                            <ExternalLink color="gray" size={20} />
                                        </span></div>

                                </div>

                            </>
                        }

                    </div>
                </div>
            )

        } else { set_dynamics_portal_ab(null); set_searchText(""); }


    }, [device, search_mode, usr, searchText])

    // useEffect(() => {
    //     console.log(menu___i);

    //     if (cart__i && cart__i?.items.length > 0) {
    //         set_floaters((prev) => [...prev, {
    //             name: 'f1', child:
    //                 <div className='pd05'>
    //                     <div className='df xbg fd-c bdrds oh' style={{
    //                         alignItems: 'flex-end',
    //                         //  background: '#5f54f8ff',
    //                         background: '#ffffffff',

    //                         color: '#3045ffff', boxShadow: '0 0 5px 1px #999999ff'
    //                     }}>
    //                         <div className='pdx05 pdy03 font800 font-lg df aic wfp gap02'>

    //                             <span className="df aic">
    //                                 <svg height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
    //                                     viewBox="0 0 512 512" space="preserve">
    //                                     <path fill="#3045ffff" d="M255.999,512c-2.954,0-5.737-1.144-7.835-3.221l-47.332-46.876l-64.437,16.927
    // c-0.946,0.25-1.903,0.376-2.857,0.376c-4.984,0-9.387-3.374-10.709-8.205l-17.559-64.27L41,389.171
    // c-5.86-1.601-9.372-7.687-7.829-13.566l16.927-64.436L3.222,263.836c-4.272-4.319-4.272-11.349,0.002-15.67l46.875-47.331
    // l-16.927-64.437c-1.544-5.878,1.969-11.964,7.829-13.566l64.27-17.559l17.56-64.27c1.32-4.828,5.728-8.201,10.717-8.201
    // c0.952,0,1.909,0.125,2.843,0.371l64.442,16.927l47.333-46.877C250.265,1.145,253.048,0,255.999,0s5.734,1.145,7.835,3.223
    // l47.332,46.876l64.437-16.927c0.939-0.247,1.9-0.372,2.854-0.372c4.99,0,9.394,3.371,10.711,8.199l17.56,64.272l64.27,17.56
    // c5.86,1.601,9.372,7.687,7.829,13.566l-16.927,64.436l46.877,47.333c4.272,4.319,4.272,11.349-0.002,15.67L461.9,311.168
    // l16.927,64.437c1.544,5.878-1.969,11.964-7.829,13.566l-64.27,17.56l-17.56,64.27c-1.318,4.832-5.719,8.205-10.703,8.205
    // c-0.955,0-1.916-0.126-2.854-0.374l-64.445-16.928l-47.333,46.877C261.736,510.857,258.953,512,255.999,512z"/>
    //                                     <path fill="#091797ff" d="M461.902,200.834l16.927-64.436c1.544-5.879-1.969-11.965-7.829-13.566l-64.27-17.56L389.169,41
    // c-1.317-4.827-5.721-8.199-10.711-8.199c-0.954,0-1.914,0.125-2.854,0.372L311.167,50.1L263.835,3.223
    // C261.735,1.145,259.34,0,256.001,0v512c3.339,0,5.736-1.144,7.834-3.221l47.333-46.877l64.445,16.928
    // c0.939,0.248,1.899,0.374,2.854,0.374c4.984,0,9.385-3.374,10.703-8.205l17.56-64.27l64.27-17.56
    // c5.86-1.601,9.372-7.687,7.829-13.566l-16.927-64.437l46.875-47.331c4.274-4.321,4.274-11.352,0.002-15.67L461.902,200.834z"/>
    //                                     <path fill="#FFFFFF" d="M189.217,244.871c-30.684,0-55.652-24.968-55.652-55.652s24.968-55.652,55.652-55.652
    // s55.652,24.968,55.652,55.652S219.901,244.871,189.217,244.871z M189.217,166.958c-12.277,0-22.261,9.984-22.261,22.261
    // s9.984,22.261,22.261,22.261c12.277,0,22.261-9.984,22.261-22.261S201.494,166.958,189.217,166.958z"/>
    //                                     <path fill="#D1E7F8" d="M322.782,378.435c-30.684,0-55.652-24.968-55.652-55.652s24.968-55.652,55.652-55.652
    // s55.652,24.968,55.652,55.652S353.466,378.435,322.782,378.435z M322.782,300.523c-12.277,0-22.261,9.984-22.261,22.261
    // c0,12.277,9.984,22.261,22.261,22.261c12.277,0,22.261-9.984,22.261-22.261C345.043,310.507,335.059,300.523,322.782,300.523z"/>
    //                                     <path fill="#FFFFFF" d="M178.087,350.609c-4.272,0-8.544-1.631-11.804-4.892c-6.521-6.516-6.521-17.092,0-23.609
    // l155.825-155.825c6.521-6.521,17.087-6.521,23.609,0c6.521,6.516,6.521,17.092,0,23.609L189.892,345.718
    // C186.63,348.98,182.359,350.609,178.087,350.609z"/>
    //                                     <path fill="#D1E7F8" d="M322.108,166.285l-66.108,66.109v47.217l89.716-89.716c6.521-6.516,6.521-17.092,0-23.609
    // C339.196,159.763,328.63,159.763,322.108,166.285z"/>
    //                                 </svg>
    //                             </span>
    //                             <span className='font-sm font700'>
    //                                 Add item worth 99 and get 50% flat discount
    //                             </span>
    //                         </div>
    //                         <div className="pS pd05l jcsb wfp oh bdrds bd" style=
    //                             {{ bottom: 0, color: 'black' }}>
    //                             <div className="df fd-c aic jcsb gap05 pdy06 pdx06 xbg" style={{
    //                                 background: 'forestgreen',
    //                                 color: 'white'
    //                             }}>
    //                                 <div className='df aic jcsb wfp'>
    //                                     <span className="font600 font-md df aic">{cart__i?.items.length}  Items Added</span>
    //                                     <Link href='/cart' className='font-lg font900 bdrds xfg' style={{ background: 'mintcream', color: 'forestgreen', paddingBlock: '1.2rem', paddingInline: '2.5rem' }}>Checkout</Link>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //         }]);
    //     };

    //     return () => {
    //         set_floaters((prev) => prev.filter((v, i) => v.name !== 'f1'))

    //         // // This runs when the component is unmounted
    //         // mutate("/cart"); // Refresh the cart data when leaving
    //     };
    // }, [cart__i])

    useEffect(() => {
        if (food_filter.length === 0) {
            set_menu_filtered(null);
        }
        console.log('from filter effect :', food_filter)
    }, [food_filter])

    const menu = useMemo(() => {
        const tomenu = menu_filtered ? menu_filtered : menu___i;
        console.log('ccc', cart__i, tomenu)
        return tomenu?.map((categories) => {
            if (categories.items.length >= 1) {
                return (
                    <div className="bdrds pdb1" key={categories.id}>
                        <span className="font2 font700 text-grey">{categories.name}</span>

                        <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-2 justify-items-center pd05">

                            {categories.items.map((menu_items, i) =>
                                // <div key={i}>
                                //     {device === 'mobile' &&
                                //         <>
                                //             <style>
                                //                 {`              
                                //                 .lowscreen-portal{
                                //                   animation:a_lowscreen-porta_ 0.15s linear ;
                                //                 }
                                //                 @keyframes a_lowscreen-porta_{
                                //                 0%{
                                //                 bottom:-100%;
                                //                 }
                                //                 100%{
                                //                 bottom:0;
                                //                 }
                                //                 }`}
                                //             </style>
                                //             <div className=" xbg df jcsb pdt1 pdb2 mgx08 pdx07  bdrds" style={{ border: '1px solid lightgray' }}>
                                //                 <div className="pdr06 df fd-c gap05">
                                //                     <div className="df" style={{ alignItems: 'flex-start' }}>
                                //                         <span className="mgl01 font-lg font700 df" style={{ justifyItems: 'start' }}>{menu_items.name}<Verified fill="#3045ffff" color="white" /></span>

                                //                     </div>
                                //                     <div className="df aic gap02">
                                //                         <span className="pdx03 pdy01 bdrds aic font-sm df font600 gap01" style={{ background: '#ecececff', color: 'black', fontSize: '0.775rem' }}><Star size="0.875rem" fill="forestgreen" />4.5</span>
                                //                         <span className="pdx03 pdy01 bdrds aic font-sm df font600 gap01" style={{ background: '#ecececff', color: 'black', fontSize: '0.7rem' }}><Smile size="0.9rem" fill="gold" /> 2K+</span>
                                //                     </div>
                                //                     <div className="df aic gap03 fxw">
                                //                         {menu_items.tags.map(t =>
                                //                             <span className="pdx03 pdy01  aic font-sm df font600 gap01 wmc" style={{ background: '#ecececff', color: 'black', fontSize: '0.775rem' }}>{t}</span>
                                //                         )}
                                //                     </div>
                                //                     <span className="font-sm font500">{menu_items.price}</span>
                                //                     <div className="font-sm font500 pdt05">{menu_items.description}</div>
                                //                 </div>
                                //                 <div>
                                //                     <div className="df fd-c aic pR" onMouseMoveCapture={(e) => { e.currentTarget.children[1].style.display = "flex" }} ><div className="bd bdrds oh" onClick={() => set_dynamics_portal_main(
                                //                         <div className="lowscreen-portal wfp df fd-c oh" style={{
                                //                             background: 'white',
                                //                             borderTop: '1px solid', borderTopRightRadius: '10px', borderTopLeftRadius: '10px'
                                //                         }}>
                                //                             <div className="pdy05 pdx1 font600 bdb">{menu_items.name}  <span className="df" style={{ float: 'right' }} onClick={() => set_dynamics_portal_main(null)}>
                                //                                 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></span></div>
                                //                             <div className="wfp df gap05" style={{ height: '200px' }}>
                                //                                 {/* Hii */}

                                //                                 <ProductImage
                                //                                     src={menu_items.image}
                                //                                     alt="iphone 15"
                                //                                     width={202}
                                //                                     height={200}
                                //                                     fallbackSrc="/Food99.png"
                                //                                 />
                                //                                 <div className="df fd-c gap08 mgt05 fx1 pdr05">
                                //                                     <div className="df aic jcsb"><span>{'$' + menu_items.price}</span>
                                //                                         <div className="pR df" style={{ width: '100px' }}>

                                //                                             <Cart_Control_Indirect cart_detail={() => {
                                //                                                 const cartItem = cart__i?.items?.find((v) => v.menu_item.id === menu_items.id);

                                //                                                 return {
                                //                                                     quantity: cartItem ? cartItem.quantity : null,
                                //                                                     cart_item_id: cartItem ? cartItem.id : null,
                                //                                                 };
                                //                                             }}
                                //                                                 item={{
                                //                                                     id: menu_items.id,
                                //                                                     name: menu_items.name,
                                //                                                     price: menu_items.price,
                                //                                                     image: menu_items.image
                                //                                                 }} />
                                //                                         </div>
                                //                                     </div>

                                //                                     <div className="fx1 bdt pdt05 font08">{menu_items.description}</div></div>
                                //                             </div>
                                //                             {/* <div>{menu_items.item_price__}</div> */}

                                //                         </div>
                                //                     )} style={{
                                //                         width: '121px',
                                //                         height: "120px",
                                //                         borderRadius: '10px',
                                //                         justifySelf: 'center',
                                //                         background: 'white'
                                //                     }}>
                                //                         <ProductImage
                                //                             src={menu_items.image}
                                //                             alt="iphone 15"
                                //                             width={122}
                                //                             height={120}
                                //                             fallbackSrc="/Food99.png"
                                //                         />
                                //                     </div>
                                //                         <Cart_Control_Indirect
                                //                             cart_detail={() => {
                                //                                 const cartItem = cart__i?.items?.find((v) => v.menu_item.id === menu_items.id);

                                //                                 return {
                                //                                     quantity: cartItem ? cartItem.quantity : null,
                                //                                     cart_item_id: cartItem ? cartItem.id : null,
                                //                                 };
                                //                             }}
                                //                             item={{
                                //                                 id: menu_items.id,
                                //                                 name: menu_items.name,
                                //                                 price: menu_items.price,
                                //                                 image: menu_items.image
                                //                             }}
                                //                         />
                                //                     </div>

                                //                 </div>
                                //             </div>

                                //         </>
                                //     }
                                // </div>


                                <div className="w-full rounded-xl hover:shadow-md transition-all duration-300 bg-white overflow-hidden">
                                    {/* Product Image */}
                                    <Link href={`/product/${product.slug}`} className="block relative w-full h-[150px] oh">
                                        <div className="pA hfp wfp xbg" style={{
                                            zIndex: 1,
                                            opacity: '0.3',
                                            background: '#3d73ad2e'
                                        }}></div>
                                        <Image
                                            src={menu_items.image || "/placeholder.png"}
                                            alt={menu_items.name}
                                            fill
                                            className="object-cover rounded-t-xl"
                                        />
                                    </Link>

                                    {/* Product Info */}
                                    <div className="p-3" style={{ background: '#f9fbff83' }}>
                                        <Link href={`/product/${product.slug}`}>
                                            <h3 className="text-base font-medium text-gray-800 truncate">{menu_items.name}</h3>
                                        </Link>

                                        {/* Price Row */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-lg font-semibold text-green-600">₹{menu_items.price}</span>
                                            {product.oldPrice && (
                                                <span className="text-sm text-gray-400 line-through">₹{menu_items.price - 25}</span>
                                            )}
                                        </div>

                                        {/* Distributor Name */}
                                        {product.distributor && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {/* Sold by: <span className="font-medium text-gray-700">{product.distributor}</span> */}
                                                <span className="pdy02 pdx03 bdArdsl df aic wfc gap02 font07 font800" style={{ background: '#eaeefdcf' }}>
                                                    <Truck size="1rem" /> Deliver in 2 days
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                )
            }

        }

        )
    }, [menu___i, cart__i, menu_filtered])

    useEffect(() => {
        console.log('func-init-eft', document.querySelector('.qqqXA'), top_header.current)

        const scrollableDiv = document.querySelector('.qqqXA');
        if (!scrollableDiv || !top_header.current) return;

        function scrollWatcher() {
            console.log('func-init')

            const scrollTop = scrollableDiv.scrollTop;
            const headerHeight = top_header.current.offsetHeight;
            if (scrollTop >= headerHeight) {
                console.log('set-true')
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
                console.log('set-false')
            }
        }

        scrollableDiv.addEventListener('scroll', scrollWatcher);

        // Initial check
        scrollWatcher();

        return () => {
            scrollableDiv.removeEventListener('scroll', scrollWatcher);
        };
    }, [menu___i]);

    useEffect(() => {
        // getting and setting the slideshow content data from sever..
        let contentList = [
            <>
                <div className="wfp df jcsb aic pA font700 pd05"
                    style={{
                        color: '#ffffff',
                        top: 0,
                        background: 'linear-gradient(0deg, transparent, #000000)'
                    }}
                ><span className='font-lg'>New Launch</span><span className='pdx04' style={{
                    color: '#ffffff',
                    background: 'crimson'
                }}>Order Now</span></div>
                <Image
                    src="/food_img/the-pepperoni-pizza-and-a-piece-of-streched-cheese-pizza-with_22994042.jpg"
                    height={210}
                    width={600}
                    style={{ width: "100%" }}
                    alt='pizza-ad'
                />
                <div className="wfp df jcsb aic pA font700 pdy03 pdx05"
                    style={{
                        color: '#ffffff',
                        bottom: 0,
                        background: 'linear-gradient(to right, #181818, rgb(0 0 0 / 0%) 100%)'
                    }}
                ><span className='font-md'>Pepronie pizza@159</span></div>
            </>,
            <>
                <div className="wfp df jcsb aic pA font700 pd05"
                    style={{
                        color: '#ffffff',
                        top: 0,
                        background: 'linear-gradient(0deg, transparent, #000000)'
                    }}
                ><span className='font-lg'>New Launch</span><span className='pdx04' style={{
                    color: '#ffffff',
                    background: 'crimson'
                }}>Order Now</span></div>
                <Image
                    src="/food_img/d.jpeg"
                    height={210}
                    width={600}
                    style={{ width: "100%" }}
                    alt='pizza-ad'
                />
                <div className="wfp df jcsb aic pA font700 pdy03 pdx05"
                    style={{
                        color: '#ffffff',
                        bottom: 0,
                        background: 'linear-gradient(to right, #181818, rgb(0 0 0 / 0%) 100%)'
                    }}
                ><span className='font-md'>Makhani pizza@129</span></div>
            </>,
            <>
                <div className="wfp df jcsb aic pA font700 pd05"
                    style={{
                        color: '#ffffff',
                        top: 0,
                        background: 'linear-gradient(0deg, transparent, #000000)'
                    }}
                ><span className='font-lg'>Get 50% off</span><span className='pdx04' style={{
                    color: '#ffffff',
                    background: 'crimson'
                }}>Order Now</span></div>
                <Image
                    src="/food_img/1760955549898.jpg"
                    height={210}
                    width={800}
                    style={{ width: "100%" }}
                    alt='pizza-ad'
                />
                <div className="wfp df jcsb aic pA font700 pdy03 pdx05"
                    style={{
                        color: '#ffffff',
                        bottom: 0,
                        background: 'linear-gradient(to right, #181818, rgb(0 0 0 / 0%) 100%)'
                    }}
                ><span className='font-md'>Italian Tomato Pasta@149</span></div>
            </>
        ];
        set_slideshow_data((prev) => [...prev, ...contentList]);



        return () => { set_slideshow_data([]); }
    }, [menu___i])
    const searchTexts = [
        "Pizza..",
        "Burgers..",
        "Panner handi.."
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Set up the interval to change text every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % searchTexts.length);
        }, 2000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (<>
        {/* <style>{`#topbar{box-shadow: 0px 3px 4px 0px #eaeaea82;}`}</style> */}
        <style>{`
        #home{
            background: #E8F5E9;
            padding-inline: 5px;
            border-radius: 10px;
            padding-block: 3px;
            font-weight: bold;
        }
        #home svg .fill-portion-shine{
            fill:#8BC34A;
        }
        #home svg .fill-portion-glossy{
            fill:#568c30;
        }
        .add_cart_control_ICart_Control_Indirect{    
            display: flex;
            background: #ffffff;
            width: 70%;
            justify-self: center;
            font-size: 0.75rem;
            font-weight: bold;
            color: #2c720a;
            border-radius: 5px;
            background: #f9fffa;
            border: 1px solid #31b137;
            justify-content: space-around;
            user-select:none;
        }
        .dfIMP{
            display:flex !important;
        }
        `}</style>
        <style>
            {`
                .CKEFT{
                    transition: all 0.16s;
                    cursor:pointer;
                }
                .CKEFT:hover{
                    background:#d6ebd1;
                }
                `}
        </style>
        {/* {console.log(menu___i)} */}

        {device === 'mobile' && <div className="pA wfp" style={{ height: '280px', background: 'linear-gradient(to bottom, #8ba1ffff, #d2afffff)', top: 0 }}></div>}

        {device === 'mobile' && <div className={`${isScrolled && "xbg_ bdBrds bdb pdb01"} topbar-container pS `} id="m-container-1" style={{ top: 0, zIndex: 2, backdropFilter: 'blur(1px)', background: isScrolled ? 'white' : 'transparent', borderColor: '#e9f1ffff', transition: 'all 0.3s ease', boxShadow: isScrolled && '0 1px 5px 1px #ecececff' }} ref={top_header}>

            <div className="df fd-c pdy09 pdx09 gap1"
            // style={{ background: '#b1261cff', color:'white' }}  
            >
                <Topbar_ />
                <div className="df aic gap03 pdy06 bdArds pdl05 xbg oh pdy02" onClick={() => set_search_mode(true)} style={{ display: 'hidden', color: 'black', background: 'whitesmoke', borderRadius: '1rem', border: '2px solid #d8d8d8ff' }}>
                    <span className="df aic pdx02 pdy02" ><Search color='#4056d4ff' /></span>
                    <style>{`.search-animation-container {
                    
                        overflow: hidden;
                    }
                    
                    .search-animation-inner {
                        height: 24px; /* adjust as needed */
                    }
                    
                    .search-item {
                        position: absolute;
                        width: 100%;
                        opacity: 0;
                        transform: translateY(20px);
                        transition: all 0.5s ease;
                    }
                    
                    .search-item.active {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    `}</style>
                    <div className="fx1 df aic gap03 bdr" style={{ borderColor: '#323232' }}>
                        <span>Search </span>

                        <div className="search-animation-inner">
                            {searchTexts.map((text, i) => (
                                <div
                                    key={i}
                                    className={`search-item ${i === currentIndex ? 'active' : ''}`} style={{ color: '#5e5e5eff' }}
                                >
                                    <b>{text}</b>
                                </div>
                            ))}
                        </div>

                    </div>
                    <span className="df aic pdx05 pdy02 mgr02" ><Mic color='#4056d4ff' size={22} className="mgx05" /></span>
                </div>
            </div>
        </div>}

        {/* {device === 'mobile' && mobile_animation_promo} */}

        {device && menu___i ?
            <>
            {console.log(user)}
                <div className='df fd-c xbg pR' style={{ zIndex: 1 }}>
                    <div className="df fd-c gap1 pdy1 xfg bdBrds oh pdt05" id="m-container-user-focus-stuffs-1">
                        <div className="df gap05 fx1 ox pdx05 sbn">
                            <span className="df fd-c aic gap02 font08 pdx05 pdy03">
                                <Image
                                    src={"/static-img/cute-cartoon-burger-icon_22911694.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                />
                                <span className="font600">Burger</span>
                            </span>
                            <span className="df fd-c aic gap02 font08 pdx05 pdy03">
                                <Image
                                    src={"/static-img/top-view-pizza-with_24589160.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                />
                                <span className="font600">Pizza</span>
                            </span>
                            <span className="df fd-c aic gap02 font08 pdx05 pdy03">
                                <Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                />
                                <span className="font600">Thali</span>
                            </span>
                            <span className="df fd-c aic gap02 font08 pdx05 pdy03">
                                <Image
                                    src={"/static-img/ai-generated-samosas-dish-png-isolated-on-transparent_36256574.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                />
                                <span className="font600">Samosa</span>
                            </span>
                            <span className="df fd-c aic gap02 font08 pdx05 pdy03">
                                <Image
                                    src={"/static-img/indian-paneer-butter-masala-isolated-on-transparent-background_56102177.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                />
                                <span className="font600">Panner Handi</span>
                            </span>
                            <span className="df fd-c aic gap02 font08 pdx05 pdy03">
                                <Image
                                    src={"/static-img/potted-green-clover-plant-in-white-ceramic-bowl_57752437.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                />
                                <span className="font600">Manchurian</span>
                            </span>
                            <span className="df fd-c aic gap02 font08 pdx05 pdy03">
                                <Image
                                    src={"/static-img/stack-of-garlic-butter-naan-bread-garnished-with-fresh-herbs_60423589.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                />
                                <span className="font600">Naan</span>
                            </span>
                            <span className="df fd-c aic gap02 font08 pdx05 pdy03">
                                <Image
                                    src={"/static-img/spring-roll-isolated-on-background_39112107.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                />
                                <span className="font600">Spring Roll</span>
                            </span>
                            <span className="df fd-c aic gap02 font08 pdx05 pdy03">
                                <Image
                                    src={"/static-img/delicious-strawberry-sundae-with-cherry-and-toppings_50756335.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                />
                                <span className="font600">Shakes</span>
                            </span>

                        </div>
                        {/* {mobile_banner} */}
                    </div>

                    {/* <div className="df aic jcsb bdb pdx1 pdb08 ybg gap3 ox pS " style={{
                        scrollbarColor: '#f8f8f8 white',
                        scrollbarWidth: 'none',
                        top: usr ? '140.4px' : '124px',
                        zIndex: 1,
                        background: 'white',
                        paddingTop: '1.3rem'
                    }} ref={filter_bar}>
                        <div className="df aic gap1 fx1">
                            {food_filter_data.map((v) =>
                                <span className="df aic gap02 font08 pdx05 pdy05 bd bdArds" style={{ background: food_filter?.some((v_) => food_filter_data.findIndex(i => v === i) === v_) ? '#b4b4b4ff' : '#f8f8f8', color: food_filter?.some((v_) => food_filter_data.findIndex(i => v === i) === v_) ? 'white_' : 'black', border: '1px solid black_' }} onClick={() => {

                                    if (!food_filter?.some((v_) => food_filter_data.findIndex(i => v === i) === v_)) {
                                        set_food_filter((prev) => [...prev, food_filter_data.findIndex(i => v === i)]);

                                    } else {
                                        set_food_filter((prev) => prev.filter((v__) => parseInt(food_filter_data.findIndex(i => v === i)) !== v__));

                                        console.log(321, food_filter.filter((v__) => parseInt(food_filter_data.findIndex(i => v === i)) !== v__));
                                    }
                                }}>
                                    {v.f_logo}
                                    <span className="font800 wmc">
                                        {v.f_name}
                                    </span>
                                </span>
                            )}


                        </div>
                    </div>

                    {/* </div> */}
                    {/* {homepageSections.map((section, i) => {
                        let b;
                        let next_arr_child = homepageSections.findIndex((index) => index === i + 1);
                        if (['category_grid', 'product_grid'].some((index) => index === next_arr_child.type)) {
                            b = { bb: false, bt: i === 1 ? true : false };

                        } else {
                            b = {
                                bb: ['category_grid', 'product_grid'].some((index) => index === section.type) ? true : false, bt: i === 0 ? true : false
                            };

                        }

                        return device === 'pc' && section.type === 'search_suggestion' ? "" : <Feeder
                            key={i}
                            section={section}
                            borderBlockBooleans={b}
                        />
                    })} */}

                    {/* 
                    <div className="fx1" style={{
                        scrollbarColor: '#e7e7e7ff white',
                        scrollbarWidth: 'thin',
                        background: 'whitesmoke_',
                        paddingBlockEnd: `${floaters ? '150px' : 0}`
                    }}>

                        {menu}

                    </div> */}

                        <h1>hi {user?.username}</h1>
                    {sections.map((section, i) => (
                        <Feeder key={i} section={section} borderBlockBooleans={true} />
                    ))}
                </div>


                {/* {device === 'mobile' && dynamic_portal_main} */}
            </>

            : <div className="hfp wfp df aic jcc"><div className="df fd-c aic"><span style={{ height: '200px', width: '200px' }}><DotLottieReact
                src="https://lottie.host/ae3002b6-0032-483e-befc-5bef572881dc/Eu5RhsnUUn.lottie"
                loop
                autoplay
            /></span><span className='font600' style={{ color: '#8a8a8a' }}>Loading...</span></div></div>}


    </>)
}

function ProductImage({ src, alt, width, height, fallbackSrc }) {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            onError={() => setImgSrc(fallbackSrc)}
        />
    );
}

