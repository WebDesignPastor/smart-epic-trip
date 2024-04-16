import { build } from "./server"

test("default ping route", async () => {
    const app = build()
    const res = await app.inject({
        url: "/ping"
    })
    expect(res.body).toEqual('pong\n')
})