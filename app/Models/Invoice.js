'use strict'

const Model = use('Model')

class Invoice extends Model {
  card () {
    return this.belongsTo('App/Models/Card')
  }

  expenses () {
    return this.hasMany('App/Models/Expense')
  }
}

module.exports = Invoice
