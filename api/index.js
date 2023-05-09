const express = require("express");
const cors = require("cors")

const routerApi = require(".././network/router")
const { logErrors, errorHandler, boomErrorHandler } = require(".././middleware/error.handler")

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())


app.use(cors())

app.get("/api", (req, res) => {
  res.send("this will greet red social")
})

routerApi(app)

app.use(logErrors)

app.use(errorHandler)

app.use(boomErrorHandler)

app.listen(port, () => { 
	console.log(`this server is runiing in port ${port}`)
})