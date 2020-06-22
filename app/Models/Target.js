'use strict'

const Model = use('Model')

class Target extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  investments () {
    return this.hasMany('App/Models/Investment')
  }
}

module.exports = Target
