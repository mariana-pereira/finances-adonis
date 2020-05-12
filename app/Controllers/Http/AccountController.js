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

    const accountBalance = await Database
      .from('transactions')
      .sum('amount')
      .where('account_id', account.id)

    return { account, accountBalance }
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
