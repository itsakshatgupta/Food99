'use client'
import { dynamic_ } from "../main-context";

import { useContext } from "react"

export default function Portal_({content}) {
    const { set_dynamics_portal_main } = useContext(dynamic_);

    return (
        <>
        <style>{`
          .portal_{
    min-width: 350px;
    max-width:fit-content;
    height: 100%;
    }
              .portal_{
            
            animation:a_portal_ 0.1s linear;
          }
          @keyframes a_portal_{
          0%{
          right:-350px;
          }
          100%{
          right:0;
          }
          }


        `}</style>
            <div className="portal_ hfp pR df fd-c bdl" style={{background:'white'}}>{content}</div>
        </>
    )
}