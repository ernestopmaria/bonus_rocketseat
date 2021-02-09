'use strict'

const Role = use('Adonis/Acl/Role')

class TeamController {
  /**
   * Show a list of all teams.
   * GET teams
   */
  async index ({auth}) {
    const teams  = await auth.user.teams().fetch()

    return teams
  }

  /**
   * Render a form to be used for creating a new team.
   * GET teams/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async store ({ request, auth }) {
    const data = request.only(['name'])

    const team = await auth.user.teams().create({
      ...data,
      user_id:auth.user.id,
    })

    const teamJoin = await auth.user.teamJoins().where('team_id',team.id).first()

    const admin = await Role.findBy('slug', 'administrator')
    await teamJoin.roles().attach([admin.id])

    return team
  }

  /**
   * Display a single team.
   * GET teams/:id
     */
  async show ({params,auth }) {
    const team = await auth.user.teams().where('teams.id', params.id).first()


    await teamJoin.roles().attach

    return team
  }

  /**
   * Render a form to update an existing team.
   * GET teams/:id/edit
   */

  async update ({ params, request, auth }) {
    const data = request.only(['name'])
    const team = await auth.user.teams().where('teams.id', params.id).first()

    team.merge(data)
    await team.save()

    return team

  }

  /**
   * Delete a team with id.
   * DELETE teams/:id
   *

   */
  async destroy ({ params, auth }) {
    const team = await auth.user.teams().where('teams.id', params.id).first()

    await team.delete()
  }
}

module.exports = TeamController
