import { getHotels } from "./hotel"


describe('test', () => {
    it('should return data, even with empty params', async () => {

        const params = {}

        const result = await getHotels(params)

        expect(result).toHaveProperty("results")
    })

    it('should return an error when the fetch failed', async () => {
        const params = {}
    
        await expect(getHotels(params)).resolves.toEqual({"html_attributions": [], "results": [], "status": "INVALID_REQUEST"})
    })
})