const express = require("express");


const userService = require("../store/my-sql")


const router = express.Router();

const service = new userService

router.get("/:table", async (req, res, next) => {
  
  const { table } = req.params

  try {
  	const users = await service.getUsers(table)
    res.status(200).json(users)
  }
  catch (err) {
    next(err)
  }

})


router.get("/:table/:id", async (req, res, next) => {
  
  const { table, id } = req.params

  try {
  	const user = await service.getUser(id)
    res.status(200).json(user)
  }
  catch (err) {
    next(err)
  }

})

router.post("/:table", async (req, res, next) => {
  
  const { data } = req.body

  try {
  	const user = await service.addUser(data)
    res.status(200).json(user)
  }
  catch (err) {
    next(err)
  }

})

router.post("/:table/update", async (req, res, next) => {

  const { data } = req.body

  try {
  	const user = await controller.updateUser(data)
    res.status(200).json(user)
  }
  catch (err) {
    next(err)
  }

})

router.post("/:table/delete", async (req, res, next) => {
  
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