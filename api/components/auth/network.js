const express = require("express");
const { success, error } = require("../../../network/response")

const controller  = require("./index")


const router = express.Router();

router.get("/", async (req, res, next) => {
  
  try {
  	const users = await controller.getUsers()
    success(req, res, users)
  }
  catch (err) {
    next(err)
  }

})


router.post("/login", async (req, res, next) => {

  const data = req.body.data

  console.log(data)

  try {
  	const user = await controller.logIn(data)
    res.status(200).json(user)
  }
  catch (err) {
    next(err)
  }
  
})

router.post("/auth", async (req, res, next) => {
  
  const { data } = req.body

  try {
  	const users = await controller.addAuth(data)
    sucess(req, res, users)
  }
  catch (err) {
    next(err)
  }

})

router.post("/update:id", async (req, res, next) => {
  
  const { id } = req.params

  const { data } = req.body

  try {
  	const users = await controller.updateUser(id, data)
    sucess(req, res, users)
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
module.exports = router