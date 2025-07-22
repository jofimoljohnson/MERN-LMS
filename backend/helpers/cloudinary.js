import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "dyb5dferg",
    api_key: "189331838555833",
    api_secret: "3t8ay8yVMcFAIv0Ef731aA1ckbc",
      timeout: 60000,
});

export const uploadMediaToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
        });
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error uploading to cloudinary");
    }
};

export const deleteMediaFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete asset from  cloudinary");
    }
};
