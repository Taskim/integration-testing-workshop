import uuid from 'uuidv4'

export const fetchCat = jest.fn(() => {
    const id = uuid()
    return Promise.resolve([
        {
            id,
            url: `${id}_url`,
        },
    ])
})
