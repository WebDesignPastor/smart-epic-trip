import { getRestaurants } from "./restaurant"

describe('test', () => {
    it('should return data, even with empty params', async () => {

        const params = {}

        const result = await getRestaurants(params)

        expect(result).toHaveProperty("results")
    })

    it('should return an error when the fetch failed', async () => {
        const params = {}
    
        await expect(getRestaurants(params)).resolves.toEqual({"html_attributions": [], "results": [], "status": "INVALID_REQUEST"})
    })
})