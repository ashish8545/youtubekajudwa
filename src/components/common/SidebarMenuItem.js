import React from 'react'

const SidebarMenuItem = (props) => {
    const { itemName, CustomIconComponent, isMenuOpen = true } = props;
    return (
        <div className={"flex ml-2 py-2 pr-2 rounded-lg hover:bg-gray-200 cursor-pointer w-11/12 " + (isMenuOpen ? "flex-row items-center" : "flex-col items-center mb-3")}>
            <div className="pl-4 pr-5">
                <CustomIconComponent className={isMenuOpen ? "text-2xl" : "text-2xl"} />
            </div>
            <span className={isMenuOpen ? "text-sm": "text-[10px] text-center mt-2"}>
                {itemName}
            </span>
        </div>
    )
}

export default SidebarMenuItem