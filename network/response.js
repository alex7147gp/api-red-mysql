



const success = (req, res, message, status = 200) => {
  res.status(status).json({
  	error: false,
  	status,
  	body: message
  })
}



const error = (req, res, status = 500, err) => {
  res.status(status).json({
  	error: true,
  	status,
  	body: err
  })
}

module.exports = { success, error }