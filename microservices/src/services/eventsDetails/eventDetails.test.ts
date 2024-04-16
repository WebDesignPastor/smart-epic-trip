import { getEventsDetails } from "./eventsDetails"

describe('test', () => {
    it('should return data', async () => {

        const params = {
            event_id: 'rZ7SnyZ1AdqeGs'
        }

        const result = await getEventsDetails(params)
        expect(result.id).toEqual(params.event_id)
    })
})