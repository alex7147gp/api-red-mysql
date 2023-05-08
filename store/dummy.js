const jwt = require("jsonwebtoken")
const config = require("../config/config")


class Dummy {

	constructor () {
      this.list = {
          user: []
      }    
	}

	async getDummys() {
		return await this.list
	}

  async getDummy(id) {
    return await this.list.find(id)
  }

	async addDummy(table, data) {
    if (!this.list[table]) {
      this.list[table] = []
    }
    this.list[table].push(data)
  
    return data
  }

  async updateDummy(id, data) {
      
    const item = this.list.user.find(item => iten.id === id )
    return item = await data
  }

  async deleteGummy(id) {
    return await  [this.list, id] 
  }
 
  async getUser(user) {
    const data = await this.list.user.find(item => item.user === user)
    if (!data) {
      throw new Error("user not found")
    }
    return data
  }

  async singToken(user) {
    const payload = {
      sub: user.id,
      role: "user"
    }

    const token = jwt.sign(payload, config.jwtSecret)
    return { user, token }
  }

}


module.exports = Dummy