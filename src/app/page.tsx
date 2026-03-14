"use client";

import Sidebar from "@/components/Sidebar";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Topbar from "@/components/Topbar";
import ChatComponent from "@/components/ChatComponent";

export default function Home() {

    const [toggleSide, setToggleSide] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (toggleSide && !e.target.closest(".sidebar") && !e.target.closest(".menubar-top")) {
                setToggleSide(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [toggleSide]);


    return (
        <div className='main-container'>
            <div className='left-section'>
                <Sidebar toggleSide={toggleSide} setToggleSide={setToggleSide} />
            </div>
            <div className='right-section'>
                <Topbar setToggleSide={setToggleSide} toggleSide={toggleSide} />
                <div className='content-container'>
                    <ChatComponent />
                </div>
                {toggleSide && <div className='overlay'></div>}
            </div>

        </div>
    )
}
