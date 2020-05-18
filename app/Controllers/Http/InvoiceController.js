'use strict'

const Invoice = use('App/Models/Invoice')
const Database = use('Database')

class InvoiceController {
  async index ({ auth }) {
    const invoices = await Invoice.query()
      .where('user_id', auth.user.id)
      .fetch()

    return invoices
  }

  async store ({ params, request, auth }) {
    const data = request.only(['name', 'month', 'year', 'expiry_date'])

    const invoice = await Invoice.create({
      ...data,
      user_id: auth.user.id,
      card_id: params.cards_id,
      paid: false
    })

    return invoice
  }

  async show ({ params }) {
    const invoice = await Invoice.findOrFail(params.id)

    const expenses = await invoice.expenses().fetch()

    const invoiceAmount = await Database
      .from('expenses')
      .sum('amount')
      .where('invoice_id', invoice.id)

    return { invoice, invoiceAmount, expenses }
  }

  async update ({ params, request }) {
    const invoice = await Invoice.findOrFail(params.id)
    const data = request.only(['name', 'month', 'year', 'expiry_date'])

    invoice.merge(data)

    await invoice.save()

    return invoice
  }

  async destroy ({ params }) {
    const invoice = await Invoice.findOrFail(params.id)

    invoice.delete()
  }
}

module.exports = InvoiceController
