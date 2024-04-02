import { RoomInterface } from "./rooms";
import { BookingInterface } from "./bookings";


export class Room implements RoomInterface {
    name: string
    rate: number
    discount: number
    bookings: Booking[] | []

    constructor({ name, rate, discount, bookings }: RoomInterface) {

        this.name = name;
        this.rate = rate;
        this.discount = discount;
        this.bookings = bookings;

    }

    getRateInCents(): number {
        const CENTS = 100;
        const discountedRate = (this.rate * (this.discount / 100));
        return (this.rate - discountedRate) * CENTS;
    }

    isOccupied(date: string): boolean {
        let occupied = false;
        let formattedDate = new Date(date);
        this.bookings?.forEach((booking) => {
            if (new Date(booking.check_in) <= formattedDate && formattedDate < new Date(booking.check_out))
                occupied = true;
        })
        return occupied;
    }

    occupancyPercentage(startDate: string, endDate: string): number {
        let occupiedDays: number = 0;
        let totalDays: number = 0;

        const firstDate: Date = new Date(startDate);
        const secondDate: Date = new Date(endDate);


        while (firstDate <= secondDate) {
            totalDays++;
            if (this.isOccupied(firstDate.toString())) {
                occupiedDays++;
            }

            firstDate.setDate(firstDate.getDate() + 1);
        }

        return Math.round((occupiedDays / totalDays) * 100);
    }

    static totalOccupancyPercentage(rooms: Room[], startDate: string, endDate: string): number {
        let totalSum: number = 0;

        rooms.forEach(room => {
            totalSum += room.occupancyPercentage(startDate, endDate);
        })
        return Math.round(totalSum / rooms.length);
    }

    static availableRooms(rooms: Room[], startDate: string, endDate: string): Room[] {
        return rooms.filter(room => (
            room.occupancyPercentage(startDate, endDate) === 0
        ));
    }
}


export class Booking implements BookingInterface {
    name: string
    email: string
    check_in: string
    check_out: string
    discount: number
    room: Room | null

    constructor({ name, email, check_in, check_out, discount, room }: BookingInterface) {
        this.name = name;
        this.email = email;
        this.check_in = check_in;
        this.check_out = check_out;
        this.discount = discount;
        this.room = room;
    }

    getFee(): number {
        const correctedDiscount1: number = Math.min(100, this.discount);
        const correctedDiscount2: number = Math.max(0, correctedDiscount1);

        const bookingLength: number = getBookingLength(this.check_in, this.check_out);
        let fee: number = 0;
        if (this.room) {
            fee = this.room.getRateInCents() - (correctedDiscount2 / 100) * this.room.getRateInCents();
        }
        return fee * bookingLength;
    }
}

function getBookingLength(startDate: string, endDate: string): number {
    const start: Date = new Date(new Date(startDate));
    const end: Date = new Date(new Date(endDate));

    const date: Date = new Date(start.getTime());
    let dates: string[] = [];

    while (date <= end) {
        dates.push(new Date(date).toISOString().slice(0, 10));
        date.setDate(date.getDate() + 1);
    }
    return dates.length - 1;
}

