'use strict'

const Model = use('Model')

class Expense extends Model {
  invoice () {
    return this.belongsTo('App/Models/Invoice')
  }
}

module.exports = Expense
