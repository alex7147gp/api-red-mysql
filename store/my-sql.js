const mysql = require("mysql")
const config = require("../config/config")

const jwt = require("jsonwebtoken")



const dbconf = {
	host: config.host,
	user: config.userName,
	password: config.password,
	database: config.name
}


function handleCon() {
	connection = mysql.createConnection(dbconf)
	connection.connect((err) => {
		if (err) {
			console.error("[db error]", err)
		    setTimeout(handleCon, 2000)
		}
    else {
        	console.log("DB Connected!")
    }

	})

	connection.on("error", err => {
		console.error("[db error]", err)
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
			handleCon()
		}
		else {
			throw err
		}
	})
}

handleCon();

function getUsers(table) {
	  console.log(table)
	  return new Promise( (res, rej) => {
		connection.query(`SELECT * FROM ${table}`, (err, data) => {
			if (err) return rej(err)
		    res(data)
		})
	  })
    }

function getUser(table, id) {
	  return new Promise( (res, rej) => {
		connection.query(`SELECT * FROM ${table} WHERE id ='${id}'`, (err, data) => {
			if (err) return rej(err)
		    res(data)
		})
	  })
    }

function addUser(table, data) {
	  return new Promise( (res, rej) => {
		connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
			if (err) return rej(err)
		    res(result)
		})
	  })
    }

function updateUser(table, data) {
	  
	  return new Promise( (res, rej) => {
		connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
			if (err) return rej(err)
		    res(result)
		})
	  })
    }

async function singToken(user) {
      const payload = {
        sub: user.id,
        role: "user"
      }

      const token = jwt.sign(payload, config.jwtSecret)
      
      return { user, token }
    }

function following(table, query, join) {

    	const key = Object.keys(join)[0]
    	const val = join[key]
    	const joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`

    	return new Promise( (res, rej) => {
    		connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, result) => {
    			if (err) return rej(err)
    		    res(result[0] || null)
    		})
    	})
    }

module.exports = { getUsers, getUser, addUser, updateUser, singToken, following }