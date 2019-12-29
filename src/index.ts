import { ATLAS_URI } from './env'
import { ApolloServer } from 'apollo-server-express'
import express, { Express } from 'express'
import typeDefs from './schemas'
import auth from './resolvers/Mutation/auth'
import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    hi: (): string => 'Hello World'
  },
  Mutation: {
    ...auth
  }
};

const getUser = async (token: string) => {
    try {
      return await jwt.verify(token, process.env.APP_SECRET) 
    } catch (e) {
      console.log(e)
    }
};

/*
  context: ({ req }: { req: Request }) => {
    const token = req.headers.authorization
    const user = getUser(token)
    return { user }
  }
  */

  const app = express()
  const apolloServer = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: (req: Express.Request): void => {
      console.log(req)
    }
     });
  
  apolloServer.applyMiddleware({ app })
  
;(async (): Promise<void> => { 
  await mongoose.connect(ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
})()

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
  })

  


