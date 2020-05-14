'use strict'

const Card = use('App/Models/Card')
const Database = use('Database')

class CardController {
  async index ({ auth }) {
    const cards = await Card.query()
      .where('user_id', auth.user.id)
      .fetch()

    return cards
  }

  async store ({ request, auth }) {
    const data = request.only(['name', 'number', 'limit', 'expiry_date'])

    const card = await Card.create({ ...data, user_id: auth.user.id })

    return card
  }

  async show ({ params }) {
    const card = await Card.findOrFail(params.id)

    const expenses = await Database
      .from('expenses')
      .sum('amount')
      .where('card_id', card.id)

    const availableLimit = parseFloat(card.limit) - parseFloat(expenses[0].sum)

    return { card, availableLimit }
  }

  async update ({ params, request }) {
    const card = await Card.findOrFail(params.id)
    const data = request.only(['name', 'number', 'limit', 'expiry_date'])

    card.merge(data)

    await card.save()

    return card
  }

  async destroy ({ params }) {
    const card = await Card.findOrFail(params.id)

    card.delete()
  }
}

module.exports = CardController
