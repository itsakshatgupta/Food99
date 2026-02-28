'use client'
import { dynamic_ } from '@/components/main-context';
import { useContext, useEffect, useState, useRef } from "react"
import Image from 'next/image';
import { fetchAPI } from '../(api)/api';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Feeder } from '@/components/home_page_feeder';

export default function branches() {
    const { device, user } = useContext(dynamic_);

    const top_header = useRef(null);
    const [sections, setSections] = useState([]);

    const fetchSections = async () => {
        const res = await fetchAPI(`home-sections`, "GET");
        setSections(res);
    };

    useEffect(() => { fetchSections(); }, []);

    return (
        <>
            <style>{`
                #home{background:#E8F5E9;padding-inline:5px;border-radius:10px;padding-block:3px;font-weight:bold;}
                #home svg .fill-portion-shine{fill:#8BC34A;}
                #home svg .fill-portion-glossy{fill:#568c30;}
                .add_cart_control_ICart_Control_Indirect{display:flex;background:#f9fffa;width:70%;justify-self:center;font-size:.75rem;
                    font-weight:bold;color:#2c720a;border-radius:5px;border:1px solid #31b137;justify-content:space-around;user-select:none;}
                .dfIMP{display:flex!important;}
                .CKEFT{transition:all .16s;cursor:pointer;}
                .CKEFT:hover{background:#d6ebd1;}
            `}</style>

            {device ? (
                <div className='df fd-c bg-white pR min-fullscreen' style={{ zIndex: 1 }}>
                    <div className="df fd-c gap1 py-1 xfg oh pdt05 border-b" id="m-container-user-focus-stuffs-1">
                        <div className="df gap05 fx1 ox pdx05 sbn">
                            {[
                                {src:"/static-img/cute-cartoon-burger-icon_22911694.png",label:"Burger"},
                                {src:"/static-img/top-view-pizza-with_24589160.png",label:"Pizza"},
                                {src:"/static-img/indian-cuisine-at-a-thali_59246817.png",label:"Thali"},
                                {src:"/static-img/ai-generated-samosas-dish-png-isolated-on-transparent_36256574.png",label:"Samosa"},
                                {src:"/static-img/indian-paneer-butter-masala-isolated-on-transparent-background_56102177.png",label:"Panner Handi"},
                                {src:"/static-img/potted-green-clover-plant-in-white-ceramic-bowl_57752437.png",label:"Manchurian"},
                                {src:"/static-img/stack-of-garlic-butter-naan-bread-garnished-with-fresh-herbs_60423589.png",label:"Naan"},
                                {src:"/static-img/spring-roll-isolated-on-background_39112107.png",label:"Spring Roll"},
                                {src:"/static-img/delicious-strawberry-sundae-with-cherry-and-toppings_50756335.png",label:"Shakes"},
                            ].map((item, idx) => (
                                <span key={idx} className="df fd-c aic gap02 font08 pdx05 pdy03">
                                    <Image src={item.src} width={50} height={50} alt={item.label}/>
                                    <span className="font600">{item.label}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    {sections.map((section, i) => (
                        <Feeder key={i} section={section} borderBlockBooleans={true} />
                    ))}
                </div>
            ) : (
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
            )}
        </>
    );
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