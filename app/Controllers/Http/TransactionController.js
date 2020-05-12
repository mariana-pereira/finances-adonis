'use strict'

const Transaction = use('App/Models/Transaction')

class TransactionController {
  async index ({ params }) {
    const transactions = await Transaction.query()
      .where('account_id', params.accounts_id)
      .fetch()

    return transactions
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
