import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
    Airplay,
    BabyIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CloudLightning,
    Heater,
    Images,
    ShirtIcon,
    ShoppingBasket,
    UmbrellaIcon,
    WashingMachine,
    WatchIcon,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";

const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },

];

const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: ShoppingBasket },
    { id: "adidas", label: "Adidas", icon: WashingMachine },
    { id: "puma", label: "Puma", icon: Airplay },
    { id: "levi", label: "Levi's", icon: Images },
    { id: "zara", label: "Zara", icon: Heater },
];

function ShoppingHome() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { productList, productDetails } = useSelector((state) => state.shopProducts);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const slides = [bannerOne, bannerTwo, bannerThree];
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    function handleNavigateToListingPage(getCurrentItem, section) {
        sessionStorage.removeItem("filters");
        const currentFilter = { [section]: [getCurrentItem.id] };
        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
        navigate(`/shop/listing`);
    }

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId));
    }

    function handleAddToCart(getCurrentProductId) {
        if (!user) {
            navigate("/auth/login");
            return;
        }
        dispatch(
            addToCart({
                userId: user?.id,
                productId: getCurrentProductId,
                quantity: 1,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast({ title: "Product is added to cart" });
            }
        });
    }

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3500);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
    }, [dispatch]);

    return (
        <div className="flex flex-col min-h-screen">

            <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] overflow-hidden">
                {slides.map((slide, index) => (
                    <img
                        src={slide}
                        key={index}
                        className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                        alt={`Slide ${index + 1}`}
                    />
                ))}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
                    }
                    className="absolute p-2 transform -translate-y-1/2 rounded-full top-1/2 left-4 bg-white/80"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
                    }
                    className="absolute p-2 transform -translate-y-1/2 rounded-full top-1/2 right-4 bg-white/80"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </Button>
            </div>
            <section className="py-12 bg-gray-50">
                <div className="container px-4 mx-auto">
                    <h2 className="mb-8 text-3xl font-bold text-center">Shop by Category</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                        {categoriesWithIcon.map((categoryItem) => (
                            <Card
                                key={categoryItem.id}
                                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                                className="transition-shadow cursor-pointer hover:shadow-lg"
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                                    <span className="font-bold">{categoryItem.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>


            <section className="py-12">
                <div className="container px-4 mx-auto">
                    <h2 className="mb-8 text-3xl font-bold text-center">Featured Products</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {productList &&
                            productList.map((productItem) => (
                                <ShoppingProductTile
                                    key={productItem.id}
                                    handleGetProductDetails={handleGetProductDetails}
                                    product={productItem}
                                    handleAddToCart={handleAddToCart}
                                />
                            ))}
                    </div>
                </div>
            </section>

            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
    );
}

export default ShoppingHome;
