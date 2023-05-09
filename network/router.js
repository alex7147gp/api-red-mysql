const express = require("express")
const useRouter = require("../api/components/user/network")

const authRouter = require("../api/components/auth/network")
const swaggerUi = require("swagger-ui-express")

const swaggerDoc = require("../api/swagger")

const routerApi = (app) => {
	const router = express.Router()



	app.use("/", router)

    router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))
    router.use("/user", useRouter)
    router.use("/auth", authRouter)
} 



module.exports = routerApi