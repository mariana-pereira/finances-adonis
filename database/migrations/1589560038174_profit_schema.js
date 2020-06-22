'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfitSchema extends Schema {
  up () {
    this.create('profits', (table) => {
      table.increments()
      table
        .integer('investment_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('investments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('account_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('accounts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('target_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('targets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamp('date').notNullable()
      table.decimal('amount', 10, 2).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('profits')
  }
}

module.exports = ProfitSchema
