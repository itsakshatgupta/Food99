'use client';

import { Star } from "lucide-react";
import { useParams, usePathname, useSearchParams } from "next/navigation";

export default function SearchPage() {
    const pathname = useSearchParams();
    // return(<h1>p={pathname.get('p')}<br/>tag={pathname.get('tag')}<br/>f={pathname.get('f')}<br/>ref={pathname.get('ref')}</h1>)
    return (
        <Search__Page />
    )
}

function Search__Page() {

    return (
        <>
            <div className="flex flex-row min-h-screen wfp">
                <div className="min-w-[12rem] bg-[ghostwhite] h-[initial] border-r p-3 space-y-2">
                    <div>
                        <h1 className="text-lg font-semibold mb-1">Brands</h1>
                        <ul className="mx-1">
                            <li><input type="checkbox" className="mr-1" />Toshiba</li>
                            <li><input type="checkbox" className="mr-1" />Samsung</li>
                            <li><input type="checkbox" className="mr-1" />L.G</li>
                            <li><input type="checkbox" className="mr-1" />Acer</li>
                            <li><input type="checkbox" className="mr-1" />Asus</li>
                            <div className="color-[purple] text-sm underline cursor-pointer">More</div>

                        </ul>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold mb-1">Warranty</h1>
                        <ul className="mx-1">
                            <li><input type="radio" className="mr-1" />4+ years</li>
                            <li><input type="radio" className="mr-1" />3 years</li>
                            <li><input type="radio" className="mr-1" />2 years</li>
                            <li><input type="radio" className="mr-1" />1 years</li>

                        </ul>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold mb-1">Rating</h1>
                        <ul className="mx-1">
                            <li className="flex gap-2 border rounded-sm border-[lightgray] mb-1 hover:border-[dodgerblue] py-1 px-1 cursor-pointer mb-1_"><span className="flex gap-1">{[1,2,3,4,5].map(v=><Star fill="orange" size={15}/>)}</span><span className="text-sm text-[navy]">5 stars</span></li>
                            <li className="flex gap-2 border rounded-sm border-[lightgray] mb-1 hover:border-[dodgerblue] py-1 px-1 cursor-pointer mb-1_"><span className="flex gap-1">{[1,2,3,4].map(v=><Star fill="orange" size={15}/>)}</span><span className="text-sm text-[navy]">4 stars</span></li>
                            <li className="flex gap-2 border rounded-sm border-[lightgray] mb-1 hover:border-[dodgerblue] py-1 px-1 cursor-pointer mb-1_"><span className="flex gap-1">{[1,2,3].map(v=><Star fill="orange" size={15}/>)}</span><span className="text-sm text-[navy]">3 stars</span></li>
                            <li className="flex gap-2 border rounded-sm border-[lightgray] mb-1 hover:border-[dodgerblue] py-1 px-1 cursor-pointer mb-1_"><span className="flex gap-1">{[1,2].map(v=><Star fill="orange" size={15}/>)}</span><span className="text-sm text-[navy]">2 stars</span></li>
                        </ul>
                    </div>
                </div>


                <div className="flex-1 h-[initial] wfp">
                    <div className="border-b h-[3rem] bg-[whitesmoke]"></div>
                    <div className="p-2">
                        <h1 className="text-md font-semibold">921 Search Results</h1>
                    </div>
                </div>

            </div>
        </>
    )
}