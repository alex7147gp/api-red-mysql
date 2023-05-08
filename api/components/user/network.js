const express = require("express");
const { success, error } = require("../../../network/response")

const controller  = require("./index")
const secure = require("./secure")

const router = express.Router();

router.get("/", async (req, res, next) => {
  
  try {
  	const users = await controller.getUsers()
    res.status(200).json(users)
  }
  catch (err) {
    next(err)
  }

})


router.get("/:id", async (req, res, next) => {
  
  const { id } = req.params

  try {
  	const user = await controller.getUser(id)
    res.status(200).json(user)
  }
  catch (err) {
    next(err)
  }

})

router.post("/", async (req, res, next) => {
  
  const { data } = req.body

  try {
  	const user = await controller.addUser(data)
    res.status(200).json(user)
  }
  catch (err) {
    next(err)
  }

})

router.post("/update", async (req, res, next) => {

  const { data } = req.body

  try {
  	const user = await controller.updateUser(data)
    res.status(200).json(user)
  }
  catch (err) {
    next(err)
  }

})

router.post("/delete", async (req, res, next) => {
  
  const { id } = req.params

  try {
  	const users = await controller.deleteUser(id)
    sucess(req, res, users)
  }
  catch (err) {
    next(err)
  }

})

router.put("/", secure("update"), async (req, res, next) => {
  
  const { data } = req.body

  try {
    const users = await controller.addUser(data)
    success(req, res, users)
  }
  catch (err) {
    next(err)
  }

})

router.post("/follow/:id", secure("follow"), async (req, res, next) => {
  
  const { id } = req.params

  const { data } = req.body

  try {
    const users = await controller.followUser(id, data.id)
    success(req, res, users)
  }
  catch (err) {
    next(err)
  }
})

router.get("/:id/following", async (req, res, next) => {
  
  const { id } = req.params

  try {
    const users = await controller.following(id)
    success(req, res, users)
  }
  catch (err) {
    next(err)
  }
})
module.exports = router