const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    contact(parent, {contactId}, ctx, info) {
      return ctx.db.query.contact({where: {contactId: contactId}}, info)
    },
    contacts(parent, args, ctx, info) {
      return ctx.db.query.contacts({}, info)
    }
  },
  Mutation: {
    createPerson(parent, {contactId,firstName, lastName, phone, address, email}, ctx, info) {
      return ctx.db.mutation.createContact(
        { data: { contactId, firstName, lastName, phone, address, email} },
        info,
      )
    },
    updatePerson(parent, {contactId, firstName, lastName, phone, address, email}, ctx, info) {
      return ctx.db.mutation.updateContact(
        {
          where: {contactId: contactId},
          data: {firstName, lastName, phone, address, email},
        },
        info,
      )
    },
    deletePerson(parent,{contactId},ctx,info){
      return ctx.db.mutation.deleteContact(
        {
          where: {contactId: contactId},
          info
        }
      )
    }
    // deletePost(parent, { id }, ctx, info) {
    //   return ctx.db.mutation.deletePost({where: { id } }, info)
    // },
    // publish(parent, { id }, ctx, info) {
    //   return ctx.db.mutation.updatePost(
    //     {
    //       where: { id },
    //       data: { isPublished: true },
    //     },
    //     info,
    //   )
    // },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466/testql/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
