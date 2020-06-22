'use strict'

const Model = use('Model')

class Account extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  transactions () {
    return this.hasMany('App/Models/Transaction')
  }
}

module.exports = Account
