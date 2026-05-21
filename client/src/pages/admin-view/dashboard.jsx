import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, ImagePlus, LayoutDashboard } from "lucide-react";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { toast } = useToast();

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) {
      toast({ title: "Please upload an image first", variant: "destructive" });
      return;
    }
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        toast({ title: "Banner image added successfully!" });
      }
    });
  }

  function handleDeleteFeatureImage(id) {
    setDeletingId(id);
    dispatch(deleteFeatureImage(id)).then((data) => {
      setDeletingId(null);
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        toast({ title: "Banner image deleted successfully!" });
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary rounded-lg">
          <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your homepage banner images</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-background border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ImagePlus className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Upload New Banner</h2>
        </div>
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />
        <Button
          onClick={handleUploadFeatureImage}
          className="mt-4 w-full"
          disabled={!uploadedImageUrl || imageLoadingState}
        >
          {imageLoadingState ? "Uploading..." : "Add to Banner"}
        </Button>
      </div>

      {/* Banner Images Grid */}
      <div className="bg-background border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Current Banner Images</h2>
          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {featureImageList?.length || 0} images
          </span>
        </div>

        {featureImageList && featureImageList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureImageList.map((featureImgItem, index) => (
              <div
                key={featureImgItem._id}
                className="group relative rounded-xl overflow-hidden border bg-muted"
              >
                <img
                  src={featureImgItem.image}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                      disabled={deletingId === featureImgItem._id}
                      className="flex items-center gap-1 shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                      {deletingId === featureImgItem._id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
                {/* Index Badge */}
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  Banner {index + 1}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <ImagePlus className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No banner images yet</p>
            <p className="text-sm">Upload your first banner image above</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
