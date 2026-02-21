'use client'
import { dynamic_ } from '@/components/main-context';
import { useContext, useEffect, useState, useRef } from "react"
import Image from 'next/image';
import Topbar_ from '@/components/topbar_/topbar';
import { Search, Mic, TrendingUp, Verified, Star, ForkKnife, ThumbsUp, Clock3 } from 'lucide-react';
import {
    fetchAPI
} from '../(api)/api';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Feeder } from '@/components/home_page_feeder';
import { Footer } from './form/page';



export default function branches() {

    const product = {
        name: "Sage Square Adjustable Strap Muzzle",
        price: 179,
        oldPrice: 349,
        image: "https://m.media-amazon.com/images/I/51hh5hEqQ2S._MCnd_AC_.jpg",
        slug: "sage-square-adjustable-muzzle",
        distributor: "Sage Square Distributors"
    }

    const { device,  user } = useContext(dynamic_);


    const top_header = useRef(null);
    const filter_bar = useRef(null);
    const [search_mode, set_search_mode] = useState(false)

    const [isScrolled, setIsScrolled] = useState(false);

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
        // console.log('res:', res)
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

    const food_filter_data = [
        { f_name: '5 min', f_logo: <Clock3 size="1.175rem" />, f_property: { f_type: 'tag', f_action: '5min' } },
        { f_name: 'Recommended', f_logo: <Verified size="1.175rem" fill="white" />, f_property: { f_type: 'tag', f_action: 'recommended' } },
        { f_name: 'Trending', f_logo: <TrendingUp size="1.175rem" fill="white" />, f_property: { f_type: 'tag', f_action: 'trending' } },
        { f_name: 'Price < 150', f_logo: <Star size="1.175rem" fill="white" />, f_property: { f_type: 'price_range', f_action: 150 } },
        { f_name: 'Chilly', f_logo: <ForkKnife size="1.175rem" fill="white" />, f_property: { f_type: 'tag', f_action: 'chilly' } },
        { f_name: 'Chef Choice', f_logo: <ThumbsUp size="1.175rem" fill="white" />, f_property: { f_type: 'tag', f_action: 'chef choice' } },
        { f_name: 'Rated 5+', f_logo: <Star size="1.175rem" fill="white" />, f_property: { f_type: 'ct', f_action: 'pizza' } },
    ]


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

        {device ?
            <>
            {/* {console.log(user)} */}
                <div className='df fd-c bg-white pR min-fullscreen' style={{ zIndex: 1 }}>
                    <div className="df fd-c gap1 py-1 xfg oh pdt05 border-b" id="m-container-user-focus-stuffs-1">
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

                        {/* <h1>hi {user?.username}</h1> */}
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

