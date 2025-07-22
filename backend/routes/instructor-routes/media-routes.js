import express from "express";
import multer from "multer";
import { uploadMediaToCloudinary, deleteMediaFromCloudinary } from "../../helpers/cloudinary.js";
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post(
    "/upload",
    upload.single("file"), // Correct usage
    async (req, res) => {
        try {
            const result = await uploadMediaToCloudinary(req.file.path);
            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error uploading files" });
        }
    }
);

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Asset Id is required",
            });
        }
        await deleteMediaFromCloudinary(id);
        res.status(200).json({
            success: true,
            message: "Asset deleted successfully from cloudinary",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error deleting files" });
    }
});

router.post("/bulk-upload", upload.array("files", 10), async (req, res) => {
    try {
        const uploadPromises = req.files.map((fileItem) => uploadMediaToCloudinary(fileItem.path));
        const results = await Promise.all(uploadPromises);
        res.status(200).json({
            success: true,
            data:results
        });
    } catch (event) {
        console.log(event);
        res.status(500).json({ success: false, message: "Error in bulk upload" });
    }
});

export default router;
