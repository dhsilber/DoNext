import { DoData } from './DoData'

test('provides a list of todo entities', () => {
    const expectedArray = [
        {text: "Thing1"},
        {text: "Thing2"},
    ]

    const dos = new DoData

    expect(dos.list).toMatchObject(expectedArray)
})

test('provides a list of todo entities', () => {
    const expectedArray = [
        {text: "Thing1"},
        {text: "Thing2"},
    ]

    const dos = new DoData

    expect(dos.list).toMatchObject(expectedArray)
})
