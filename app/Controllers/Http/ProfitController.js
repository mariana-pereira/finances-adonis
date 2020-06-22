'use strict'

const Profit = use('App/Models/Profit')

class ProfitController {
  async index ({ params }) {
    const profits = await Profit.query()
      .where('investment_id', params.investments_id)
      .fetch()

    return profits
  }

  async store ({ params, request }) {
    const data = request.only(['date', 'amount'])

    const profit = await Profit.create({
      ...data,
      investment_id: params.investments_id,
      account_id: params.accounts_id,
      target_id: params.targets_id
    })

    return profit
  }

  async show ({ params }) {
    const profit = await Profit.findOrFail(params.id)

    return profit
  }

  async update ({ params, request, response }) {
    const profit = await Profit.findOrFail(params.id)
    const data = request.only(['date', 'amount'])

    profit.merge(data)

    await profit.save()

    return profit
  }

  async destroy ({ params }) {
    const profit = await Profit.findOrFail(params.id)

    profit.delete()
  }
}

module.exports = ProfitController
