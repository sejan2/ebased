import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "@/pages/shopping-view/footer";


function ShoppingViewLayout() {
    return (
        <div className="flex flex-col overflow-hidden bg-white">
            <ShoppingHeader />
            <main className="flex flex-col w-full ">
                <Outlet></Outlet>
            </main>
            <Footer />
        </div>
    );
}

export default ShoppingViewLayout;