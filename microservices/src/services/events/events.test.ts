import { getEvents } from "./events"

describe('test', () => {
    it('should return data', async () => {

        const params = {
            radius: '100',
            latlong: '48.117266,-1.6777926',
            startDateTime: '2024-04-15T00:00:00Z',
            endDateTime: '2025-04-17T23:59:59Z'
        }

        const result = await getEvents(params)
        expect(result.events.length).toBeGreaterThan(0)
    })
})