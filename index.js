class Room {
    constructor({ name, rate, discount, bookings }) {
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;
    }

    getRateInCents() {
        return (this.rate - (this.discount / 100)) * 100
    }

    discountError() {
        if (this.discount < 0 || this.discount >= 100) {
            throw new Error('The discount number needs to be lower between 0 and 100')
        } else {
            return this.discount;
        }
    }

    isOccupied(date) {
        let occupied = false;
        let formattedDate = new Date(date)
        this.bookings.map((booking) => {
            if (new Date(booking.check_in) <= formattedDate && formattedDate < new Date(booking.check_out))
                occupied = true
        })
        return occupied
    }

    occupancyPercentage(startDate, endDate) {

    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {

    }

    static availableRooms() { }
}

class Booking {
    constructor({ name, email, check_in, check_out, discount, room }) {
        this.name = name;
        this.email = email;
        this.check_in = check_in;
        this.check_out = check_out;
        this.discount = discount;
        this.room = room;
    }

    discountError() {
        if (this.discount + this.room.discount < 0 || this.discount + this.room.discount >= 100) {
            throw new Error('The discount number needs to be lower between 0 and 100')
        } else {
            return this.discount;
        }
    }

    getFee() {

    }
}

module.exports = { Room, Booking }