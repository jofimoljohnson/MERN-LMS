import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guard";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardPage from "./pages/instructor";
import AddNewCoursePage from "./pages/instructor/add-new-course";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home";
import StudentViewCoursesPage from "./pages/student/courses";
import StudentViewCourseDetailsPage from "./pages/student/course-details";
import PaypalPaymentReturnPage from "./pages/student/payment-return";
import StudentCoursesPage from "./pages/student/student-courses";
import StudentViewCourseProgressPage from "./pages/student/course-progress";
import NotFoundPage from "./pages/not-found";

const App = () => {
    const { auth } = useContext(AuthContext);
    return (
        <div>
            <Routes>
                <Route
                    path="/auth"
                    element={<RouteGuard element={<AuthPage />} authenticated={auth?.authenticate} user={auth?.user} />}
                />
                <Route
                    path="/instructor"
                    element={
                        <RouteGuard
                            element={<InstructorDashboardPage />}
                            authenticated={auth?.authenticate}
                            user={auth?.user}
                        />
                    }
                />
                <Route
                    path="/instructor/create-new-course"
                    element={
                        <RouteGuard element={<AddNewCoursePage />} authenticated={auth?.authenticate} user={auth?.user} />
                    }
                />
                <Route
                    path="/instructor/edit-course/:courseId"
                    element={
                        <RouteGuard element={<AddNewCoursePage />} authenticated={auth?.authenticate} user={auth?.user} />
                    }
                />

                <Route
                    path="/"
                    element={
                        <RouteGuard
                            element={<StudentViewCommonLayout />}
                            authenticated={auth?.authenticate}
                            user={auth?.user}
                        />
                    }
                >
                    <Route path="" element={<StudentHomePage />} />
                    <Route path="home" element={<StudentHomePage />} />
                    <Route path="courses" element={<StudentViewCoursesPage />} />
                    <Route path="course/details/:id" element={<StudentViewCourseDetailsPage />} />
                    <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
                    <Route path="student-courses" element={<StudentCoursesPage />} />
                    <Route path="course-progress/:id" element={<StudentViewCourseProgressPage />} />

                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
};

export default App;
