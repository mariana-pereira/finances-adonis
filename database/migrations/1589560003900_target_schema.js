'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TargetSchema extends Schema {
  up () {
    this.create('targets', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.timestamp('deadline').notNullable()
      table.decimal('necessary_amount', 10, 2).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('targets')
  }
}

module.exports = TargetSchema
