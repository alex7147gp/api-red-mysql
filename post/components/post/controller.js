const bcrypt = require("bcrypt")
const auth = require("../../../api/components/auth")

const { faker } = require("@faker-js/faker")


module.exports = function (injectedStore) {
  
  let service = injectedStore

  if (!service) {
  	service = require("../../../store/dummy")
  }

  const table = "post"

  const getUsers = async () => {

	return await service.getUsers(table)
  }

  const getUser = async (id) => {
	  return await service.getUser(table, id)
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
	  return await service.addUser(table, userData)
  }

  const updateUser = async (data) => {
    return await service.updateUser(table, data)
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
	dummy.deleteDummy(id)
  }


  return { getUsers, getUser, addUser, updateUser, followUser, following, deleteUser }

}


