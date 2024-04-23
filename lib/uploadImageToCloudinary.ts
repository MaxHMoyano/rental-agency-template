import axios, { AxiosProgressEvent } from "axios";

export const uploadImageToCloudinary = async (
  formData: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
) => {
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string,
  );
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData,
    {
      onUploadProgress,
    },
  );

  return response;
};
