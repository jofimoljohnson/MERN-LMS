import Course from "../../models/Course.js";

export const addNewCourse = async (req, res) => {
    try {
        const courseData = req.body;
        const newlyCreatedCourse = new Course(courseData);
        const saveCourse = await newlyCreatedCourse.save();
        if (saveCourse) {
            res.status(201).json({
                success: true,
                message: "Course is saved successfully",
                data: saveCourse,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const coursesList = await Course.find({});
        res.status(200).json({
            success: true,
            data: coursesList,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};

export const getCourseDetailsById = async (req, res) => {
    try {
        const { id } = req.params;
        const courseDetails = await Course.findById(id);
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found ",
            });
        }
        res.status(200).json({
            success: true,
            data: courseDetails,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};
export const updateCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourseData = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(id, updatedCourseData, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};


// delete course 
export const deleteCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({
            success: false,
            message: "Some error occurred while deleting the course",
        });
    }
};
