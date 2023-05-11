const axios = require("axios")



function createRemoteDB(host, port) {
	const URL = `http://${host}:${port}/api/v1`

	function getUsers(table) {
		return req(table)
	}

	function getUser(table, id) {
		return req(table, id)
	}

	function addUser(table, data) {
		return post(table, data)
	}

	function updateUser(table, data) {
		return postUpdate(table, data)
	}

	function req(table, data = null) {
		
        let url = `${URL}/${table}`

        if (data) {
        	url = `${url}/${table}/${data}`
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

	function post(table, data) {
		let url = `${URL}/${table}`

		let body = ""

		return new Promise((res, rej) => {
		  axios.post(`${url}`, data)
		    .then(response => {
		    	res(response.data)
		    })
		    .catch(err => {
		    	rej(err)
		    })
		})
	}

	function postUpdate(table, data) {
		let url = `${URL}/${table}/update`

		let body = ""

		return new Promise((res, rej) => {
		  axios.post(`${url}`, data)
		    .then(response => {
		    	res(response.data)
		    })
		    .catch(err => {
		    	rej(err)
		    })
		})
	}

    function postDelete(table, id) {
		let url = `${URL}/${table}/${id}/delete`

		let body = ""

		return new Promise((res, rej) => {
		  axios.post(`${url}`)
		    .then(response => {
		    	res(response.data)
		    })
		    .catch(err => {
		    	rej(err)
		    })
		})
	}

	return { getUsers, getUser, addUser, updateUser }
}

module.exports = createRemoteDB