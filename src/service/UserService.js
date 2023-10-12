import axios from "axios";
const USER_MANAGEMENT_API = "http://localhost:8080/api";
export const login = async (loginData) => {
    let result = null;
    try {
        result = await axios.post(`${USER_MANAGEMENT_API}/auth/login`, loginData);
        console.log(result)
    } catch (e) {
    }
    return result;
};

export const register = async (registerData) => {
    let result = null;
    try {
        result = await axios.post(
            `${USER_MANAGEMENT_API}/register-user`,
            registerData
        );
    } catch (e) {
        result = e.response;
    }
    return result;
};
export const logout = async () => {
    let result = null;
    let token = localStorage.getItem("token");
    try {
        result = await axios(
            {
                url: `${USER_MANAGEMENT_API}/auth/logout`,
                method: "POST",
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        );
        console.log(result)
    } catch (e) {
        result = e.response;
    }
    return result;
};