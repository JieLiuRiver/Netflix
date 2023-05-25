import { useMemo } from 'react';
import NavbarItem from './NavbarItem';

const NavBar = () => {
    const navbarDatas = useMemo(() => ([
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

    return (
        <nav 
            className="w-full fixed z-40"
        >
            <div
                className="
                    px-4
                    md:px-16
                    py-6
                    flex
                    flex-row
                    items-center
                    transition
                    duration-500
                    bg-zinc-900
                    bg-opaicy-90
                "
            >
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />
                <div
                    className="
                        flex-row
                        ml-8
                        gap-7
                        hidden
                        lg:flex
                    "
                >
                    {navbarDatas.map((item) => (
                        <NavbarItem key={item.label} label={item.label} />
                    ))}
                </div>
                <div
                    className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'
                >
                    <p className='text-white text-sm'>Browse</p>
                </div>
            </div>
        </nav>
    );
}
 
export default NavBar;