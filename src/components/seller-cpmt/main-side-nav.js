import { fetchAPI } from "@/app/(api)/api";
import { ArrowLeft, Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"


export const MainSideNavContext = createContext();

export function MainSideNavButtons({ vertical = true, icon, name, controller = { control: undefined, setController: undefined }, notify_path=null }) {
    const {expand_view, setExpandView} = useContext(MainSideNavContext)
    const [notify_, setNotify_] = useState(null)
    vertical = !expand_view
    useEffect(()=>{
        async function getting_notify(){
            const res = await fetchAPI(notify_path, "GET", false, true)
            setNotify_(res.length+123+"+")
        }
        if(notify_path) getting_notify();
    },[])
    return (
        <span className={`df ${vertical? "fd-c" : "rounded-md pl-1 pr-8"} ${!vertical ? controller.control === name ? "bg-gray-200" : "hover:bg-gray-100" : "group"} gap-0.5 aic cursor-pointer text-sm  ${notify_path&&"pR"}`} onClick={() => controller.setController(name)}>
            <span className={`${controller.control === name ? vertical ? "bg-gray-200" : "bg-black_ text-white_" : vertical ? "group-hover:bg-gray-200" : "bg-gray-100"} rounded-full p-[5px]`}>{!expand_view&&notify_path&&notify_&&<span className="pA top-0 right-0 text-white bg-red-500 rounded-full p-1"></span>}{icon}</span>

            {expand_view&&<div className="df aic gap-2">
                <div className={`${controller.control === name && "text-purple-600_"} `}>{name}</div>
                {notify_path&&notify_&&<div className="w-[min-content] bg-red-600 text-white rounded-full px-1 py-0.2 oh text-xs df aic jcc font-semibold">{notify_}</div>}
                </div>}
        </span >
    )
}

export default function MainSideNav({functional=false, center = true, children, title, className, backBtn = false }) {
    const router = useRouter()
    const [expand_view, setExpandView] = useState(!functional?true:false)
    return (
        <div className={`df fd-c ${center && !expand_view ? "aic" : functional&&" bg-[#fbfbfb]"} jcc_ gap-3 px-2 border-r pt-1_ max-w-[min-content]_ tac min-w-[3.5rem] max-w-auto_ transition ${className && className}`}>
            <h1 className="text-lg df aic gap-3">{backBtn && <ArrowLeft size={20} onClick={() => router.back()} className="cursor-pointer" />}{title}</h1>
            {functional&&<span className="df aic gap-1" onClick={() =>setExpandView(!expand_view)}><Menu className="cursor-pointer"/>{expand_view&&<h1>Menu</h1>}</span>}
            <MainSideNavContext.Provider value={{expand_view, setExpandView}}>
                {children}
            </MainSideNavContext.Provider>
        </div>
    )
}