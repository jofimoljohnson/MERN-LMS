import CourseCurriculum from "@/components/Instructor-view/courses/add-new-courses/course-curriculum";
import CourseLanding from "@/components/Instructor-view/courses/add-new-courses/course-landing";
import CourseSettings from "@/components/Instructor-view/courses/add-new-courses/course-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/Instructor-context";
import { addNewCourseService, fetchInstructorCourseDetailsService, updateCourseByIdService } from "@/services";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddNewCoursePage = () => {
    const {
        courseLandingFormData,
        courseCurriculumFormData,
        setCourseLandingFormData,
        setCourseCurriculumFormData,
        currentEditedCourseId,
        setCurrentEditedCourseId,
    } = useContext(InstructorContext);

    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();
    console.log(params);

    const isEmpty = (value) => {
        if (Array.isArray(value)) {
            return value.length === 0;
        }
        return value === "" || value === null || value === undefined;
    };

    const validateFormData = () => {
        for (const key in courseLandingFormData) {
            if (isEmpty(courseLandingFormData[key])) {
                return false;
            }
        }
        let hasFreePreview = false;
        for (const item of courseCurriculumFormData) {
            if (isEmpty(item.title) || isEmpty(item.videoUrl) || isEmpty(item.public_id)) {
                return false;
            }
            if (item.freePreview) {
                hasFreePreview = true;
            }
        }
        return hasFreePreview;
    };

    const handleCreateCourse = async () => {
        const courseFinalFormData = {
            instructorId: auth?.user?._id,
            instructorName: auth?.user?.userName,
            date: new Date(),

            ...courseLandingFormData,
            students: [],
            curriculum: courseCurriculumFormData,
            isPublised: Boolean,
        };
        const response =
            currentEditedCourseId !== null
                ? await updateCourseByIdService(currentEditedCourseId, courseFinalFormData)
                : await addNewCourseService(courseFinalFormData);
        if (response?.success) {
            setCourseLandingFormData(courseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            navigate(-1);
            setCurrentEditedCourseId(null);
        }
        console.log("courseFinalFormDatajofi", courseFinalFormData);
    };
    const fetchCurrentCourseDetails = async () => {
        const response = await fetchInstructorCourseDetailsService(currentEditedCourseId);
        if (response?.success) {
            const setCourseFormData = Object.keys(courseLandingInitialFormData).reduce((acc, key) => {
                acc[key] = response?.data[key] || courseLandingInitialFormData[key];
                return acc;
            }, {});
            console.log("setCourseFormData", setCourseFormData);
            setCourseLandingFormData(setCourseFormData);
            setCourseCurriculumFormData(response?.data?.curriculum);
        }
    };

    useEffect(() => {
        if (currentEditedCourseId) fetchCurrentCourseDetails();
    }, [currentEditedCourseId]);

    useEffect(() => {
        if (params?.courseId) setCurrentEditedCourseId(params?.courseId);
    }, [params?.courseId]);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between">
                <h1 className="text-3xl font-extrabold mb-5">Create a new course</h1>
                <Button
                    disabled={!validateFormData()}
                    className="text-sm tracking-wider font-bold px-8"
                    onClick={handleCreateCourse}
                >
                    SUBMIT
                </Button>
            </div>
            <Card>
                <CardContent>
                    <div className="container mx-auto p-4">
                        <Tabs defaultValue="curriculum" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                                <TabsTrigger value="course-landing-page">Course Landing Page</TabsTrigger>
                                <TabsTrigger value="setting">Settings</TabsTrigger>
                            </TabsList>
                            <TabsContent value="curriculum">
                                <CourseCurriculum />
                            </TabsContent>
                            <TabsContent value="course-landing-page">
                                <CourseLanding />
                            </TabsContent>
                            <TabsContent value="setting">
                                <CourseSettings />
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddNewCoursePage;
