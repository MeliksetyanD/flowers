import { ApolloServer, gql } from 'apollo-server';
import {schema} from './schema/schema'
import typeormConfig from './config/typeorm.config';
import { Context } from './types/Context';



const start = async () => {

  const conn = await typeormConfig.initialize()

  const server = new ApolloServer({
    schema,
    context:(): Context=>({conn})
  })

  server.listen(4000).then(({ url }) => {
    console.log(`server run ${url}`)
  })

}

start()










