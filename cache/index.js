const express = require("express");
const cors = require("cors")

const network = require("./network")
const { logErrors, errorHandler, boomErrorHandler } = require(".././middleware/error.handler")

const config = require("../config/config")

const app = express()

const router = express.Router()


const port = config.cacheServicePort || 3003

app.use(express.json())


app.use(cors())

app.get("/", (req, res) => {
  res.send("this will greet red social")
})

app.use("/api/v1", router)

router.use("/", network)

app.use(logErrors)

app.use(errorHandler)

app.use(boomErrorHandler)

app.listen(port, () => { 
	console.log(`this cache is runing in port ${port}`)
})