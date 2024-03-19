import { getGeocode } from "./geocoding"

describe('test', () => {
    it('should return data', async () => {

        const params = {address: 'Rennes'}

        const result = await getGeocode(params)

        expect(result).toHaveProperty("results")
    })
})