import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";

function ProductImageUpload({ imageFile, setImageFile, uploadedImage, setUploadedImage, setImageLoadingState, imageLoadingState, isEditMode }) {

    const inputRef = useRef(null);


    function handleImageFileChange(event) {
        setImageLoadingState(true)
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0];
        console.log(selectedFile);
        if (selectedFile) setImageFile(selectedFile)
    }
    function handleDragOver(event) {
        event.preventDefault();
    }
    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) setImageFile(droppedFile);
    }
    function handleRemoveImage() {
        setImageFile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }
    async function uploadImageToCloudinary() {
        console.log('called');
        const data = new FormData();
        data.append("my_file", imageFile);
        const response = await axios.post(
            `${process.env.VITE_API_URL}/api/admin/products/upload-image`,
            data,

        );
        console.log(response, "response");

        if (response?.data?.success) {
            setUploadedImage(response.data.result.url);
            setImageLoadingState(false)
        }
    }

    useEffect(() => {
        if (imageFile !== null) uploadImageToCloudinary();
    }, [imageFile]);

    return (
        <div className="w-full max-w-md mx-auto mt-4">
            <Label className="block mb-2 text-lg font-semibold">Upload Image</Label>


            <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode ? "opacity-60" : ''}        p-4 border-2 border-dashed rounded-lg`}>


                <Input type="file" id="image-upload" disabled={isEditMode} className="hidden" ref={inputRef} onChange={handleImageFileChange} />

                {
                    !imageFile ?
                        (<Label htmlFor="image-upload" className={`${isEditMode ? "cursor-not-allowed" : ""
                            } flex flex-col items-center justify-center h-32 cursor-pointer`}>
                            <UploadCloudIcon className="w-10 h-10 mb-2 text-muted-foreground" />
                            <span>Drag & drop or click to upload image</span>
                        </Label>) :

                        (<div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FileIcon className="w-8 h-8 mr-2 text-primary" />
                            </div>
                            <p className="text-sm font-medium">{imageFile.name}</p>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground " onClick={handleRemoveImage}>
                                <XIcon className="w-4 h-4" />
                                <span className="sr-only">Remove File</span>
                            </Button>
                        </div>)
                }
            </div>
        </div>
    );
}

export default ProductImageUpload;