'use strict'

const User = use('App/Models/User')
const Role = use('Adonis/Acl/Role')
const Permission = use('Adonis/Acl/Permission')

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      name:'Ernesto Maria',
      email:'emaria1@gmail.com',
      password:'123456'
    })

    const createInvite = await Permission.create({
      slug:'invites_create',
      name:'Convidar membros'
    });

    const createProjects = await Permission.create({
      slug:'projects_create',
      name:'Criar projectos'
    });

    const admin= await Role.create({
      slug:'administrator',
      name: 'Administrador'
    });

    const moderator= await Role.create({
      slug:'moderator',
      name: 'Moderador'
    });

    await Role.create({
      slug: 'vistor',
      name:'Visitante'
    })

    await admin.permissions().attach([createInvite.id, createProjects.id])
    await moderator.permissions().attach([createProjects.id])

    const team = await user.teams().create({
      name:'Rocketseat',
      user_id :user.id
    })

    const teamJoin = await user.teamJoins().where('team_id', team.id).first()

    await teamJoin.roles().attach([admin.id]);

  }
}

module.exports = DatabaseSeeder
