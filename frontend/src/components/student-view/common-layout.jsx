import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import StudentViewCommonHeader from "./header";

const StudentViewCommonLayout = () => {
    const location=useLocation()
    return (
        <div>
            {
                !location.pathname.includes('course-progress')?
                            <StudentViewCommonHeader />:null

            }

            <Outlet />
        </div>
    );
};

export default StudentViewCommonLayout;
