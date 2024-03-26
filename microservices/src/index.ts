import fastify from 'fastify'
import cors from "@fastify/cors"
import {
  restaurantPlugin,
  barPlugin,
  hotelPlugin,
  geoCodingPlugin,
  detailPlugin,
} from "./router"

const server = fastify()

server.register(cors, {
  origin: true,
})
server.register(restaurantPlugin)
server.register(barPlugin)
server.register(hotelPlugin)
server.register(geoCodingPlugin)
server.register(detailPlugin)

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen({ port: 8001, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at http://localhost:8001`)
})