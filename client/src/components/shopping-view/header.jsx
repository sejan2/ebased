import { House, LogOut, LogOutIcon, ShoppingCart, SquareChevronDown, User, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetTrigger, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuItem } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import { useEffect, useState } from "react";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";



function MenuItems() {
    return <nav className="flex flex-col gap-6 mb-3 lg:mb-0 lg:items-center lg:flex-row">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
            <Link to={menuItem.path}
                onClick={() => handleNavigate(menuItem)}
                className="text-sm font-medium cursor-pointer"
                key={menuItem.id}
            >
                {menuItem.label}
            </Link>
        ))}
    </nav>
}
function HeaderRightContent() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector(state => state.shopCart)
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    function handleLogout() {
        // dispatch(logoutUser())
        dispatch(resetTokenAndCredentials())
        sessionStorage.clear();
        navigate("/auth/login")
    }

    useEffect(() => {
        dispatch(fetchCartItems(user?.id))
    }, [dispatch])



    return <div className="flex justify-center gap-4 lg:items-center lg:flex-row">
        <Sheet open={openCartSheet} onOpenChange={() => {
            setOpenCartSheet(false)
        }}>
            <Button onClick={() => setOpenCartSheet(true)} variant="outline" size="icon" >
                <ShoppingCart className="w-6 h-6 text-rose-950" />
                <span className="sr-only">User Cart</span>
            </Button>
            <UserCartWrapper cartItems={cartItems && cartItems?.items && cartItems?.items.length > 0 ? cartItems?.items : []} />
        </Sheet>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {
                    isAuthenticated ? <Avatar className="bg-black">
                        <AvatarFallback className="font-extrabold text-white bg-black ">{user?.userName[0].toUpperCase()}</AvatarFallback>
                    </Avatar> : <User />
                }
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56">
                <DropdownMenuLabel>Logged in as  {user?.userName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/shop/account')}>
                    <UserCog className="w-4 h-4 mr-2" />
                    Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    {
                        isAuthenticated ? <div className="flex gap-3"><LogOut className="w-4 h-4 mr-2" />
                            Logout</div> : <div className="flex gap-3"><LogOutIcon /> Login</div>
                    }
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}


function ShoppingHeader() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    console.log(user);

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex items-center justify-between h-16 px-4 md:6">
                <Link to="/shop/home" className="flex items-center gap-2">
                    <House className="w-6 h-6" />
                    <span className="font-bold">E-Commerce</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild >
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <SquareChevronDown className="w-6 h-6" />
                            <span className="sr-only">Toggle header Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full max-w-xs">
                        <HeaderRightContent />
                        <MenuItems />



                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems />
                </div>

                <div className="hidden lg:block"><HeaderRightContent /></div>

            </div>
        </header>
    );
}

export default ShoppingHeader;