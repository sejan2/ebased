import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";

const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    totalStock: ''

}



import { Fragment, useEffect, useState } from "react";
import ProductImageUpload from "./image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, editProduct, fetchAllProduct } from "@/store/admin/product-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";


function AdminProducts() {
    const [openCreateProductsDialog, setOpenCreateProductDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const { toast } = useToast();
    const { productList } = useSelector(state => state.adminProducts);
    const [currentEditedId, setCurrentEditedId] = useState(null)




    const dispatch = useDispatch();


    function onSubmit(event) {
        event.preventDefault();
        currentEditedId !== null ?
            dispatch(editProduct({
                id: currentEditedId, formData
            })).then((data) => {
                console.log(data);
                if (data?.payload?.success) {
                    dispatch(fetchAllProduct());
                    setOpenCreateProductDialog(false);

                    setFormData(initialFormData);
                    toast({
                        title: "Product edit successfully",
                    });
                }
            })


            : dispatch(addNewProduct({
                ...formData,
                image: uploadedImage
            })).then((data) => {

                if (data?.payload?.success) {

                    dispatch(fetchAllProduct());
                    setOpenCreateProductDialog(false);
                    setImageFile(null);
                    setFormData(initialFormData);
                    toast({
                        title: "Product add successfully",
                    });
                }
            });
    }
    useEffect(() => {
        dispatch(fetchAllProduct())
    }, [dispatch])

    function handleDelete(getCurrentProductId) {
        console.log(getCurrentProductId);
        dispatch(deleteProduct(getCurrentProductId)).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchAllProduct())
            }
        })
    }


    function isFormValid() {
        return Object.keys(formData)

            .map((key) => formData[key] !== "")
            .every((item) => item);
    }







    return (
        <Fragment>
            <div className="flex justify-end w-full mb-5">
                <Button onClick={() => {
                    setOpenCreateProductDialog(true)
                }

                }

                >
                    Add New Product
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {
                    productList && productList.length > 0 ?
                        productList.map(productItem => <AdminProductTile key={productItem?._id} setFormData={setFormData}
                            handleDelete={handleDelete}
                            setOpenCreateProductDialog={setOpenCreateProductDialog} product={productItem} setCurrentEditedId={setCurrentEditedId} />) : null
                }
            </div>
            <Sheet
                open={openCreateProductsDialog}
                onOpenChange={() => {
                    setOpenCreateProductDialog(false);
                    setCurrentEditedId(null)
                    setFormData(initialFormData)
                }}
            >
                <SheetContent side="right" className="overflow-auto">

                    <SheetHeader>
                        <SheetTitle>
                            {currentEditedId !== null ? 'Edit Product' : 'Add new Product'}
                        </SheetTitle>

                    </SheetHeader>
                    <ProductImageUpload currentEditedId={currentEditedId} imageFile={imageFile} setImageFile={setImageFile} uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} setImageLoadingState={setImageLoadingState}
                        isEditMode={currentEditedId !== null} />

                    <div className="py-6">
                        <CommonForm
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={currentEditedId !== null ? 'Edit Product' : 'Add new Product'}
                            formControls={addProductFormElements}
                            isBtnDisabled={!isFormValid()}
                        />
                    </div>
                </SheetContent>
            </Sheet>


        </Fragment>
    );
}

export default AdminProducts;