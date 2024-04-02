import { Room } from './index';

export interface BookingInterface {
    name: string
    email: string
    check_in: string
    check_out: string
    discount: number
    room: Room | null
}
