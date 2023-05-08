const axios = require("axios")



function createRemoteDB(host, port) {
	const URL = `http://${host}:${port}/api/v1`

	function getUsers(table) {
		return req(table)
	}

	function getUser(table, id) {
		return req(table, id)
	}

	function req(table, data = null) {
		
        let url = `${URL}/${table}`

        if (data) {
        	url = `${url}/${data}`
        }

		let body = ""

		return new Promise((res, rej) => {
		  axios.get(`${url}`)
		    .then(response => {
		    	res(response.data)
		    })
		    .catch(err => {
		    	rej(err)
		    })
		})
	}

	return { getUsers }
}

module.exports = createRemoteDB