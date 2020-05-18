'use strict'

const Investment = use('App/Models/Investment')
const Database = use('Database')

class InvestmentController {
  async index ({ auth }) {
    const investments = await Investment.query()
      .where('user_id', auth.user.id)
      .fetch()

    return investments
  }

  async store ({ params, request, auth }) {
    const data = request.only([
      'name',
      'type',
      'tax',
      'application_date',
      'redeem_date',
      'amount'
    ])

    const investment = await Investment.create({
      ...data,
      user_id: auth.user.id,
      account_id: params.accounts_id,
      target_id: params.targets_id
    })

    return investment
  }

  async show ({ params }) {
    const investment = await Investment.findOrFail(params.id)

    const profits = await Database
      .from('profits')
      .sum('amount')
      .where('investment_id', investment.id)

    const totalAmount = parseFloat(investment.amount) + parseFloat(profits[0].sum)

    return { investment, profits, totalAmount }
  }

  async update ({ params, request }) {
    const investment = await Investment.findOrFail(params.id)
    const data = request.only([
      'name',
      'type',
      'tax',
      'application_date',
      'redeem_date',
      'amount'
    ])

    investment.merge(data)

    await investment.save()

    return investment
  }

  async destroy ({ params }) {
    const investment = await Investment.findOrFail(params.id)

    investment.delete()
  }
}

module.exports = InvestmentController
