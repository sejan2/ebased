import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({ product, setOpenCreateProductDialog, setCurrentEditedId, setFormData, currentEditedId, handleDelete }) {
    return (
        <Card className="w-full max-w-sm mx-auto">
            <div>
                <div className="relative">
                    <img className="w-full h-[300px] object-cover rounded-t-lg mt-2" src={product?.image} alt={product?.title} />
                </div>
                <CardContent>
                    <h2 className="mb-2 text-xl font-bold">{product?.title}</h2>
                    <div className="flex items-center justify-between mb-2">
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ''}
                            text-lg font-semibold text-primary`}>${product?.price}</span>
                        {
                            product?.salePrice > 0 ? <span className="text-lg font-bold">${product?.salePrice}</span> : null
                        }
                    </div>

                </CardContent >
                <CardFooter className="flex items-center justify-between">
                    <Button onClick={() => {
                        setCurrentEditedId(product?._id)
                        setOpenCreateProductDialog(true)
                        setFormData(product)
                    }}>Edit</Button>
                    <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
                </CardFooter>
            </div >
        </Card >
    );
}

export default AdminProductTile;