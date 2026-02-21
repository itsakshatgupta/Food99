import { ChevronDown, MoreHorizontal, MoreVertical, Search } from "lucide-react";
import { useState } from "react";

export default function DropDown_1({ d, title, flowData, className }) {

    return (
        <div className={`pR  group cursor-pointer wfc ${className && className}`}>
            <span className="df aic gap01 text-sm" style={{ borderRadius: '5px' }}>{title}<ChevronDown size={14} />
            </span>

            {/* Mega Menu Dropdown */}
            <div className={`pA ${d === 'r' ? "left-[calc(100%-180px)]" : "right-[calc(100%-180px)]"}`}>
                <div className=" pR top-full mt-2    md:translate-x-0 hidden group-hover:block bg-[white] p-2 rounded-xl border border-gray-600 min-w-[180px] shadow-2xl z-[60]">
                    {flowData}
                </div>
            </div>
        </div>
    )
}

export function MoreOptions({ y, viewOnHover = false, d, children, className }) {
    const [view, setView] = useState(false)

    function toggleView() {
        switch (view) {
            case true:
                setView(false);
                break;
            case false:
                setView(true);
                break;
        }
    }

    return (
        <div className={`pR group  cursor-pointer wfc ${className && className}`}>
            <span className={`df aic gap01 text-sm p-1 ${view && "bg-gray-100"}`} style={{ borderRadius: '5px' }} onClick={() => !viewOnHover && toggleView()}>{!y ? <MoreHorizontal size={18} /> : <MoreVertical size={18} />}
            </span>

            {/* Mega Menu Dropdown */}
            <div className={`z-50 pA ${d === 'r' ? "left-[calc(100%-180px)]" : "right-[calc(100%-180px)]"}`}>
                <div className={` pR top-full ${viewOnHover ? "mt-1" : "mt-2"}  ${viewOnHover && "group-hover:block"}  md:translate-x-0 ${view ? "block" : "hidden"} bg-[white] p-2 rounded-lg border border-gray-300 min-w-[180px] shadow-sm z-[60]`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export function ToggleSwitch({ label, description, enabled, onChange, name }) {
    return (
        <div className="flex justify-between items-start py-1.5 border-b border-gray-100 last:border-b-0">
            <div>
                <span className="text-gray-800 text-sm font-semibold">{label}</span>
                <p className="text-sm text-gray-700 mt-0.5_">{description}</p>
            </div>
            <button
                onClick={() => onChange(name, !enabled)}
                className={`relative inline-flex h-4 w-8 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 p-0 focus:ring-green-500 focus:ring-offset-2 ml-4 flex-shrink-0 ${enabled ? 'bg-green-600' : 'bg-gray-300'
                    }`}
            >
                <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-1'
                        }`}
                ></span>
            </button>
        </div>
    );
}

export function SearchBox({placeholder, onChangeHandle}) {
    return (
        <div className="df aic gap-1 focus-within:border-gray-600 focus-within:shadow-sm border-2 transition text-sm text-gray-600 py-0.5 pl-1 pr-3 rounded-md"><Search size={18} />{<input type="text" className="focus:outline-none" placeholder={placeholder} onChange={onChangeHandle} />}</div>
    )
}