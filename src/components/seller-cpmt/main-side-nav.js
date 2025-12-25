import { ArrowLeft, Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { createContext, useContext, useState } from "react"


export const MainSideNavContext = createContext();

export function MainSideNavButtons({ vertical = true, icon, name, controller = { control: undefined, setController: undefined } }) {
    const {expand_view, setExpandView} = useContext(MainSideNavContext)
    vertical = !expand_view
    return (
        <span className={`df ${vertical? "fd-c" : "rounded-md pl-1 pr-8"} ${!vertical ? controller.control === name ? "bg-gray-200" : "hover:bg-gray-100" : "group"} gap-0.5 aic cursor-pointer text-sm `} onClick={() => controller.setController(name)}>
            <span className={`${controller.control === name ? vertical ? "bg-gray-200" : "bg-black_ text-white_" : vertical ? "group-hover:bg-gray-200" : "bg-gray-100"} rounded-full p-[5px]`}>{icon}</span>
            {expand_view&&<span className={`${controller.control === name && "text-purple-600_"} `}>{name}</span>}
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