'use strict'

const Model = use('Model')

class Account extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  transaction () {
    return this.hasMany('App/Models/Transaction')
  }
}

module.exports = Account
