import { dynamic_ } from "../main-context";
import { useContext } from "react";


export default function Topbar({ l, m, r }) {

  const { device } = useContext(dynamic_);

  return (<>
    <style>{`.fx1_5{flex:1.5}`}</style>
    <div className={`df jcsb aic ${device == 'pc' ? 'pd1' : null} gap05 font500 ${device === 'pc' && 'text-white'} `} id="topbar" style={{
      "--local-font-size": "1.3rem", borderBottomColor: 'black'
    }}>
      <style>
        {`
          .xbg span.material-symbols-outlined:hover{
          background:var(--light-fg-button-hover-color);
          font-weight:249;
          } 
          .loading__{
              background: linear-gradient(45deg, #bebebe, #f5f5f5f7, #dadada);
              background-size:200px;
              padding: 0.6rem !important;
              width: 5rem;
              animation:ld_ 1s linear infinite;
          }
          @keyframes ld_{
          0%{
          background-position-x:0px;
          }
          25%{
          background-position-x:50%;
          }
          50%{
          background-position-x:100%;
          }
          75%{
          background-position-x:50%;
          }
          100%{
          background-position-x:0%;

          }
          }
          `}
      </style>
      <div className={`df fx1 gap1 fdc_mx1024`}>
        <div className="df aic jcfs gap1 fxw">
          {l === undefined ? <>
            <span className="loading__ bdrds"></span>
            <span className="loading__ bdrds"></span>
          </> : l
          }
        </div>
        {m && <div className="fx1 df aic jcc">{m}</div>}

      </div>
      <div className={`df  ${device === 'mobile' ? 'fx1_5 oh gap05 jcfe' : 'gap1 fdc_mx1024'} `} style={{ "--local-font-v": "350", gap: "1.62rem" }}>
        {r === undefined ? <>
          <span className="loading__ bdrds"></span>
          <span className="loading__ bdrds"></span>
          <span className="loading__ bdrds"></span>
        </> : r}
      </div>
    </div>
  </>)
}