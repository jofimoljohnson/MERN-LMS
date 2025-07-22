import express from "express";
import {
    addNewCourse,
    getAllCourses,
    getCourseDetailsById,
    updateCourseById,
    deleteCourseById,
} from "../../controllers/instructor-controller/course-controller.js";
const router = express.Router();

router.post("/course/add", addNewCourse);
router.get("/course/get", getAllCourses);
router.get("/course/get/details/:id", getCourseDetailsById);
router.put("/course/update/:id", updateCourseById);
router.delete("/course/:id", deleteCourseById);

export default router;
