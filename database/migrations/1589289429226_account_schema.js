'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountSchema extends Schema {
  up () {
    this.create('accounts', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('bank').notNullable()
      table.string('branch').notNullable()
      table.string('account_number').notNullable()
      table.string('account_type').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('accounts')
  }
}

module.exports = AccountSchema
