import express from 'express'
import {getCourseByStudentId} from '../../controllers/student-controller/student-course-controller.js'
const router=express.Router()

router.get('/get/:studentId',getCourseByStudentId)

export default router