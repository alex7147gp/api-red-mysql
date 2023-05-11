const redis = require("redis")
const config = require("../config/config")





async function handleConnect() {
  const client = redis.createClient({
    password: config.redisPassword,
    socket: {
    	host: config.redisHost,
    	port: config.redisPort
    }
  })
  await client.connect()
  client.on("error", err => {
  	console.log("Redis Client Error", err)
  })
  console.log("Redis connect success")
}

handleConnect()


function getUsers(table) {
	  return new Promise( (res, rej) => {
		client.get(table, (err, data) => {
			if (err) return rej(err)
		    let result = null
		    if (data) {
		    	result = JSON.parse(data)
		    }
		    res(result)
		})
	  })
    }

function getUser(table, id) {
	  return new Promise( (res, rej) => {
		client.get(`${table}_${id}`, (err, data) => {
			if (err) return rej(err)
		    let result = null
		    if (data) {
		    	result = JSON.parse(data)
		    }
		    res(result)
		})
	  })
    }

function addUser(table, data) {
    const key = table

    client.setex(key, 10, JSON.stringify(data))	 
}

function updateUser(table, data) {
	const key = `${table}_${data.id}`
    
    client.setex(key, 10, JSON.stringify(data))
    return true
}

module.exports = { getUsers, getUser, addUser, updateUser }