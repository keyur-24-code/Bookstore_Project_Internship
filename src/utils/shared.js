import { Role } from "./enum";
import cartService from "../service/cartService";

const addToCart = async(book,id)=>{
    return cartService.add({
        userId: id,
        bookId: book.id,
        quantity:1,
    }).then((res)=>{
        return {error: false, message: "Item added in cart"}
    }).catch((e)=>{
        
    })
}

const messages = {
    USER_DELETE: "are you sure you want to delete the user?",
    UPDATED_SUCCESS: "Record updated successfully",
    UPDATED_FAIL: "Record cannot be updated",
    DELETE_SUCCESS: "Record deleted successfully",
    DELETE_FAIL: "Record cannot be deleted",
    ORDER_SUCCESS: "Your order is successfully placed",
}

const LocalStorageKeys = {
    USER: "user",
};

const NavigationItems = [
{
    name:'User',
    route:"/user",
    access: [Role.Admin, Role.Seller],
},
{
    name: "Category",
    route: "/category",
    access: [Role.Admin, Role.Seller],
},
{
    name:'Book',
    route: "/book",
    access: [Role.Admin, Role.Seller],
},
{
    name: "Update Profile",
    route: '/update-profile',
    access: [Role.Admin, Role.Seller, Role.Buyer],
},
]

const hasAccess = (pathname, user) =>{
    const navItem = NavigationItems.find((navItem)=>
    pathname.includes(navItem.route)
    );
    if(navItem){
        return (
            !navItem.access ||
            !!(navItem.access && navItem.access.includes(user.roleId))
        )
    }
    return true;
}

export default {
    hasAccess,
    addToCart,
    NavigationItems,
    LocalStorageKeys,
    messages,
}
