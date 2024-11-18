import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { FaEye } from "react-icons/fa";
function ShoppingProductTile({ product, handleGetProductDetails }) {
    return (
        <Card className="w-full max-w-sm mx-auto">
            <div className="relative group" onClick={() => handleGetProductDetails(product?._id)}>
                <img
                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                />
                {product?.salePrice > 0 && (
                    <Badge className="absolute bg-red-600 top-2 left-2 hover:bg-red-700">Sale</Badge>
                )}
                <div
                    className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/50 group-hover:opacity-100"
                >
                    <div className="flex items-center">
                        <span className="w-8 h-[2px] bg-white block mr-2"></span>
                        <FaEye className="text-3xl text-white" />
                        <span className="w-8 h-[2px] bg-white block ml-2"></span>
                    </div>
                </div>
            </div>
            <CardContent className="p-4">
                <h2 className="mb-2 text-xl font-bold">{product?.title.toUpperCase()}</h2>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{product?.category.toUpperCase()}</span>
                    <span className="text-sm text-muted-foreground">{product?.brand.toUpperCase()}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <span
                        className={`${product?.salePrice > 0 ? "line-through" : ""
                            } text-lg font-semibold text-primary`}
                    >
                        ${product?.price}
                    </span>
                    {product?.salePrice > 0 && (
                        <span className="text-lg font-semibold text-primary">${product?.salePrice}</span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default ShoppingProductTile;
