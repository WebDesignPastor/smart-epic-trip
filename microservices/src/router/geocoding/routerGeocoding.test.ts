import { build } from "../../server"

test("base all bars route", async () => {
    const app = build()
    const res = await app.inject({
        url: "/geocode"
    })
    expect(res.statusCode).toEqual(200)
    expect(res.statusMessage).toEqual('OK')
    expect(JSON.parse(res.body).results).toBeDefined()
}) 