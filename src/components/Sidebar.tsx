"use client"

import Link from "next/link";
import { useState } from "react";
import '@/styles/sidebar.css'
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiChat, BiHomeAlt, BiPen } from "react-icons/bi";
import { CgFormatBold } from "react-icons/cg";
import { BsChat } from "react-icons/bs";

type SidebarProp = {
    toggleSide: boolean,
    setToggleSide: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ toggleSide, setToggleSide }: SidebarProp) => {
    const [open, setOpen] = useState(false);
    const isActive = usePathname();

    const getActiveClass = (isActive: boolean) =>
        isActive ? 'sidebar-link active' : 'sidebar-link'

    const toggleDropdown = () => {
        setOpen(!open);
    };

    return (
        <div className={`main-sidebar ${toggleSide ? 'open' : 'closed'}`}>
            <div className='sidebar left-sidebar'>

                <div className="side-header">
                    Formiq
                </div>

                <div className="sidebar-links">
                    <ul>
                        <li>
                            <Link href={"/"} className={getActiveClass(isActive === "/")} >
                                <BiPen size={16} className="icon" />
                                Chat
                            </Link>
                        </li>
                        <li>
                            <Link href={"/generate-form"} className={getActiveClass(isActive === "/generate-form")} >
                                <CgFormatBold className="icon" />
                                Generate Form
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='sidebar-bottom'  >
                </div>

            </div>
        </div>
    )
}

export default Sidebar