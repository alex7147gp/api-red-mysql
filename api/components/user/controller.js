const bcrypt = require("bcrypt")
const auth = require("../auth")

const { faker } = require("@faker-js/faker")


module.exports = function (injectedStore, injectedCache) {
  
  let service = injectedStore

  let cache = injectedCache

  if (!service) {
    service = require("../../../store/my-sql")
  }

  if (!cache) {
    cache = require("./../../store/my-sql")
  }

  const table = "user"

  const getUsers = async () => {

  let users = await cache.getUsers(table)

  if (!users) {
    console.og("There are not cache, looking in DB")
    users = await service.getUsers(table)
    cache.addUser(table, users)
  }

	return users
  }

  const getUser = async (id) => {
   
    let user = await cache.getUser(table, id)

    if (!user) {
      console.log("There are not cache, looking in DB")
      user = await service.getUser(table, id)
      cache.addUser(table, user)
    }
	  return user
  }

  const addUser = async (data) => {

  	if (!data.id) {
  		data.id = faker.datatype.uuid()
  	}

  	if (data.username || data.password){
      await auth.addAuth(data)
  	}
    const userData = {
      id: data.id,
      username: data.username,
      name: data.name
    }
	  
    const user = await service.addUser(table, userData)
    if(user) {
      cache.addUser(table, user)
    }
    return user
  }

  const updateUser = async (data) => {
    const user = await service.updateUser(table, data)

    if (user) {
      cache.updateUser(table, user)
    }

    return user
  }

  const followUser = async (from, to) => {
    return await service.addUser(table+"_follow", {
      user_from: from,
      user_to: to
    })
  }

  const following = async (id) => {
    const join = {}
    join[table] = "user_to"
    const query = { user_from: id}

    return await service.following(table+"_follow", query, join)

  }

  const deleteUser = (id) => {
	  return await deleteUser(table, id)
  }


  return { getUsers, getUser, addUser, updateUser, followUser, following, deleteUser }

}



