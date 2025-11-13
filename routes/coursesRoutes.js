const express = require("express");
const router = express.Router();
const coursesController = require("../../Online-Learning-Platform-Server-site/controllers/coursesController");

module.exports = (courseCollection) => {
  router.get("/", (req, res) => coursesController.getAllCourses(req, res, courseCollection));
  router.get("/:id", (req, res) => coursesController.getCourseById(req, res, courseCollection));
  router.post("/", (req, res) => coursesController.addCourse(req, res, courseCollection));
  router.patch("/:id", (req, res) => coursesController.updateCourse(req, res, courseCollection));
  router.delete("/:id", (req, res) => coursesController.deleteCourse(req, res, courseCollection));
  return router;
};
