import { useCallback, useEffect, useMemo, useState } from 'react';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs'
import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';

const TOP_OFFSET = 66;

const NavBar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showBackground, setShowBackground] = useState(false)

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((value) => !value)
    }, [])

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((value) => !value)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

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

    const iconMenus = useMemo(() => ([
        {
            icon: <BsSearch />
        },
        {
            icon: <BsBell />
        }
    ]), [])

    return (
        <nav 
            className="w-full fixed z-40"
        >
            <div
                className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}
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
                    onClick={toggleMobileMenu}
                    className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'
                >
                    <p className='text-white text-sm'>Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div
                    className='flex flex-row ml-auto gap-7 items-center'
                >
                    {iconMenus.map((item, index) => (
                        <div
                            key={`icon_${String(index)}`}
                            className='text-gray-200 hover:text-gray-300 cursor-pointer'
                        >
                            {item.icon}
                        </div>
                    ))}

                    <div
                        onClick={toggleAccountMenu}
                        className='
                            flex
                            flex-row
                            items-center
                            gap-2
                            cursor-pointer
                            relative
                        '
                    >
                        <div
                            className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'
                        >
                            <img src="/images/default-blue.png" alt="" />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    );
}
 
export default NavBar;