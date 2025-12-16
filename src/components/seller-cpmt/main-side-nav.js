import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function MainSideNavButtons({ vertical=true, icon, name, controller = { control: undefined, setController: undefined } }) {
    return (
        <span className={`df ${vertical?"fd-c":"rounded-md pl-1 pr-8"} ${controller.control === name && !vertical ? "bg-gray-200":"hover:bg-gray-100"} gap-0.5 aic cursor-pointer text-sm `} onClick={()=>controller.setController(name)}>
            <span className={`${vertical?controller.control === name ? "bg-black text-white" : "bg-gray-100":""} rounded-full p-[5px]`}>{icon}</span>
            <span className={`${controller.control === name && "text-purple-600_"} `}>{name}</span>
        </span >
    )
}

export default function MainSideNav({center=true, children, title, className, backBtn=false}) {
    const router = useRouter()
    return (
        <div className={`df fd-c ${center?"aic":" bg-[#fbfbfb]"} jcc_ gap-3 px-2 border-r pt-3 max-w-[min-content]_ tac min-w-[3.5rem] max-w-auto ${className&&className}`}>
            <h1 className="text-lg df aic gap-3">{backBtn&&<ArrowLeft size={20} onClick={()=>router.back()} className="cursor-pointer"/>}{title}</h1>
            {children}
            </div>
            
    )
}