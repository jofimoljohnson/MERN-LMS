import express from "express";
import connectDB from "./db/connectDB.js";
import cors from "cors";
import authRouter from './routes/auth-routes/index.js'
import mediaRouter from './routes/instructor-routes/media-routes.js'
import instructorCourseRouter from './routes/instructor-routes/course-routes.js'
import studentViewCourseRouter from './routes/student-routes/course-routes.js'
import studentViewOrderRouter from './routes/student-routes/order-routes.js'
import studentCoursesRouter from './routes/student-routes/student-courses-routes.js'
import studentCourseProgressRouter from './routes/student-routes/course-progress-routes.js'
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.use(express.json())

// routes configuration
app.use("/auth",authRouter)
app.use("/media",mediaRouter)
app.use('/instructor',instructorCourseRouter)
app.use('/student/course',studentViewCourseRouter)
app.use('/student/order',studentViewOrderRouter)
app.use('/student/courses-bought',studentCoursesRouter)
app.use('/student/course-progress',studentCourseProgressRouter)



const corsOptions = {
    origin: process.env.CLIENT_URL,
};

app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).json({
        success:false,
        message:"Something went wrong"
    })
})




app.use(express.json());

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
