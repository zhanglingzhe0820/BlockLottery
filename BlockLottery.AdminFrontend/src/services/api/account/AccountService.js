import http from '../HttpService';

export class AccountServiceImpl {
    async login(loginData) {
        return await http.get(
            '/account/login', loginData
        )
    }

    async register(registerData){
        return await http.get(
            '/account/register', registerData
        )
    }
}
