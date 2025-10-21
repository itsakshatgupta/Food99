'use client';
import { useEffect } from 'react';

export default function SettingsPanel({ onClose }) {
    useEffect(() => {
        // Prevent scroll on body when settings is open
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = '');
    }, []);

    return (
        <>
            <style>
                {`
        .settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(20, 20, 20, 0.4); /* semi-transparent backdrop */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Ensure it's above all */
  backdrop-filter: blur(4px); /* optional: add blur behind */
}

.settings-panel {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  max-width: 650px;
  width: 90%;
  max-height: 630px;
  min-height:0px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
*{
scrollbar-width: thin;
overflow: auto;
scrollbar-color: #9f9f9f #e1e1e1;
}
`}
            </style>

            <div className="settings-overlay">
                <div className="settings-panel df fd-r" tabIndex="-1">
                    <div className="seting_navs df fd-c gap btns-layout bdr bdn pd0 oh">
                        <div className="py-3 ps-2.5 max-md:hidden">
                            <button data-testid="close-button" className="" aria-label="Close" onClickCapture={() => onClose()}><i className="material-symbols-outlined">close</i></button>
                        </div>
                        <header className="fx1">
                            <div className="df wfc aic">
                                <div className="df wfc grow fd-c">
                                    <div className="oy df fd-r jcsb aifs"><div dir="ltr" className="df fd-r">
                                        <div role="tablist" className="mgr gap" tabIndex="0">
                                            <div className='df fd-c gap'>
                                                <button type="button" role="tab" tabIndex="0" className=" __menu_items hoverable gap" >
                                                    <div className="material-symbols-outlined">tune</div>
                                                    <div className="df grow aic gap _2">
                                                        <div className="truncate">General</div>
                                                    </div>
                                                </button>
                                                <button type="button" role="tab" tabIndex="0" className=" __menu_items hoverable gap" >
                                                    <div className="material-symbols-outlined">palette</div>
                                                    <div className="df grow aic gap _2">
                                                        <div className="truncate">Appearance</div>
                                                    </div>
                                                </button>
                                                <button type="button" role="tab" tabIndex="0" className=" __menu_items hoverable gap" >
                                                    <div className="material-symbols-outlined">data_object</div>
                                                    <div className="df grow aic gap _2">
                                                        <div className="truncate">Data Controls</div>
                                                    </div>
                                                </button>
                                                <button type="button" role="tab" tabIndex="0" className=" __menu_items hoverable gap" >
                                                    <div className="material-symbols-outlined">hub</div>
                                                    <div className="df grow aic gap _2">
                                                        <div className="truncate">Hierarchy</div>
                                                    </div>
                                                </button>
                                                <button type="button" role="tab" tabIndex="0" className=" __menu_items hoverable gap" >
                                                    <div className="material-symbols-outlined">backup</div>
                                                    <div className="df grow aic gap _2">
                                                        <div className="truncate">Backups</div>
                                                    </div>
                                                </button>
                                                <button type="button" role="tab" tabIndex="0" className=" __menu_items hoverable gap" >
                                                    <div className="material-symbols-outlined">account_circle</div>
                                                    <div className="df grow aic gap _2">
                                                        <div className="truncate">Account</div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>
                    <div className='intractor mgl wfp fx1'>
                        hi
                    </div>
                </div>


            </div>

        </>

    )
}
