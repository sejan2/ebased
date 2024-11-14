import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { StarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

// import { setProductDetails } from "@/store/shop/products-slice";



function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const { toast } = useToast();
    const { cartItems } = useSelector((state) => state.shopCart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    function handleAddToCart(getCurrentProductId, getTotalStock) {
        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(
                (item) => item.productId === getCurrentProductId
            );
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast({
                        title: `Only ${getQuantity} quantity can be added for this item`,
                        variant: "destructive",
                    });

                    return;
                }
            }
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
                toast({
                    title: "Product is added to cart",
                });
            }
        });
    }

    function handleDialogClose() {
        setOpen(false);
        dispatch(setProductDetails());

    }
    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={600}
                        height={600}
                        className="object-cover w-full aspect-square"
                    />
                </div>
                <div className="">
                    <div>
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="mt-4 mb-5 text-2xl text-muted-foreground">
                            {productDetails?.description}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p
                            className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""
                                }`}
                        >
                            ${productDetails?.price}
                        </p>
                        {productDetails?.salePrice > 0 ? (
                            <p className="text-2xl font-bold text-muted-foreground">
                                ${productDetails?.salePrice}
                            </p>
                        ) : null}
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <div className="flex items-center gap-0 5">
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                        </div>
                        <span className="">{4.5}</span>
                    </div>
                    <div className="mt-5 mb-5">
                        {productDetails?.totalStock === 0 ? (
                            <Button className="w-full cursor-not-allowed opacity-60">
                                Out of Stock
                            </Button>
                        ) : (
                            <Button
                                className="w-full"
                                onClick={() =>
                                    handleAddToCart(
                                        productDetails?._id,
                                        productDetails?.totalStock
                                    )
                                }
                            >
                                Add to Cart
                            </Button>
                        )}
                    </div>
                    <Separator />
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className="mb-4 text-xl font-bold">Reviews</h2>
                        <div className="grid gap-6">
                            <div className="flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>RA</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold"> Rakib </h3>
                                    </div>
                                    <div className="flex items-center gap-0 5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    <p className="text-muted-foreground">This is awesome</p>
                                </div>


                            </div>
                            <div className="flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>RA</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold"> Rakib </h3>
                                    </div>
                                    <div className="flex items-center gap-0 5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    <p className="text-muted-foreground">This is awesome</p>
                                </div>


                            </div>
                            <div className="flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>RA</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold"> Rakib </h3>
                                    </div>
                                    <div className="flex items-center gap-0 5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    <p className="text-muted-foreground">This is awesome</p>
                                </div>


                            </div>
                        </div>
                        <div className="flex gap-2 mt-6">
                            <Input className="" placeholder=" Write A Review" />
                            <Button>Submit</Button>
                        </div>
                    </div>

                </div>



            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;