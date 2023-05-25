import { signOut } from "next-auth/react";
import React, { useMemo } from "react";

interface AccountMenuProps {
    visible?: boolean
}

const AccountMenu: React.FC<AccountMenuProps> = ({
    visible
}) => {

    const accountList = useMemo(() => ([
        {
            avatar: <img className="w-8 rounded-md" src="/images/default-blue.png" alt="" />,
            name: 'UserName'
        },
    ]), [])

    if (!visible) {
        return null
    }

    return (
        <div className="
            bg-black w-56 absolute top-14 right-0 py-5 flex-col
            border-2 border-gray-800 flex
        ">
            <div
                className="flex flex-col gap3"
            >
                {accountList.map((item) => (
                    <div
                        key={item.name}
                        className="px-3 group/item flex flex-row gap-3 items-center w-full"
                    >
                        {item.avatar}
                        <p className="text-white text-sm group-hover/item:underline">{item.name}</p>
                    </div>
                ))}
                <hr className="bg-gray-600 border-0 h-px my-4" />
                <div
                    onClick={() => signOut()}
                    className="px-3 text-center text-white text-sm hover:underline"
                >
                    Sign out of Netflix
                </div>
            </div>
        </div>
    );
}
 
export default AccountMenu;