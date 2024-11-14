import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"

import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
// import ProductDetailsDialog from "../admin-view/product-details";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";


function ShoppingListing() {
    const dispatch = useDispatch();
    const { productList, productDetails } = useSelector(state => state.shopProducts);
    const { user } = useSelector(state => state.auth);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const { toast } = useToast();


    const [searchParams, setSearchParams] = useSearchParams();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

    function createSearchParamsHelper(filterParams) {
        const queryParams = [];

        for (const [key, value] of Object.entries(filterParams)) {
            if (Array.isArray(value) && value.length > 0) {
                const paramValue = value.join(",");

                queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
            }
        }

        console.log(queryParams, "queryParams");

        return queryParams.join("&");
    }


    function handleSort(value) {

        setSort(value)
    }

    function handleFilter(getSectionId, getCurrentOption) {
        console.log(getSectionId, getCurrentOption);
        let cpyFilters = { ...filters };

        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId)
        console.log(indexOfCurrentSection);


        if ((indexOfCurrentSection) === -1) {
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption]
            }
        } else {
            const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);

            console.log(indexOfCurrentOption)
            if ((indexOfCurrentOption) === -1) {
                cpyFilters[getSectionId].push(getCurrentOption)
            }
            else {
                cpyFilters[getSectionId].splice(indexOfCurrentOption, 1)
            }
        }
        console.log(cpyFilters, 'cpy')
        setFilters(cpyFilters)
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    }

    //
    function handleGetProductDetails(getCurrentProductId) {
        console.log(getCurrentProductId);
        dispatch(fetchProductDetails(getCurrentProductId));
    }


    function handleAddToCart(getCurrentProductId) {
        console.log(getCurrentProductId);
        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id))
                toast({
                    title: "product add to cart successfully"
                })

            }
        })
    }

    useEffect(() => {


        if (filters && Object.keys(filters).length > 0) {
            const createQueryString = createSearchParamsHelper(filters);
            console.log("Generated query string:", createQueryString);
            setSearchParams(new URLSearchParams(createQueryString));
        }
    }, [filters]);

    useEffect(() => {

        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
    }, []);




    useEffect(() => {
        if (filters !== null && sort !== null)
            dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }))
    }, [dispatch, sort, filters]);


    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

    // console.log(cartItems, "productListproductListproductList");







    return (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 ">

            <ProductFilter filters={filters} handleFilter={handleFilter} />

            <div className="w-full rounded-lg shadow-sm bg-background">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-extrabold">All Products</h2>
                    <div className="flex items-center gap-4"><span className="text-muted-foreground">{productList?.length}</span>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant as="outline" size="sm" className="flex items-center gap-1">
                                    <ArrowUpDownIcon className="w-4 h-4" />
                                    <span>sort by</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                    {sortOptions.map((sortItem) => (
                                        <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-col-4">
                    {productList && productList.length > 0
                        ? productList.map((productItem) => (
                            <ShoppingProductTile
                                handleGetProductDetails={handleGetProductDetails}
                                product={productItem}
                                handleAddToCart={handleAddToCart}
                            />
                        ))
                        : null}
                </div>
            </div>
            <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
        </div>
    );
}

export default ShoppingListing;