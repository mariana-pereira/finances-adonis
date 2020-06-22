'use strict'

const Model = use('Model')

class Investment extends Model {
  profit () {
    return this.hasMany('App/Models/Profit')
  }
}

module.exports = Investment
