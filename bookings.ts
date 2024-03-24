import { RoomInterface } from './rooms';

export interface BookingInterface {
    name: string
    email: string
    check_in: string
    check_out: string
    discount: number
    room: RoomInterface | null
}