'use strict'

const Expense = use('App/Models/Expense')

class ExpenseController {
  async index ({ auth }) {
    const expenses = await Expense.query()
      .where('user_id', auth.user.id)
      .fetch()

    return expenses
  }

  async store ({ params, request, auth }) {
    const data = request.only(['date', 'amount', 'shop', 'category'])

    const expense = await Expense.create({
      ...data,
      user_id: auth.user.id,
      card_id: params.cards_id,
      invoice_id: params.invoices_id
    })

    return expense
  }

  async show ({ params }) {
    const expense = await Expense.findOrFail(params.id)

    return expense
  }

  async update ({ params, request }) {
    const expense = await Expense.findOrFail(params.id)
    const data = request.only(['date', 'amount', 'shop', 'category'])

    expense.merge(data)

    await expense.save()

    return expense
  }

  async destroy ({ params }) {
    const expense = await Expense.findOrFail(params.id)

    expense.delete()
  }
}

module.exports = ExpenseController
