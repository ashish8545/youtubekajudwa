import React from 'react'

const SidebarMenuItem = (props) => {
    const { itemName, CustomIconComponent } = props;
    return (
        <div className={"flex flex-row items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer"}>
            <CustomIconComponent className="text-xl"/>
            <span className="text-sm pl-4">
                {itemName}
            </span>
        </div>
    )
}

export default SidebarMenuItem