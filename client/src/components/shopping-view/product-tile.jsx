
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";


function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {

    return (
        <Card className="w-full max-w-sm mx-auto">
            <div onClick={() => handleGetProductDetails(product?._id)}>
                <div className="relative">
                    <img src={product?.image} alt={product?.title} className="w-full h-[300px] object-cover rounded-t-lg" />
                    {
                        product?.salePrice > 0 ?
                            <Badge className="absolute bg-red-600 top-2 left-2 hover:bg-red-700">Sale</Badge> : null
                    }
                </div>
                <CardContent className="p-4">
                    <h2 className="mb-2 text-xl font-bold">{product?.title.toUpperCase()}</h2>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">{product?.category.toUpperCase()}</span>
                        <span className="text-sm text-muted-foreground">{product?.brand.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ''}
                        text-lg font-semibold text-primary`}>${product?.price}</span>
                        {
                            product?.salePrice > 0 ? (
                                <span className="text-lg font-semibold text-primary">${product?.salePrice}</span>
                            ) :
                                null
                        }
                    </div>

                </CardContent>

            </div>
            <CardFooter>
                <Button onClick={() => handleAddtoCart(product?._id)} className="w-full">
                    Add to cart
                </Button>

            </CardFooter>
        </Card>

    );
}

export default ShoppingProductTile;