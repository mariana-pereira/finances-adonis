'use strict'

const Target = use('App/Models/Target')

class TargetController {
  async index ({ auth }) {
    const targets = await Target.query()
      .where('user_id', auth.user.id)
      .fetch()

    return targets
  }

  async store ({ request, auth }) {
    const data = request.only(['name', 'necessary_amount', 'deadline'])

    const target = await Target.create({ ...data, user_id: auth.user.id })

    return target
  }

  async show ({ params }) {
    const target = await Target.findOrFail(params.id)

    return target
  }

  async update ({ params, request }) {
    const target = await Target.findOrFail(params.id)
    const data = request.only(['name', 'necessary_amount', 'deadline'])

    target.merge(data)

    await target.save()

    return target
  }

  async destroy ({ params }) {
    const target = await Target.findOrFail(params.id)

    target.delete()
  }
}

module.exports = TargetController
