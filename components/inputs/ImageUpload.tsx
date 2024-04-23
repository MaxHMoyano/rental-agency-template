"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ImageUp, ImageDown } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";
import { AxiosProgressEvent } from "axios";
import { Progress } from "@/components/ui/progress";

interface ImageUploadProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    const percentage = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total ?? 1),
    );
    setProgress(percentage);
  };

  const handleImageUpload = useCallback(async (image: File) => {
    if (!image) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", image);

      const res = await uploadImageToCloudinary(formData, onUploadProgress);
      if (res.status === 200) {
        setLoading(false);
      }
      return res.data.secure_url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // Do something with the files
      const response = await handleImageUpload(acceptedFiles[0]);
      onChange(response);
    },
    [handleImageUpload, onChange],
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="p-2 flex flex-col w-full relative">
      {!value && !loading && (
        <label className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 text-neutral-500 hover:text-neutral-600 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="text-center">
            <div className=" p-2 rounded-md max-w-min mx-auto">
              <ImageUp size={50} />
            </div>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Drag an image</span>
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-400">
              Click to upload &#40; PNG, JPG, JPEG &#41;
            </p>
          </div>
        </label>
      )}
      {loading && (
        <div className="text-center max-w-md flex flex-col gap-5">
          <Progress value={progress} />
          <div>
            <p className="text-sm font-semibold">Uploading Picture</p>
            <p className="text-xs text-gray-400">
              Do not refresh or perform any other action while the picture is
              being upload
            </p>
          </div>
        </div>
      )}
      {value && !loading && (
        <div className="flex-1">
          <Image
            width={500}
            height={300}
            className="rounded-md w-full h-full"
            src={value}
            style={{ objectFit: "cover" }}
            alt="Property image"
          />
        </div>
      )}

      <Input
        {...getInputProps()}
        id="dropzone-file"
        accept="image/png, image/jpeg"
        type="file"
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
