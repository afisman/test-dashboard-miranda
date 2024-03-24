import { RoomInterface } from './rooms';

export interface BookingInterface {
    name: string
    email: string
    check_in: string
    check_out: string
    discount: number
    room: RoomInterface | null
}

export class Booking implements BookingInterface {
    name: string
    email: string
    check_in: string
    check_out: string
    discount: number
    room: RoomInterface | null

    constructor(name: string, email: string, check_in: string, check_out: string, discount: number, room: RoomInterface | null) {
        this.name = name,
            this.email = email,
            this.check_in = check_in,
            this.check_out = check_out,
            this.discount = discount,
            this.room = room
    }

    getFee(): number {
        const correctedDiscount1: number = Math.min(100, this.discount)
        const correctedDiscount2: number = Math.max(0, correctedDiscount1)

        const bookingLength: number = getBookingLength(this.check_in, this.check_out)
        let fee: number = 0
        if (this.room) {
            fee = this.room?.getRateInCents() - (correctedDiscount2 / 100) * this.room?.getRateInCents();
        }
        return fee * bookingLength
    }
}

function getBookingLength(startDate: string, endDate: string): number {
    const start: Date = new Date(new Date(startDate))
    const end: Date = new Date(new Date(endDate))

    const date: Date = new Date(start.getTime())
    let dates: string[] = [];

    while (date <= end) {
        dates.push(new Date(date).toISOString().slice(0, 10));
        date.setDate(date.getDate() + 1);
    }
    return dates.length - 1;
}

export default Booking