import express from 'express';
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from '../controllers/courseController.js';
import singleUpload from '../middleware/multer.js';
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Get All Courses without Lectures
router.route("/courses").get(getAllCourses);

// Create new Course - only Admin
router.route("/createcourse").post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

// add Lecture, delete Course, get Course Detail
router.route("/course/:id").get(isAuthenticated, authorizeSubscribers, getCourseLectures)
.post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
.delete(isAuthenticated, authorizeAdmin, deleteCourse)

// delete Lectures
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);



export default router;