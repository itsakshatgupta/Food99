'use client'
import { dynamic_ } from "../main-context";
import { useContext } from "react"

export default function Portal_Ab({ content }) {
    const { set_dynamics_portal_main } = useContext(dynamic_);

    return (
        <>
                <div className="hfp df fd-c gap1 pdx1" style={{
                    background: 'blue',
                    width: 'calc(25rem + 10vmin)',
                    scrollbarWidth: 'none',
                }}
                >{content}</div>
        </>
    )
}