import Axios from 'axios';

Axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';

export const HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    PUT: 'PUT'
};

export const API_URL = "http://localhost:8888";

// export const API_URL = "http://47.105.229.2:8080";

export class HttpService {
    _instance = Axios.create({
        baseURL: API_URL
    });
    _TAG = 'HttpService';

    async get(path, params) {
        try {
            let res = await this._instance.get(path, {
                params: params,
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            });
            if (res.status < 200 || res.status >= 400) {
                throw new Error(`${res.status}`);
            }
            return res.data;
        } catch (e) {
            throw e;
        }
    }

    async post(path, params) {
        try {
            let res = await this._instance.post(path, params, {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            });
            if (res.status < 200 || res.status >= 400) {
                throw new Error(`${res.status}`);
            }
            return res.data;
        } catch (e) {
            throw e;
        }
    }

    async put(path, params) {
        try {
            let res = await this._instance.put(path, params, {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            });
            if (res.status < 200 || res.status >= 400) {
                throw new Error(`${res.status}`);
            }
            return res.data;
        } catch (e) {
            throw e;
        }
    }

    async delete(path, params) {
        try {
            let res = await this._instance.delete(path, {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            });
            if (res.status < 200 || res.status >= 400) {
                throw new Error(`${res.status}`);
            }
            return res.data;
        } catch (e) {
            throw e;
        }
    }
}

const http = new HttpService();
export default http;