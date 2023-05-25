import React, { useMemo } from "react";

interface MobileMenuProps {
    visible?: boolean
}

const MobileMenu: React .FC<MobileMenuProps> = ({
    visible
}) => {

    const menuDatas = useMemo(() => ([
        {
            label: 'Home'
        },
        {
            label: 'Series'
        },
        {
            label: 'Films'
        },
        {
            label: 'New & Popular'
        },
        {
            label: 'My List'
        },
        {
            label: 'Browse by languages'
        },
    ]), [])

    if (!visible) {
        return null
    }

    return (
        <div className="
            bg-black 
            w-56 
            absolute 
            top-8
            left-0
            py-5
            flex-col
            border-2
            border-gary-800
            flex
        ">
            <div
                className="flex flex-col gap-4"
            >
                {menuDatas.map((menu) => <div key={menu.label} className="px-3 text-center text-white hover:underline">{menu.label}</div>)}
            </div>
        </div>
    );
}
 
export default MobileMenu;