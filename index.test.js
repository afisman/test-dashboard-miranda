const { Room, Booking } = require('./index');

const roomsTemplate = [
    {
        name: 'Suite-142',
        rate: 265.10,
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
    const room = new Room({ ...roomsTemplate[0] });
    const booking1 = new Booking(
        { ...bookingsTemplate[0], room: room }
    )
    const booking2 = new Booking(
        { ...bookingsTemplate[1], room: room }
    )
    const booking3 = new Booking(
        { ...bookingsTemplate[2], room: room }
    )


    room.bookings = [booking1, booking2, booking3]


    test('Room name is a string', () => {
        expect(typeof room.name).toBe('string')
    })

    test('Room rate is a number', () => {
        expect(typeof room.rate).toBe('number')
    })
    test('Room discount is a number', () => {
        expect(typeof room.discount).toBe('number')
    })
    test('Room bookings array is defined', () => {
        expect(room.bookings).toBeDefined()
    })
    test('Room bookings array contains booking1 and booking2', () => {
        expect(room.bookings).toEqual(expect.arrayContaining([booking1]))
    })

    test('Booking name is a string', () => {
        expect(typeof booking1.name).toBe('string')
    })
    test('Booking email is a string', () => {
        expect(typeof booking1.email).toBe('string')
    })
    test('Booking check_in is a string', () => {
        expect(typeof booking1.check_in).toBe('string')
    })
    test('Booking check_out is a string', () => {
        expect(typeof booking1.check_out).toBe('string')
    })
    test('Booking discount is a number', () => {
        expect(typeof booking1.discount).toBe('number')
    })
    test('Booking room is defined', () => {
        expect(typeof booking1.room).toBeDefined()
    })
    test('Booking room equals Room object', () => {
        expect(booking1.room).toEqual(room)
    })
})

describe('Test methods in Room object', () => {
    const room = new Room({ ...roomsTemplate[0] });

    const booking1 = new Booking(
        { ...bookingsTemplate[0], room: room }
    )
    const booking2 = new Booking(
        { ...bookingsTemplate[1], room: room }
    )
    const booking3 = new Booking(
        { ...bookingsTemplate[2], room: room }
    )

    room.bookings = [booking1, booking2, booking3]


    const roomPriceInCents = (room.rate - (room.discount / 100)) * 100;


    test('Room rate is in cents', () => {
        expect(room.getRateInCents()).toEqual(roomPriceInCents)
    })
})