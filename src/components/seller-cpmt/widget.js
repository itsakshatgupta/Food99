import { ChevronDown } from "lucide-react";

export default function DropDown_1({d, title, flowData, className }) {

    return (
        <div className={`pR  group cursor-pointer wfc ${className&& className}`}>
            <span className="df aic gap01 text-sm" style={{ borderRadius: '5px' }}>{title}<ChevronDown size={14} />
            </span>

            {/* Mega Menu Dropdown */}
            <div className={`pA ${d==='r'?"left-[calc(100%-180px)]":"right-[calc(100%-180px)]"}`}>
                <div className=" pR top-full mt-2    md:translate-x-0 hidden group-hover:block bg-[white] p-2 rounded-xl border border-gray-600 min-w-[180px] shadow-2xl z-[60]">
                    {flowData}
                </div>
            </div>
        </div>
    )
}