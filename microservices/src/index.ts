import fastify from 'fastify'
import cors from "@fastify/cors"
import {
  restaurantPlugin
} from "./routers"

const server = fastify()

server.register(cors, {
  origin: true,
})
server.register(restaurantPlugin)

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})