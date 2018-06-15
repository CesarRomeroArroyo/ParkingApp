import { UserModel } from './userModel';
export class ParkingModel {
    id: string;
    parkingNumber: number;
    parkingState: boolean;
    userInParking: UserModel;
    userVehicle: string;
}
