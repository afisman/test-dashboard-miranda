const { Room, Booking } = require('./index');

const roomsTemplate = [
    {
        name: 'Suite-142',
        rate: 265,
        discount: 30
    },
    {
        name: 'Single-022',
        rate: 125,
        discount: 15
    },
    {
        name: 'Double-111',
        rate: 175,
        discount: 20
    }
]

const bookingsTemplate = [
    {
        name: 'John Doe',
        email: 'johndoe@email.com',
        check_in: "2024-02-04",
        check_out: "2024-02-07",
        discount: 10
    },
    {
        name: 'Jane Smith',
        email: 'jsmith@email.com',
        check_in: "2024-03-01",
        check_out: "2024-03-07",
        discount: 5
    },
    {
        name: 'Alice Cooper',
        email: 'alicecooper@email.com',
        check_in: "2024-02-14",
        check_out: "2024-02-18",
        discount: 15
    }
]

describe("Check variable types", () => {
    const room = new Room(roomsTemplate[0].name, roomsTemplate[0].rate, roomsTemplate[0].discount);
    const booking1 = new Booking(
        bookingsTemplate[0].name,
        bookingsTemplate[0].email,
        bookingsTemplate[0].check_in,
        bookingsTemplate[0].check_out,
        bookingsTemplate[0].discount
    )

    console.log(booking1)

    test('Room name is a string', () => {
        expect(typeof room.name).toBe('string')
    })

    test('Room rate is a number', () => {
        expect(typeof room.rate).toBe('number')
    })
})