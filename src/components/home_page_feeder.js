'use client'
import { dynamic_ } from '@/components/main-context';
import { useContext, useEffect, useState } from "react"
import Image from 'next/image';
import { fetchAPI } from '@/app/(api)/api';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Feeder } from '@/components/home_page_feeder';

const STYLES = `
    #home {
        background: #E8F5E9;
        padding-inline: 5px;
        border-radius: 10px;
        padding-block: 3px;
        font-weight: bold;
    }
    #home svg .fill-portion-shine {
        fill: #8BC34A;
    }
    #home svg .fill-portion-glossy {
        fill: #568c30;
    }
    .add_cart_control_ICart_Control_Indirect {    
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
        user-select: none;
    }
    .dfIMP {
        display: flex !important;
    }
    .CKEFT {
        transition: all 0.16s;
        cursor: pointer;
    }
    .CKEFT:hover {
        background: #d6ebd1;
    }
`;

const FOOD_CATEGORIES = [
    { name: 'Burger', image: '/static-img/cute-cartoon-burger-icon_22911694.png' },
    { name: 'Pizza', image: '/static-img/top-view-pizza-with_24589160.png' },
    { name: 'Thali', image: '/static-img/indian-cuisine-at-a-thali_59246817.png' },
    { name: 'Samosa', image: '/static-img/ai-generated-samosas-dish-png-isolated-on-transparent_36256574.png' },
    { name: 'Panner Handi', image: '/static-img/indian-paneer-butter-masala-isolated-on-transparent-background_56102177.png' },
    { name: 'Manchurian', image: '/static-img/potted-green-clover-plant-in-white-ceramic-bowl_57752437.png' },
    { name: 'Naan', image: '/static-img/stack-of-garlic-butter-naan-bread-garnished-with-fresh-herbs_60423589.png' },
    { name: 'Spring Roll', image: '/static-img/spring-roll-isolated-on-background_39112107.png' },
    { name: 'Shakes', image: '/static-img/delicious-strawberry-sundae-with-cherry-and-toppings_50756335.png' },
];

export default function HomePage() {
    const { device } = useContext(dynamic_);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        const fetchSections = async () => {
            const res = await fetchAPI('/home-sections');
            setSections(res);
        };
        fetchSections();
    }, []);

    if (!device) {
        return (
            <div className="hfp wfp df aic jcc">
                <div className="df fd-c aic">
                    <span style={{ height: '200px', width: '200px' }}>
                        <DotLottieReact
                            src="https://lottie.host/ae3002b6-0032-483e-befc-5bef572881dc/Eu5RhsnUUn.lottie"
                            loop
                            autoplay
                        />
                    </span>
                    <span className='font600' style={{ color: '#8a8a8a' }}>Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{STYLES}</style>
            <div className='df fd-c bg-white pR min-fullscreen' style={{ zIndex: 1 }}>
                {/* Categories */}
                <div className="df fd-c gap1 py-1 xfg oh pdt05 border-b" id="m-container-user-focus-stuffs-1">
                    <div className="df gap05 fx1 ox pdx05 sbn">
                        {FOOD_CATEGORIES.map(category => (
                            <div key={category.name} className="df fd-c aic gap02 font08 pdx05 pdy03">
                                <Image
                                    src={category.image}
                                    width={50}
                                    height={50}
                                    alt={category.name}
                                />
                                <span className="font600">{category.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sections */}
                <div className="fx1">
                    {sections.map((section, i) => (
                        <Feeder key={i} section={section} borderBlockBooleans={true} />
                    ))}
                </div>
            </div>
        </>
    );
}