const express = require("express");
const cors = require("cors")

const network = require("./components/post/network")
const { logErrors, errorHandler, boomErrorHandler } = require(".././middleware/error.handler")

const config = require("../config/config")

const app = express()

const router = express.Router()


const port = config.postPort || 3002

app.use(express.json())


app.use(cors())

app.get("/post", (req, res) => {
  res.send("this will greet red social")
})

app.use("/api/post", network)

app.use(logErrors)

app.use(errorHandler)

app.use(boomErrorHandler)

app.listen(port, () => { 
	console.log(`this post microservices is runing in port ${port}`)
})