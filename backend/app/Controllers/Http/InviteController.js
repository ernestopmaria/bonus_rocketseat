'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with invites
 */

  const Invite = use('App/Models/Invite')
class InviteController {


  async store ({ request, auth, response }) {
    const invites = request.input('invites')

    const data = invites.map(email=>({
      email,
      user_id:auth.user.id,
      team_id:request.team.id
    }))

    await Invite.createMany(data)

    return response.json({data})
  }

}

module.exports = InviteController
