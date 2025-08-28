'use client'
import { dynamic_ } from "../main-context";
import { useContext } from "react"

export default function Portal_Ab({ content }) {
    const { set_dynamics_portal_main } = useContext(dynamic_);

    return (
        <>
            <style>{`
          .portal_{
              right: 0;
    background: #ffffff78;
    backdrop-filter: blur(4px);
    border-left: 1px solid #c7c7c7;
    width: 350px;
    height: 100%;
    }


        `}</style>
              <style>
        {`
          .xbg span.material-symbols-outlined:hover{
          background:var(--light-fg-button-hover-color);
          font-weight:249;
          } 
          .pab_{
            background: #4c4c4c9e;
            backdrop-filter: blur(3px);
            animation:a_pab 0.5s linear;
          }
          @keyframes a_pab{
          0%{
           background: none;
           backdrop-filter: blur(2px);
          }
          100%{
           background: #4c4c4c9e;
           backdrop-filter: blur(3px);


          }
          }
          `}
      </style>
            <div className="pA hfp wfp pab_" style={{ top: '0', justifyItems: 'flex-end', alignContent: 'center', zIndex: '1' }}>
                <div className="hfp df fd-c gap1 pdx1 oy" style={{
                    background: 'white',
                    width: 'calc(25rem + 10vmin)',
                    scrollbarWidth: 'none',
                }}
                >{content}</div>
            </div>
        </>
    )
}