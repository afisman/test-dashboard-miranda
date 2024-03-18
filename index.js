class Room {
    constructor(name, rate, discount, bookings) {
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;
    }

    getRateInCents() {
        return (this.rate - (this.discount / 100)) * 100
    }

    isOccupied(date) {

    }

    occupancyPercentage(startDate, endDate) {

    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {

    }

    static availableRooms() { }
}

class Booking {
    constructor(name, email, check_in, check_out, discount, room) {
        this.name = name;
        this.email = email;
        this.check_in = check_in;
        this.check_out = check_out;
        this.discount = discount;
        this.room = room;
    }

    getFee() {

    }
}

module.exports = { Room, Booking }