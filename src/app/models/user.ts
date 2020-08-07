import { AuthService } from 'src/app/services/auth.service';
export class User {
    name: string;
    age: number;
    workplace: string;
    // tslint:disable-next-line: variable-name
    licence_no: number;
    sex: string;
    address: string;
    specialization: string;
    // tslint:disable-next-line: variable-name
    reg_date: string;
    username: string;

    constructor(private authService: AuthService) {}

    getName() {
        this.name = this.authService.doctor.name;
        return this.name;
    }
}
