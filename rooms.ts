import { Booking } from "./index";

export interface RoomInterface {
    name: string
    rate: number
    discount: number
    bookings: Booking[] | []
}
