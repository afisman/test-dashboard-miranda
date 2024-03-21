const { Room, Booking } = require('./index');

const roomsTemplate = [
    {
        name: 'Suite-142',
        rate: 250,
        discount: 10
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
        check_in: "2024-03-01",
        check_out: "2024-03-07",
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
        check_in: "2024-03-01",
        check_out: "2024-03-07",
        discount: 15
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
        check_in: "2024-03-01",
        check_out: "2024-03-07",
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

    const roomPriceInCents = (room.rate - (room.rate * (room.discount / 100))) * 100;

    test('Room rate is in cents', () => {
        expect(room.getRateInCents()).toEqual(roomPriceInCents)
    })
})

describe('Tests occupied methods in Room object', () => {
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

    test('Room is occupied in 2024-03-06', () => {
        expect(room.isOccupied("2024-03-06")).toEqual(true)
    })
    test('Room is not occupied in 2024-02-07', () => {
        expect(room.isOccupied("2024-02-07")).toBeFalsy()
    })
    test('Room is not occupied in 2024-04-07', () => {
        expect(room.isOccupied("2024-04-07")).toBeFalsy()
    })
})

describe('Tests occupancy percentage for room method in Room object', () => {
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

    test('Room percentage of occupancy between 2024-02-06 and 2024-03-01 to equal 0', () => {
        expect(room.occupancyPercentage("2024-02-06", "2024-02-08")).toEqual(0)
    })
    test('Room percentage of occupancy between 2024-02-06 and 2024-03-01', () => {
        expect(room.occupancyPercentage("2024-03-01", "2024-03-04")).toEqual(100)
    })
})

describe('Tests occupancy percentage for room method in Room object', () => {
    const room1 = new Room({ ...roomsTemplate[0] });
    const room2 = new Room({ ...roomsTemplate[1] });
    const room3 = new Room({ ...roomsTemplate[2] });

    const booking1 = new Booking(
        { ...bookingsTemplate[0], room: room2 }
    )
    const booking2 = new Booking(
        { ...bookingsTemplate[1], room: room1 }
    )
    const booking3 = new Booking(
        { ...bookingsTemplate[2], room: room1 }
    )
    const booking4 = new Booking(
        { ...bookingsTemplate[3], room: room3 }
    )
    const booking5 = new Booking(
        { ...bookingsTemplate[4], room: room1 }
    )

    room1.bookings = [booking5, booking2, booking3]
    room2.bookings = [booking1]
    room3.bookings = [booking4]

    test('Room percentage of occupancy between 2024-03-02 and 2024-03-04, 100%', () => {
        expect(Room.totalOccupancyPercentage([room1, room2, room3], "2024-03-02", "2024-03-04")).toEqual(100)
    })
    test('Room percentage of occupancy between 2024-02-23 and 2024-02-29, 0%', () => {
        expect(Room.totalOccupancyPercentage([room1, room2, room3], "2024-02-23", "2024-02-29")).toEqual(0)
    })
    test('Room percentage of occupancy between 2024-03-06 and 2024-03-09, 25%', () => {
        expect(Room.totalOccupancyPercentage([room1, room2, room3], "2024-03-06", "2024-03-09")).toEqual(25)
    })
    test('Room percentage of occupancy between 2024-03-05 and 2024-03-09, 40%', () => {
        expect(Room.totalOccupancyPercentage([room1, room2, room3], "2024-03-05", "2024-03-09")).toEqual(40)
    })
    test('Room percentage of occupancy between 2024-02-27 and 2024-03-03, 50%', () => {
        expect(Room.totalOccupancyPercentage([room1, room2, room3], "2024-02-27", "2024-03-03")).toEqual(50)
    })
})

describe('Tests available rooms for room method in Room object', () => {
    const room1 = new Room({ ...roomsTemplate[0] });
    const room2 = new Room({ ...roomsTemplate[1] });
    const room3 = new Room({ ...roomsTemplate[2] });

    const booking1 = new Booking(
        { ...bookingsTemplate[0], check_in: '2024-02-13', check_out: '2024-02-16', room: room2 }
    )
    const booking2 = new Booking(
        { ...bookingsTemplate[1], room: room1 }
    )
    const booking3 = new Booking(
        { ...bookingsTemplate[2], room: room1 }
    )
    const booking4 = new Booking(
        { ...bookingsTemplate[3], room: room3 }
    )
    const booking5 = new Booking(
        { ...bookingsTemplate[4], room: room1 }
    )

    room1.bookings = [booking5, booking2, booking3]
    room2.bookings = [booking1]
    room3.bookings = [booking4]

    test('Available rooms between 2024-02-06 and 2024-02-06 to return all rooms', () => {
        expect(Room.availableRooms([room1, room2, room3], "2024-02-06", "2024-02-08")).toEqual([room1, room2, room3])
    })
    test('Available rooms between 2024-03-01 and 2024-03-05 to return room2', () => {
        expect(Room.availableRooms([room1, room2, room3], "2024-03-01", "2024-03-05")).toEqual([room2])
    })
    test('Available rooms between 2024-02-14 and 2024-03-05 to return empty array', () => {
        expect(Room.availableRooms([room1, room2, room3], "2024-02-14", "2024-03-05")).toMatchObject([])
    })
})


describe('Tests get fee in booking', () => {
    const room = new Room({ ...roomsTemplate[0] });

    const booking1 = new Booking(
        { ...bookingsTemplate[0], room: room }
    )
    const booking2 = new Booking(
        { ...bookingsTemplate[1], discount: 110, room: room }
    )
    const booking3 = new Booking(
        { ...bookingsTemplate[2], discount: -10, room: room }
    )

    room.bookings = [booking1, booking2, booking3]

    test('Booking fee in booking 1', () => {
        expect(booking1.getFee()).toEqual(20250)
    })
    test('Booking fee in booking 2, discount more than 100', () => {
        expect(booking2.getFee()).toEqual(0)
    })
    test('Booking fee in booking 3, less than 0 discount', () => {
        expect(booking3.getFee()).toEqual(22500)
    })

})