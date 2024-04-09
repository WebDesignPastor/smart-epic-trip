import { build } from "../../server"

test("base details route with the place id of 'la piste'", async () => {
    const app = build()
    const res = await app.inject({
        url: "/details/ChIJpTFOEZ7fDkgRXu3xMYVPMCM"
    })
    expect(res.statusCode).toEqual(200)
    expect(res.statusMessage).toEqual('OK')
    expect(JSON.parse(res.body).result).toBeDefined()
}) 