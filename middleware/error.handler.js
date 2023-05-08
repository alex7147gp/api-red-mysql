function logErrors (err, res, req, next) {
	console.log("logErrors");
	console.log(err)
}



function errorHandler (err, res, req, next) {
  console.log("errorHandler")
  res.status(500).json({
  	message: err.message,
  	stack: err.stack,
  })
}

function boomErrorHandler (err, res, req, next) {
	if (err.isBoom) {
		const { output } = err;
		res.status(output.statusCode).json(output.payload)
	}
	else {
		next(err)
	}
}

module.exports = { logErrors, errorHandler, boomErrorHandler }