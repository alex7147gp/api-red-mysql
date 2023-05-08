const bcrypt = require("bcrypt")



module.exports = function (injectedStore) {
  
  let service = injectedStore

  if (service) {
  	service = new require("../../../store/my-sql")
  }




  const addAuth = async (data) => {

    const hash = await bcrypt.hash(data.password, 10)

    const authData = {
      id: data.id,
      username: data.username,
      password: hash
    }

    return service.addUser("auth", authData)
  }

  const logIn = async (data) => {
    const user = await service.getUser("auth", data.id)
    return bcrypt.compare(data.password, user[0].password)
      .then(success => {
        if (success) {
          return service.singToken(user)
        }
        else {
          throw new Error("the data is incorrect")
        }
      })
    
  }

  const deleteDummy = async (id) => {
	  
  }


  return { addAuth, logIn, deleteDummy }

}



