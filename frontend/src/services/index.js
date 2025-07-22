import axiosInstance from "@/api/axiosInstance";

export const registerService = async (formData) => {
    const { data } = await axiosInstance.post("/auth/register", {
        ...formData,
        role: "user",
    });
    return data;
};
export const loginService = async (formData) => {
    const { data } = await axiosInstance.post("/auth/login", formData);
    return data;
};
export const checkAuthService = async () => {
    const { data } = await axiosInstance.get("/auth/check-auth");
    return data;
};
export const mediaUploadService = async (formData, onProgressCallback) => {
    const { data } = await axiosInstance.post("/media/upload", formData, {
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgressCallback(percentCompleted);
        },
    });
    return data;
};

export const mediaDeleteService = async (id) => {
    const { data } = await axiosInstance.delete(`/media/delete/${id}`);
    return data;
};

export const fetchInstructorCourseListService = async () => {
    const { data } = await axiosInstance.get(`/instructor/course/get`);
    return data;
};
export const addNewCourseService = async (formData) => {
    const { data } = await axiosInstance.post(`/instructor/course/add`, formData);
    return data;
};
export const fetchInstructorCourseDetailsService = async (id) => {
    const { data } = await axiosInstance.get(`/instructor/course/get/details/${id}`);
    return data;
};

export const updateCourseByIdService = async (id, formData) => {
    const { data } = await axiosInstance.put(`/instructor/course/update/${id}`, formData);
    return data;
};


// delete course by id 

export const deleteCourseByIdService = async (id) => {
  const { data } = await axiosInstance.delete(`/instructor/course/${id}`);
  return data;
};




export const mediaBulkUploadService = async (formData, onProgressCallback) => {
    const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgressCallback(percentCompleted);
        },
    });
    return data;
};

export const fetchStudentViewCourseListService = async (query) => {
    const { data } = await axiosInstance.get(`/student/course/get?${query}`);
    return data;
};
export const fetchStudentViewCourseDetailsService = async (courseId) => {
    const { data } = await axiosInstance.get(`/student/course/get/details/${courseId}`);
    return data;
};

export const createPaymentService = async (formData) => {
    const { data } = await axiosInstance.post(`/student/order/create`, formData);
    return data;
};

export const captureAndFinalizePaymentService = async (paymentId, payerId, orderId) => {
    const { data } = await axiosInstance.post(`/student/order/capture`, {
        paymentId,
        payerId,
        orderId,
    });
    return data;
};

export const fetchStudentBoughtCoursesService = async (studentId) => {
    const { data } = await axiosInstance.get(`/student/courses-bought/get/${studentId}`);
    return data;
};

export const checkCoursePurchaseInfoService = async (courseId, studentId) => {
    const { data } = await axiosInstance.get(`/student/course/purchase-info/${courseId}/${studentId}`);
    return data;
};

export const getCurrentCourseProgressService = async (userId, courseId) => {
    const { data } = await axiosInstance.get(`/student/course-progress/get/${userId}/${courseId}`);
    return data;
};

export const markLectureAsViewedService = async (userId, courseId,lectureId) => {
    const { data } = await axiosInstance.post(`/student/course-progress/mark-lecture-viewed`,{userId,courseId,lectureId});
    return data;
};

export const resetCourseProgressService = async (userId, courseId) => {
    const { data } = await axiosInstance.post(`/student/course-progress/reset-progress`,{userId,courseId});
    return data;
};
