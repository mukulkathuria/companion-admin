import { BASEURL } from "@/Constants/services.constants";
import { ImageDto } from "@/data/dto/companion.data.dto";
import { useState } from "react";
import { toast } from "sonner";

interface ImageUploaderProps {
  images: ImageDto[] | string[] | (ImageDto | string)[] | null; // Array of images with a specific structure
  onUpload: (
    updatedImages: ImageDto[] | (ImageDto | string)[] | string[]
  ) => void; // Callback to handle image updates
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, onUpload }) => {
  const [localImages, setLocalImages] = useState<
    ImageDto[] | string[] | (ImageDto | string)[] | null
  >(images);
  const maxImages = 4;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (localImages) {
      if (localImages.length + files.length > maxImages) {
        alert(`You can only upload up to ${maxImages} images.`);
        return;
      }
    }
    const validTypes = ["image/jpeg", "image/png"];
    // validate files
    for (let i = 0; i < files.length; i += 1) {
      if (
        !validTypes.includes(files[i].type) ||
        files[i].size > 2 * 1024 * 1024
      ) {
        toast.error("Invalid Image");
        return;
      }
    }
    const newImages: ImageDto[] = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
      isMain:
        localImages && localImages.length === 0 && files.length === 1
          ? true
          : false,
    }));
    let updatedImages = [];
    if (localImages) {
      updatedImages = [...localImages, ...newImages];
    } else {
      updatedImages = [...newImages];
    }
    setLocalImages(updatedImages);
    onUpload(updatedImages);
  };

  const handleRemoveImage = (index: number) => {
    if (localImages) {
      const updatedImages = localImages.filter((_, i) => i !== index);
      setLocalImages(updatedImages);
      onUpload(updatedImages);
    }
  };

  const setMainImage = (index: number) => {
    if (localImages) {
      const updatedImages = localImages.map((img, i) => {
        if (typeof img === "object") {
          return {
            ...img,
            isMain: i === index,
          };
        }
        return img;
      });
      setLocalImages(updatedImages);
      onUpload(updatedImages);
    }
  };

  return (
    <div className="image-uploader">
      {localImages &&
        localImages.map((img, index) => (
          <div key={index} className="image-container">
            <img
              src={typeof img === "object" ? img.url :  img}
              alt={`Uploaded ${index + 1}`}
              className="uploaded-image"
            />
            {typeof img === "object" && img.isMain ? (
              <span className="main-label">Main</span>
            ) : (
              <span className="index-label" onClick={() => setMainImage(index)}>
                {index + 1}
              </span>
            )}
            <button
              className="remove-button"
              onClick={() => handleRemoveImage(index)}
            >
              &times;
            </button>
          </div>
        ))}
      {(localImages && localImages.length < maxImages) || !localImages ? (
        <label className="add-image">
          <input
            type="file"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            accept=".jpg, .jpeg, .png"
          />
          <span>+</span>
        </label>
      ) : null}
    </div>
  );
};

export default ImageUploader;
