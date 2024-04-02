import { getPlacesById } from "."


describe('test', () => {
    it('should return data', async () => {

        const params = {place_id: 'ChIJgUbEo8cfqokR5lP9_Wh_DaM'}

        const result = await getPlacesById(params)

        expect(result).toHaveProperty("result")
    })
})