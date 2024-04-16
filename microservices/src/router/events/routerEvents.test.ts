import { build } from "../../server"

test("event details route with an event id", async () => {
    const app = build()
    const res = await app.inject({
        url: "/events/rZ7SnyZ1AdqeGs"
    })
    expect(res.statusCode).toEqual(200)
    expect(res.statusMessage).toEqual('OK')
    expect(res.payload).toBeDefined()
}) 

test("base all event route", async () => {
    const app = build()
    const res = await app.inject({
        url: "/events",
        query: {
            radius: '100',
            latlong: '48.117266,-1.6777926',
            startDateTime: '2024-04-15T00:00:00Z',
            endDateTime: '2025-04-17T23:59:59Z'
        }
    })
    expect(res.statusCode).toEqual(200)
    expect(res.statusMessage).toEqual('OK')
    expect(res.payload).toBeDefined()
})

