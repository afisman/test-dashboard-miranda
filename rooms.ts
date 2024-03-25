import Booking from "./bookings";

export interface RoomInterface {
    name: string
    rate: number
    discount: number
    bookings: Booking[] | null
}

export class Room implements RoomInterface {
    name: string
    rate: number
    discount: number
    bookings: Booking[] | null

    constructor({ name, rate, discount, bookings }: RoomInterface) {

        this.name = name,
            this.rate = rate,
            this.discount = discount,
            this.bookings = bookings

    }

    getRateInCents(): number {
        const CENTS = 100;
        const discountedRate = (this.rate * (this.discount / 100))
        return (this.rate - discountedRate) * CENTS
    }

    isOccupied(date: string): boolean {
        let occupied = false;
        let formattedDate = new Date(date)
        this.bookings?.forEach((booking) => {
            if (new Date(booking.check_in) <= formattedDate && formattedDate < new Date(booking.check_out))
                occupied = true
        })
        return occupied
    }

    occupancyPercentage(startDate: string, endDate: string): number {
        let occupiedDays: number = 0;
        let totalDays: number = 0;

        const firstDate: Date = new Date(startDate);
        const secondDate: Date = new Date(endDate);


        while (firstDate <= secondDate) {
            totalDays++
            if (this.isOccupied(firstDate.toString())) {
                occupiedDays++
            }

            firstDate.setDate(firstDate.getDate() + 1)
        }

        return Math.round((occupiedDays / totalDays) * 100)
    }

    static totalOccupancyPercentage(rooms: Room[], startDate: string, endDate: string): number {
        let totalSum: number = 0

        rooms.forEach(room => {
            totalSum += room.occupancyPercentage(startDate, endDate)
        })
        return Math.round(totalSum / rooms.length)
    }

    static availableRooms(rooms: Room[], startDate: string, endDate: string): Room[] {
        return rooms.filter(room => (
            room.occupancyPercentage(startDate, endDate) === 0
        ))
    }
}

export default Room