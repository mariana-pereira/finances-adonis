'use strict'

const Model = use('Model')

class Profit extends Model {
  investment () {
    return this.belongsTo('App/Models/Investment')
  }
}

module.exports = Profit
