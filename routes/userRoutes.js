import express from 'express';
import { addToPlaylist, changePassword, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, UpdateProfile, UpdateProfilePicture, updateUserRole } from '../controllers/userController.js';
import { authorizeAdmin, isAuthenticated } from '../middleware/auth.js';
import singleUpload from '../middleware/multer.js';

const router = express.Router();

//to register a new user
router.route("/register").post(singleUpload, register);

//Login
router.route("/login").post(login);

//Logout
router.route("/logout").get(logout);

//get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

//Delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

//ChangePassword
router.route("/changepassword").put(isAuthenticated, changePassword);

//UpdateProfile
router.route("/updateprofile").put(isAuthenticated, UpdateProfile);

//UpdateProfilePicture
router.route("/updateprofilepicture").put(isAuthenticated, singleUpload, UpdateProfilePicture);

//ForgetPassword
router.route("/forgetpassword").post(forgetPassword);

//ResetPassword
router.route("/resetpassword/:token").put(resetPassword);

//Add from Playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

//Remove from Playlist
router.route("/removeFromPlaylist").delete(isAuthenticated, removeFromPlaylist);


// Admin Routes
// Get All Users
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

//Change Role to User to Admin
router.route("/admin/user/:id").put(isAuthenticated, authorizeAdmin, updateUserRole);

//Delete Your id
router.route("/admin/user/:id").delete(isAuthenticated, authorizeAdmin, deleteUser);
export default router;