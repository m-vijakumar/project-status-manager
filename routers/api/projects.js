const express=require("express");
const router =express.Router();
const bodyparser=require("body-parser");
const key =require("../../setup/connect").TOKEN_KEY;
const projectsController = require("../../controllers/projects")
const sessionHelper = require("../../helpers/sessionHelper");




// @type    POST
//@route    /api/admin/product/create
// @desc    starting router
// @access  PRAVITE 

router.post("/create",sessionHelper.githubSessionVerification,projectsController.validCreateCredentials,projectsController.create)

// @type    GET
//@route    /api/admin/product/all-post
// @desc    starting router
// @access  PUBLIC

router.get("/all-projects",sessionHelper.githubSessionVerification,projectsController.getAllProjects)


// @type    POST
//@route    /api/admin/product/post
// @desc    starting router which required post_id
// @access  PUBLIC 

router.post("/get/project",projectsController.getProject)


// @type    POST
//@route    /api/admin/product/update
// @desc    starting router
// @access  PRAVITE 

router.post("/update",sessionHelper.githubSessionVerification, projectsController.updateProject)


// @type    DELETE
//@route    /api/admin/product/DELETE
// @desc    starting router to delete post
// @access  PRAVITE 

router.delete("/delete",sessionHelper.githubSessionVerification,projectsController.deleteProject)

// @type    POST
//@route    /api/user/projects/add-todo
// @desc    starting router
// @access  PRAVITE 

router.post("/add-todo",sessionHelper.githubSessionVerification,projectsController.addTask)

// @type    POST
//@route    /api/admin/product/update
// @desc    starting router
// @access  PRAVITE 

router.post("/todo/update",sessionHelper.githubSessionVerification, projectsController.updateProjectTodos)


// @type    POST
//@route    /api/admin/product/DELETE
// @desc    starting router to delete post
// @access  PRAVITE 

router.post("/todos/exportgist",projectsController.exportGist)


// @type    DELETE
//@route    /api/admin/product/DELETE
// @desc    starting router to delete post
// @access  PRAVITE 

router.delete("/todo/delete",sessionHelper.githubSessionVerification,projectsController.deleteTask)


module.exports = router;
