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
import { BookOpen, ChevronLeftCircle, ChevronRightCircle, ChevronRight, ChevronDown, ChevronUp, CircleArrowDown, Cross } from 'lucide-react';
import { apiFetch } from '../(api)/api';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import useSWR from "swr";
import { mutate } from 'swr';
import { menu } from '@/components/dummy_data';



export default function branches() {


    const { device, cart__i, set_dynamics_portal_main, usr, floaters, set_floaters, set_feature_option } = useContext(dynamic_);
    const { menu___i } = useContext(menu_);

    const top_header = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuLister, set_menuLister] = useState(false)

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
        <div className="mgx05" style={{
            color: 'white'
        }}><div className="df aic pR oh bdrds">
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
                    src="/static-img/the-pepperoni-pizza-and-a-piece-of-streched-cheese-pizza-with_22994042.jpg"
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
            </div>
            <div className="df aic jcsb mgt06" style={{ justifyContent: 'space-evenly' }}>
                <ChevronLeftCircle color='#E91E63' />
                <style>{`.more- span{
                    padding: 4px;
                    background: #dadada;
                    border-radius: 100%;
                }`}</style>
                <div className='df aic gap08 more-'>
                    <span style={{ background: '#E91E63' }}></span>
                    <span></span>
                    <span></span>
                </div>
                <ChevronRightCircle color='#E91E63' />

            </div>
        </div>
        <div className='mgx05 mgy05 df fd-c'>
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
        <div className="df fd-c xbg_ bdBrds pR pS" style={{ background: 'linear-gradient(180deg, whitesmoke, #e9e9e9ff))_', top: '131.56px' }}>

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

    useEffect(() => {

        set_floaters((prev) => [{
            name: 'menu-btn', child:
                <>
                    <div className='df aic jcc pd05 pR' id="lsn-2" style={{ zIndex: 1 }}>
                        <span className="font600 bdBrds bdTrds font-md pdx07 pdy04 df aic gap02" style={{
                            background:'black',
                            color:'white',
                            boxShadow: !menuLister&&'0 0 12px 1px #b2b2b2',
                            border:'1px solid black',
                            transition:'all 0.5sec'
                        }} onClick={(e) => { if (menu___i) { menuLister ? set_menuLister(false) : set_menuLister(true) } }}><ChevronDown fill='black' color='white' size={25} style={{transition:'all 0.6s ease', transform:menuLister&&'rotate(180deg)'}}/><b>Menu</b></span>
                    </div>

                    {menuLister && <div className='menu-list'> <>
                        <style>{`
        lowscreen-nav{
        border-top:none !important;
        }
        #lsn-1{
        border-top:1px solid #f8f8f8;
        }
                        `}</style>
                        <style>{`
                            .menu_list{width: 55vw;
    // position: absolute;
    // bottom: 5px;
    // right: 10px;
    height: 30vh;
    box-shadow: 0 0 12px 1px #b2b2b2;
    animation:menu_ani 0.5s linear;
    // z-index:1;
    }

    @keyframes menu_ani {
    0% {
        height:0;
        width:0;
        opacity: 0.8;
    }
    100% {
        opacity: 1;
    }
            }
                        `}</style>
                        <div className="menu_list bdTrds bdBrds oh pA mgy2 bd" style={{ background: '#323232', color: 'white', placeSelf: 'center', bottom: 0, borderColor:'black' }}>
                            <div className="df fd-c aic gap08 pdy08 hfp oy pdb1">
                                {menu___i && menu___i.map((v, i) => <div className="bdy df aic jcsb wfp pdx1 pdy01" key={i}><div className="df aic gap02"><span className="font500">{v.name}</span></div><span>{v.items.length}</span></div>)}
                            </div>
                        </div>
                    </>
                    </div>}
                </>
        }, ...prev]
        );
        return () => {
            set_floaters((prev) => prev.filter((v, i) => v.name !== 'menu-btn'))

            // // This runs when the component is unmounted
            // mutate("/cart"); // Refresh the cart data when leaving
        };
    }, [menu___i, menuLister])

    useEffect(() => {
        console.log(menu___i);

        if (cart__i && cart__i?.items.length > 0) {
            set_floaters((prev) => [...prev, {
                name: 'f1', child: 
                <div className='pd05'>
                <div className='df fd-c ybg bdrds oh' style={{ alignItems: 'flex-end', background: '#5f54f8ff', color: 'white', boxShadow:'0 0 5px 1px #999999ff' }}>
                    <div className='pdx05 pdy02 font800 font-lg df aic wfp'><span className='font-sm font700'>Add item worth 99 and get 50% flat discount</span>
                    </div>
                    <div className="pS pd05l jcsb wfp oh bdrds bd" style=
                        {{ bottom: 0, color: 'black' }}>
                        <div className="df fd-c aic jcsb gap05 pdy08 pdx08 xbg" style={{
                             background: 'whitesmoke',
                            color: 'wheat1'
                        }}>
                            <div className='df aic jcsb wfp'>
                                <span className="font700 font-md df aic">{cart__i?.items.length}  Items Added</span>
                                <Link href='/cart' className='pdx2 pdy09 font-lg font900 bdrds xfg' style={{ background: 'forestgreen', color: 'white' }}>Checkout</Link>
                            </div>

                            {/* <Link href='/cart' style={{
                                borderRadius: '10px',
                            }}
                                className="font700 font-md df aic">{cart__i?.items.length} Items Added <ChevronRight className="mgl05" size={22} style={{
                                    color: 'forestgreen',
                                    background: 'white',
                                    borderRadius: '100%'
                                }} />
                            </Link> */}


                        </div>
                    </div>
                </div>
                </div>
            }]);
        };

        return () => {
            set_floaters((prev) => prev.filter((v, i) => v.name !== 'f1'))

            // // This runs when the component is unmounted
            // mutate("/cart"); // Refresh the cart data when leaving
        };
    }, [cart__i])

    const menu = useMemo(() => {
        return menu___i?.map((categories) => {
            console.log('ccc', cart__i)
            if (categories.items.length >= 1) {
                return (
                    <div className="bdrds mgx05 mgt2 pdb1" key={categories.id} style={{ border: '1px dashed #9970faff' }}>
                        <span className="mgl04 pdx05 pdy02 pR font-md font600 bdrds df aic wfc bd" style={{ top: '-15px', background: '#9970faff', color: 'white', fontVariant: 'all-petite-caps', borderColor: 'black' }}>{categories.name}</span>
                        <div className={` catg df fd-c fxw`} style={{ gap: '1.2rem' }}>

                            {categories.items.map((menu_items, i) =>
                                <div key={i}>
                                    {device === 'mobile' &&
                                        <>
                                            <style>
                                                {`              
                                                .lowscreen-portal{
                                                  animation:a_lowscreen-porta_ 0.15s linear ;
                                                }
                                                @keyframes a_lowscreen-porta_{
                                                0%{
                                                bottom:-100%;
                                                }
                                                100%{
                                                bottom:0;
                                                }
                                                }`}
                                            </style>
                                            <div className=" xbg df jcsb pdt1 pdb2 mgx08 pdx07  bdrds" style={{ boxShadow: '1px 0 10px 1px #f7f7f7ff' }}>
                                                <div className="pdr06">
                                                    <div className="df" style={{ alignItems: 'flex-start' }}>
                                                        <span className="mgl01 font-lg font700">{menu_items.name}</span>
                                                        <span className="pdx02 pdy02 bdrds aic font-sm df font600 font07" style={{ background: 'white', color: '#3d5dc7ff' }}><svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#3d5dc7ff"><path d="M240-40v-329L110-580l185-300h370l185 300-130 211v329l-240-80-240 80Zm80-111 160-53 160 53v-129H320v129Zm20-649L204-580l136 220h280l136-220-136-220H340Zm98 383L296-558l57-57 85 85 169-170 57 56-226 227ZM320-280h320-320Z" /></svg></span>
                                                    </div>
                                                    <div className="df aic pdt02 pdx02 gap02">
                                                        <span className="pdx03 pdy01 bdrds aic font-sm df" style={{ background: 'green', color: 'white', fontSize: '0.7rem' }}>4.5<svg xmlns="http://www.w3.org/2000/svg" height="0.8rem" viewBox="0 -960 960 960" width="0.8rem" fill="#ffffffff"><path d="M480-644v236l96 74-36-122 90-64H518l-38-124ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" /></svg></span></div>
                                                    <div className="font-sm font500 pdt05">{menu_items.description}</div>
                                                </div>
                                                <div>
                                                    <div className="df fd-c aic pR" onMouseMoveCapture={(e) => { e.currentTarget.children[1].style.display = "flex" }} ><div className="bd bdrds oh" onClick={() => set_dynamics_portal_main(
                                                        <div className="lowscreen-portal wfp df fd-c oh" style={{
                                                            background: 'white',
                                                            borderTop: '1px solid', borderTopRightRadius: '10px', borderTopLeftRadius: '10px'
                                                        }}>
                                                            <div className="pdy05 pdx1 font600 bdb">{menu_items.name}  <span className="df" style={{ float: 'right' }} onClick={() => set_dynamics_portal_main(null)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></span></div>
                                                            <div className="wfp df gap05" style={{ height: '200px' }}>
                                                                {/* Hii */}

                                                                <ProductImage
                                                                    src={menu_items.image}
                                                                    alt="iphone 15"
                                                                    width={202}
                                                                    height={200}
                                                                    fallbackSrc="/Food99.png"
                                                                />
                                                                <div className="df fd-c gap08 mgt05 fx1 pdr05">
                                                                    <div className="df aic jcsb"><span>{'$' + menu_items.price}</span>
                                                                        <div className="pR df" style={{ width: '100px' }}>

                                                                            <Cart_Control_Indirect cart_detail={() => {
                                                                                const cartItem = cart__i?.items?.find((v) => v.menu_item.id === menu_items.id);

                                                                                return {
                                                                                    quantity: cartItem ? cartItem.quantity : null,
                                                                                    cart_item_id: cartItem ? cartItem.id : null,
                                                                                };
                                                                            }}
                                                                                item={{
                                                                                    id: menu_items.id,
                                                                                    name: menu_items.name,
                                                                                    price: menu_items.price,
                                                                                    image: menu_items.image
                                                                                }} />
                                                                        </div>
                                                                    </div>

                                                                    <div className="fx1 bdt pdt05 font08">{menu_items.description}</div></div>
                                                            </div>
                                                            {/* <div>{menu_items.item_price__}</div> */}

                                                        </div>
                                                    )} style={{
                                                        width: '121px',
                                                        height: "120px",
                                                        borderRadius: '10px',
                                                        justifySelf: 'center',
                                                        background: 'white'
                                                    }}>
                                                        <ProductImage
                                                            src={menu_items.image}
                                                            alt="iphone 15"
                                                            width={122}
                                                            height={120}
                                                            fallbackSrc="/Food99.png"
                                                        />
                                                    </div>
                                                        <Cart_Control_Indirect
                                                            cart_detail={() => {
                                                                const cartItem = cart__i?.items?.find((v) => v.menu_item.id === menu_items.id);

                                                                return {
                                                                    quantity: cartItem ? cartItem.quantity : null,
                                                                    cart_item_id: cartItem ? cartItem.id : null,
                                                                };
                                                            }}
                                                            item={{
                                                                id: menu_items.id,
                                                                name: menu_items.name,
                                                                price: menu_items.price,
                                                                image: menu_items.image
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                            </div>

                                        </>
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                )
            }

        }

        )
    }, [menu___i, cart__i])

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
        {console.log(menu___i)}
        {device === 'mobile' && menu___i ?
            <>
                <div className="pA wfp" style={{height:'280px', background:'linear-gradient(to bottom, #8ba1ffff, #d2afffff)', top:0}}></div>
                
                <div className={`${isScrolled && "xbg_ bdBrds bdb pdb01"} topbar-container pS `} style={{ top: 0, zIndex: 2, backdropFilter: 'blur(1px)', background: isScrolled?'white':'transparent', borderColor:'#e9f1ffff', transition:'all 0.3s ease', boxShadow:isScrolled&&'0 1px 5px 1px #ecececff' }} ref={top_header}>
                    <Topbar_ />
                </div>
                {mobile_animation_promo}
                <div className='df fd-c xbg pR bdTrds bdt' style={{ zIndex: 1 }}>
                    <div className="df fd-c gap1 mgy1 bdTrds oh xbg pdt05">
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
                        {mobile_banner}
                    </div>
                    <div className="df aic jcsb bdb pdx1 pdt1 pdb06 ybg gap3 ox pS " style={{
                        scrollbarColor: '#f8f8f8 white',
                        scrollbarWidth: 'none',
                        top: usr ? '129px' : '124px',
                        zIndex: 1,
                        background: 'white',
                        

                    }}>
                        <div className="df aic gap1 fx1">
                            <span className="df aic gap02 font08 pdx05 pdy05 bd bdArds" style={{ background: '#000000ff', color: 'white', border: '1px solid black_' }}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffffff" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.88 11.53C16.88 11.92 16.57 12.23 16.18 12.23C15.79 12.23 15.48 11.92 15.48 11.53V11.35L12.76 14.07C12.61 14.22 12.41 14.29 12.2 14.27C11.99 14.25 11.8 14.14 11.69 13.96L10.67 12.44L8.29 14.82C8.15 14.96 7.98 15.02 7.8 15.02C7.62 15.02 7.44 14.95 7.31 14.82C7.04 14.55 7.04 14.11 7.31 13.83L10.29 10.85C10.44 10.7 10.64 10.63 10.85 10.65C11.06 10.67 11.25 10.78 11.36 10.96L12.38 12.48L14.49 10.37H14.31C13.92 10.37 13.61 10.06 13.61 9.67C13.61 9.28 13.92 8.97 14.31 8.97H16.17C16.26 8.97 16.35 8.99 16.44 9.02C16.61 9.09 16.75 9.23 16.82 9.4C16.86 9.49 16.87 9.58 16.87 9.67V11.53H16.88Z"></path> </g>
                                </svg>
                                <span className="font800 df aic">Pizza <span className="df aic mgl02 ybg bdArds pd01" style={{ background: 'black' }}><Icon.close s="16px" fill="white"/></span>
                                </span></span>
                            <span className="df aic gap02 font08 pdl02 pdr05 pdy05 bdArds" style={{ background: '#f4f3ffff', border: '1px solid 5f54f8ff' }}><svg className="" xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#3d5dc7ff"><path d="M240-40v-329L110-580l185-300h370l185 300-130 211v329l-240-80-240 80Zm80-111 160-53 160 53v-129H320v129Zm20-649L204-580l136 220h280l136-220-136-220H340Zm98 383L296-558l57-57 85 85 169-170 57 56-226 227ZM320-280h320-320Z" /></svg><span className="font600">Recommended</span></span>
                            <span className="df aic gap02 font08 pdl02 pdr05 pdy05 bdArds" style={{ background: '#f4f3ffff', border: '1px solid 5f54f8ff' }}><svg className="" xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#4a810bff"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" /></svg><span className="font600">Trending</span></span>
                            <span className="df aic gap02 font08 pdl02 pdr05 pdy05 bdArds" style={{ background: '#f4f3ffff', border: '1px solid 5f54f8ff' }}><svg className="" xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#4a810bff"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" /></svg><span className="font600">Chilly</span></span>
                            <span className="df aic gap02 font08 pdl02 pdr05 pdy05 bdArds" style={{ background: '#f4f3ffff', border: '1px solid 5f54f8ff' }}><svg className="" xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#4a810bff"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" /></svg><span className="font600 wmc">Chef Choice</span></span>
                            <span className="df aic gap02 font08 pdl02 pdr05 pdy05 bdArds" style={{ background: '#f4f3ffff', border: '1px solid 5f54f8ff' }}><svg className="" xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#4a810bff"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" /></svg><span className="font600 wmc">Rated 5+</span></span>

                            <span className="df"><svg className="dn" xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#000000"><path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" /></svg></span>
                        </div>
                    </div>

                    {/* </div> */}


                    <div className="fx1" style={{
                        scrollbarColor: '#e7e7e7ff white',
                        scrollbarWidth: 'thin',
                        background: 'whitesmoke',
                        paddingBlockEnd: `${floaters ? '150px' : 0}`
                    }}>

                        {menu}

                    </div>
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
{/* for pc */ }
// {device === 'pc' && <div className="hfp oh pR df bdt">

//     <div className="pdx1 pdt1 bdr df fd-c jcsb fxw" style={{ background: '#f8f8f8', width: 'calc(200px + 2rem + 1px)' }}>
//         <div className="container-A  xs:dn xs:dn df fd-c fxn font-md" style={{ overflow: "hidden", width: '200px', fontWeight: "var(--font-weight-300)", zIndex: '1', borderRadius: '10px' }}>
//             <ContainerAContents />
//         </div>
//         <div className="tac font-sm font300"><span>Terms and Conditions | Privacy Policy</span></div>
//     </div>
//     <div className="fx1 df fd-c pR oh">
//         <div className={`df gap03 fx1 oh`}>

//             <div className="fx1 oy" style={{
//                 scrollbarColor: '#f8f8f8 white',
//                 scrollbarWidth: 'thin'
//             }}>
//                 <div className="df fd-c pdy1" style={{ position: 'sticky', top: '0' }}>
//                     <div className="df jcc aic">
//                         <div className="bd bdrds oh" style={{
//                             width: '75%',
//                             height: '11rem',
//                             borderColor: 'black'
//                         }}>{banner_}</div>
//                     </div>
//                 </div>
//                 <div>
//                     <div className="df aic jcsb bdb pdx1 pdy06 xbg gap3 ox" style={{
//                         scrollbarColor: '#f8f8f8 white',
//                         scrollbarWidth: 'none'
//                     }}><div className="df aic gap1 fx1">
//                             <span className="df aic gap02 font08 pdx05 pdy03"><svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#4a810bff"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" /></svg><span className="font900">Trending</span></span>
//                             <span className="df aic gap02 font08 bd xfg bdrds pdx05 pdy03"><svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#3d5dc7ff"><path d="M240-40v-329L110-580l185-300h370l185 300-130 211v329l-240-80-240 80Zm80-111 160-53 160 53v-129H320v129Zm20-649L204-580l136 220h280l136-220-136-220H340Zm98 383L296-558l57-57 85 85 169-170 57 56-226 227ZM320-280h320-320Z" /></svg><span className="font900">Recommended</span></span>
//                             <span className="df aic gap02 font08 bd xfg bdrds pdx05 pdy03"><svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#4a810bff"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" /></svg><span className="font900">Trending</span></span>
//                             <span className="df"><svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#000000"><path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" /></svg></span></div>
//                     </div>
//                     {menu__.map((ctg, i) => (

//                         <div className="pdy1" key={i}>
//                             <h2 className="mg0 pdx1 pdy08">{ctg.main_ctg__}</h2>
//                             <div className={` catg df ${device === 'pc' && 'aic'} pdy1 pdx1 gap2l fxw ${device === 'mobile' && 'fd-c'}`} style={{ gap: '1.5rem' }}>
//                                 {ctg.items_list__.map((v, i) => (
//                                     <div key={i}>
//                                         {device === 'pc' &&
//                                             <>
//                                                 <div className="pR" onMouseMoveCapture={(e) => { e.currentTarget.children[1].style.display = "flex" }} onMouseOut={(e) => { e.currentTarget.children[1].style.display = "none" }}><div className="bd" onClick={() => set_dynamics_portal_main(<Portal_ content={d(ctg.main_ctg__, v.item_name__, v.item_price__)} />)} style={{
//                                                     width: '110px',
//                                                     height: "120px",
//                                                     borderRadius: '10px',
//                                                     justifySelf: 'center',
//                                                     background: 'white'
//                                                 }}></div> <div className="pA add_cart_control_ICart_Control_Indirect oh" style={{ display: 'none', bottom: '-10px' }}><span className="df aic fx1 tac jcc CKEFT" onClick={(e) => less(e)}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="fx1 tac" id="orderNo">0</span><span className="df aic fx1 tac jcc CKEFT" onClick={(e) => add(e)}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div></div>
//                                                 <div className="font-sm" style={{ justifySelf: 'center', marginTop: '13px' }}>{v.item_name__}</div>
//                                                 <div className="font07 pdx05 bdrds" style={{ justifySelf: 'center', background: 'beige' }}>{v.item_price__}</div>
//                                             </>
//                                         }
//                                         {device === 'mobile' &&
//                                             <>
//                                                 <style>
//                                                     {`
//                                         .lowscreen-portal{
//                                           animation:a_lowscreen-porta_ 0.15s linear ;
//                                         }
//                                         @keyframes a_lowscreen-porta_{
//                                         0%{
//                                         bottom:-100%;
//                                         }
//                                         100%{
//                                         bottom:0;
//                                         }
//                                         }`}
//                                                 </style>
//                                                 <div className="bd bdrds xbg df jcsb pd1 pdb2">
//                                                     <div className="pdr06">
//                                                         <div className="df" style={{ alignItems: 'flex-start' }}>
//                                                             <h3 className="mg0">{v.item_name__}</h3>
//                                                             <span className="pdx04 pdy02 bdrds aic font-sm df font600 font07" style={{ background: 'white', color: '#3d5dc7ff' }}><svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#3d5dc7ff"><path d="M240-40v-329L110-580l185-300h370l185 300-130 211v329l-240-80-240 80Zm80-111 160-53 160 53v-129H320v129Zm20-649L204-580l136 220h280l136-220-136-220H340Zm98 383L296-558l57-57 85 85 169-170 57 56-226 227ZM320-280h320-320Z" /></svg></span>
//                                                         </div>
//                                                         <div className="df aic pdt02 pdx02 gap02">
//                                                             <span className="pdx04 pdy02 bdrds aic font-sm df" style={{ background: 'green', color: 'white', fontSize: '0.75rem' }}>4.5<svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#ffffffff"><path d="M480-644v236l96 74-36-122 90-64H518l-38-124ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" /></svg></span></div>
//                                                         <div className="font-sm pdt05">{v.item_description__}</div>
//                                                     </div>
//                                                     <div>
//                                                         <div className="df fd-c aic pR" onMouseMoveCapture={(e) => { e.currentTarget.children[1].style.display = "flex" }} ><div className="bd" onClick={() => set_dynamics_portal_main(
//                                                             <div className="lowscreen-portal pA wfp df fd-c oh" style={{
//                                                                 background: 'white', bottom: 0,
//                                                                 borderTop: '1px solid', borderTopRightRadius: '10px', borderTopLeftRadius: '10px'
//                                                             }}>
//                                                                 <div className="pdy05 pdx1 font600 bdb">{v.item_name__}  <span className="df" style={{ float: 'right' }} onClick={() => set_dynamics_portal_main(null)}>
//                                                                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></span></div>
//                                                                 <div className="xfg" style={{ height: '200px' }}>Hii</div>
//                                                                 {/* <div>{v.item_price__}</div> */}

//                                                             </div>
//                                                         )} style={{
//                                                             width: '110px',
//                                                             height: "120px",
//                                                             borderRadius: '10px',
//                                                             justifySelf: 'center',
//                                                             background: 'white'
//                                                         }}></div> <div className="pA add_cart_control_ICart_Control_Indirect oh font09 font900" style={{ bottom: '-15px', width: "100px", height: '30px' }} ><span className="df aic fx1 tac jcc CKEFT  " onClick={(e) => less(e)}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="fx1 tac" id="orderNo" style={{ alignContent: 'center' }}>ADD</span><span className="df aic fx1 tac jcc CKEFT " onClick={(e) => add(e)}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div></div>

//                                                     </div>
//                                                 </div>
//                                             </>
//                                         }
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )
//                     )}
//                 </div>

//             </div>
//             {device === 'pc' && dynamic_portal_main}
//         </div>
//         {device === 'mobile' && cart_ && <div className="pA pd05l jcsb wfp bdt bdr bdl bdTrds xbg oh" style=
//             {{ bottom: 0, borderColor: 'black' }}><div className="pd03 font600 bdb" style={{ background: 'lavender', color: 'wlhite' }}><span className='font-sm'>Add item worth 99 and get 50% flat discout</span></div>
//             <div className="df aic jcsb gap05 bdtl pdy06 pdx05" style={{ borderColor: 'black' }}><span>FI</span>
//                 <span style={{
//                     background: 'green',
//                     color: 'white',
//                     borderRadius: '10px',
//                 }}
//                     className="pd05 xfg df aic pdy07"><span className='df'><Icon.Cart_ c='white' s='24' /></span>Checkout</span>
//             </div>
//         </div>}
//         {device === 'mobile' && dynamic_portal_main}
//     </div>
// </div>}


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

