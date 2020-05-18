'use strict'

const Account = use('App/Models/Account')
const Database = use('Database')

class AccountController {
  async index ({ auth }) {
    const accounts = await Account.query()
      .where('user_id', auth.user.id)
      .fetch()

    return accounts
  }

  async store ({ request, auth }) {
    const data = request.only(['bank', 'branch', 'account_number', 'account_type'])

    const account = await Account.create({ ...data, user_id: auth.user.id })

    return account
  }

  async show ({ params }) {
    const account = await Account.findOrFail(params.id)

    const transactions = await account.transactions().fetch()

    const accountBalance = await Database
      .from('transactions')
      .sum('amount')
      .where('account_id', account.id)

    const investments = await Database
      .from('investments')
      .sum('amount')
      .where('account_id', account.id)

    const profits = await Database
      .from('profits')
      .sum('amount')
      .where('account_id', account.id)

    const investmentsBalance = parseFloat(investments[0].sum) + parseFloat(profits[0].sum)

    return { account, accountBalance, investmentsBalance, transactions }
  }

  async update ({ params, request }) {
    const account = await Account.findOrFail(params.id)
    const data = request.only(['bank', 'branch', 'account_number', 'account_type'])

    account.merge(data)

    await account.save()

    return account
  }

  async destroy ({ params }) {
    const account = await Account.findOrFail(params.id)

    account.delete()
  }
}

module.exports = AccountController
