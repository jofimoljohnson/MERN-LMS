// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";
// import { InstructorContext } from "@/context/Instructor-context";
// import { deleteCourseByIdService } from "@/services";
// import { Delete, Edit } from "lucide-react";
// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";

// const InstructorCourses = ({ listOfCourses }) => {
//     const navigate = useNavigate();
//     const { setCurrentEditedCourseId,setCourseLandingFormData,
//         setCourseCurriculumFormData, } = useContext(InstructorContext);

//         const handleDelete = async (courseId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this course?");
//         if (!confirmDelete) return;

//         try {
//             await deleteCourseByIdService(courseId);
//             setListOfCourses(prev => prev.filter(course => course._id !== courseId)); // remove from list
//         } catch (error) {
//             console.error("Error deleting course:", error);
//             alert("Failed to delete the course.");
//         }
//     };




//     return (
//         <>
//             <Card>
//                 <CardHeader className="flex justify-between flex-row items-center">
//                     <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
//                     <Button
//                         onClick={() => {
//                             setCurrentEditedCourseId(null);
//                             setCourseLandingFormData(courseLandingInitialFormData)
//                             setCourseCurriculumFormData(courseCurriculumInitialFormData)
//                             navigate("/instructor/create-new-course");
//                         }}
//                         className="p-6"
//                     >
//                         Create New Course
//                     </Button>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="overflow-x-auto">
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>Course</TableHead>
//                                     <TableHead>Students</TableHead>
//                                     <TableHead>Revenue</TableHead>
//                                     <TableHead className="text-right">Actions</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {listOfCourses && listOfCourses.length > 0
//                                     ? listOfCourses.map((course) => (
//                                           <TableRow>
//                                               <TableCell className="font-medium">{course?.title}</TableCell>
//                                               <TableCell>{course?.students?.length}</TableCell>
//                                               <TableCell>${course?.students?.length*course?.pricing}</TableCell>
//                                               <TableCell className="text-right">
//                                                   <Button
//                                                       onClick={() => {
//                                                           navigate(`/instructor/edit-course/${course?._id}`);
//                                                       }}
//                                                       variant="ghost"
//                                                       size="sm"
//                                                   >
//                                                       <Edit className="h-6 w-6" />
//                                                   </Button>
//                                                   <Button variant="ghost" size="sm">
//                                                       <Delete className="h-6 w-6" />
//                                                   </Button>
//                                               </TableCell>
//                                           </TableRow>
//                                       ))
//                                     : null}
//                             </TableBody>
//                         </Table>
//                     </div>
//                 </CardContent>
//             </Card>
//         </>
//     );
// };

// export default InstructorCourses;



import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";
import { InstructorContext } from "@/context/Instructor-context";
import { deleteCourseByIdService } from "@/services";
import { Delete, Edit } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const InstructorCourses = ({ listOfCourses = [], setListOfCourses }) => {
    const navigate = useNavigate();
    const { setCurrentEditedCourseId, setCourseLandingFormData, setCourseCurriculumFormData } = useContext(InstructorContext);

    const handleDelete = async (courseId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (!confirmDelete) return;

        try {
            await deleteCourseByIdService(courseId);
            setListOfCourses(prev => prev.filter(course => course._id !== courseId)); // remove from list
        } catch (error) {
            console.error("Error deleting course:", error);
            alert("Failed to delete the course.");
        }
    };

    return (
        <Card>
            <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
                <Button
                    onClick={() => {
                        setCurrentEditedCourseId(null);
                        setCourseLandingFormData(courseLandingInitialFormData);
                        setCourseCurriculumFormData(courseCurriculumInitialFormData);
                        navigate("/instructor/create-new-course");
                    }}
                    className="p-6"
                >
                    Create New Course
                </Button>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course</TableHead>
                                <TableHead>Students</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listOfCourses.map((course) => (
                                <TableRow key={course._id}>
                                    <TableCell className="font-medium">{course.title}</TableCell>
                                    <TableCell>{course.students?.length || 0}</TableCell>
                                    <TableCell>${(course.students?.length || 0) * course.pricing}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            onClick={() => navigate(`/instructor/edit-course/${course._id}`)}
                                            variant="ghost"
                                            size="sm"
                                        >
                                            <Edit className="h-6 w-6" />
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(course._id)} // ✅ handle delete
                                            variant="ghost"
                                            size="sm"
                                        >
                                            <Delete className="h-6 w-6 text-red-600" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default InstructorCourses;
