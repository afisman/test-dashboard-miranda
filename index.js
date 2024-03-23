class Room {
    constructor({ name, rate, discount, bookings }) {
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;
    }

    getRateInCents() {
        const CENTS = 100;
        const discountedRate = (this.rate * (this.discount / 100))
        return (this.rate - discountedRate) * CENTS
    }

    isOccupied(date) {
        let occupied = false;
        let formattedDate = new Date(date)
        this.bookings.forEach((booking) => {
            if (new Date(booking.check_in) <= formattedDate && formattedDate < new Date(booking.check_out))
                occupied = true
        })
        return occupied
    }

    occupancyPercentage(startDate, endDate) {
        let occupiedDays = 0;
        let totalDays = 0;

        const firstDate = new Date(startDate);
        const secondDate = new Date(endDate);


        while (firstDate <= secondDate) {
            totalDays++
            if (this.isOccupied(firstDate.toString())) {
                occupiedDays++
            }

            firstDate.setDate(firstDate.getDate() + 1)
        }

        return Math.round((occupiedDays / totalDays) * 100)
    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {
        let totalSum = 0

        rooms.forEach(room => {
            totalSum += room.occupancyPercentage(startDate, endDate)
        })
        return Math.round(totalSum / rooms.length)
    }

    static availableRooms(rooms, startDate, endDate) {
        return rooms.filter(room => (
            room.occupancyPercentage(startDate, endDate) === 0
        ))
    }
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

    getFee() {
        const correctedDiscount1 = Math.min(100, this.discount)
        const correctedDiscount2 = Math.max(0, correctedDiscount1)

        const fee = this.room.getRateInCents() - (correctedDiscount2 / 100) * this.room.getRateInCents();
        const feePerstay =
        return fee;
    }
}

module.exports = { Room, Booking }