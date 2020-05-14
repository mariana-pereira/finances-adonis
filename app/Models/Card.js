'use strict'

const Model = use('Model')

class Card extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  invoices () {
    return this.hasMany('App/Models/Invoice')
  }
}

module.exports = Card
