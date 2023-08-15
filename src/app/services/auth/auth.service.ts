import { Injectable } from "@angular/core";
import { sleep } from "src/lib/utils";

import IUser from "../../interfaces/users/user.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private users: IUser[] = [
        { id: 1, name: 'Cesar Aguayo',   email: 'cesar@ejemplo.com',  password: '1234' },
        { id: 2, name: 'Arturo Camargo', email: 'arturo@ejemplo.com', password: '1234' }
    ];

    constructor() {}

    async login(email: string, password: string): Promise<boolean> {
        try {
            const userFound = this.users.find((user) => user.email === email && user.password === password);
            await sleep(1500);
            if (!userFound) throw new Error('Usuario no encontrado.');
            localStorage.setItem('isLogged', JSON.stringify(userFound));
            return true;
        } catch (err: any) {
            localStorage.clear();
            return false;
        }
    }

    logout() {
        localStorage.clear();
    }

    signIn(name: string, email: string, password: string) {
        const lastUser = this.users[this.users.length - 1];
        const newUser = { name, email, password, id: lastUser.id + 1 };
        this.users = [...this.users, newUser];
        localStorage.setItem('isLogged', JSON.stringify(newUser));
    }

}