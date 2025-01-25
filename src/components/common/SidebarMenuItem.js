import React from 'react'

const SidebarMenuItem = (props) => {
    const { itemName, CustomIconComponent, isMenuOpen = true } = props;
    return (
        <div className={"flex p-2 rounded-lg hover:bg-gray-200 cursor-pointer " + (isMenuOpen ? "flex-row items-center" : "flex-col items-center mb-3")}>
            <div className="px-5">
                <CustomIconComponent className={isMenuOpen ? "text-2xl" : "text-2xl"} />
            </div>
            <span className={isMenuOpen ? "text-sm": "text-[10px] text-center mt-2"}>
                {itemName}
            </span>
        </div>
    )
}

export default SidebarMenuItem