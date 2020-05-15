'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvestmentSchema extends Schema {
  up () {
    this.create('investments', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
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
      table.string('name').notNullable()
      table.string('type').notNullable()
      table.string('tax').notNullable()
      table.timestamp('application_date').notNullable()
      table.timestamp('redeem_date').notNullable()
      table.decimal('amount').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('investments')
  }
}

module.exports = InvestmentSchema
