'use strict'

const Database = use('Database')
const Transaction = use('App/Models/Transaction')

class TransactionController {
  async index ({ auth }) {
    const date = new Date()
    const monthTransactions = await Database
      .raw(
        'select * from transactions where user_id = ? and EXTRACT(MONTH FROM date) = ?',
        [auth.user.id, date.getMonth() + 1]
      )

    const yearTransactions = await Database
      .raw(
        'select * from transactions where user_id = ? and EXTRACT(Year FROM date) = ?',
        [auth.user.id, date.getFullYear()]
      )

    return {
      month: monthTransactions.rows,
      year: yearTransactions.rows
    }
  }

  async store ({ params, request, auth }) {
    const data = request.only([
      'date',
      'amount',
      'type',
      'category'
    ])

    const transaction = await Transaction.create({
      ...data,
      account_id: params.accounts_id,
      user_id: auth.user.id
    })

    return transaction
  }

  async show ({ params }) {
    const transaction = await Transaction.findOrFail(params.id)

    return transaction
  }

  async update ({ params, request }) {
    const transaction = await Transaction.findOrFail(params.id)
    const data = request.only([
      'date',
      'amount',
      'type',
      'category'
    ])

    transaction.merge(data)

    await transaction.save()

    return transaction
  }

  async destroy ({ params }) {
    const transaction = await Transaction.findOrFail(params.id)

    transaction.delete()
  }
}

module.exports = TransactionController
