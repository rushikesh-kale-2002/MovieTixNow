import axios from 'axios'
import { config } from './config'
import { toast } from 'react-toastify'
export async function loginUser(email, password) {
    try {
        const url = `${config.serverUrl}/user/signin`
        const body = {
            email, password
        }
        const response = await axios.post(url, body)
        console.log(response)
        return response
    } catch (error) {
        return error.response
    }
}


export async function registerUser(firstname, lastname, email, password, mobile_no, gender, role, dob, addr_line1, addr_line2, town_city, state, pincode, district) {
    try {
        const url = `${config.serverUrl}/user/signup`
        const body = { firstname, lastname, email, password, mobile_no, gender, role, dob, address: { addr_line1, addr_line2, town_city, state, pincode, district } }
        const response = await axios.post(url, body)
        return response
    } catch (error) {
        return error.response
    }
}

export async function fetchUserDetails() {
    const url = `${config.serverUrl}/user/profile`
    const token = localStorage.getItem("token");
    if (!token) {
        console.warn("No token found in session storage");
        return;
    }
    try {
        const response = await axios.get(`${config.serverUrl}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const userData = response.data;
        // Store user data in session storage
        sessionStorage.setItem("user", JSON.stringify(userData));
        return userData
    } catch (error) {
        toast.error(`Error: ${error.response.data.msg}`)
        return null
    }
}



export async function updateUser(id, firstname, lastname, email, password, mobile_no, gender, role, dob, addr_line1, addr_line2, town_city, state, pincode, district) {
    try {
        const url = `${config.serverUrl}/user/update`
        const body = {
            id, firstname, lastname, email, password, mobile_no, gender, role, dob, address: { addr_line1, addr_line2, town_city, state, pincode, district }
        }
        const result = await axios.put(url, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return result
    } catch (error) {
        return error.response
    }
}


export async function updatePassword(id, oldPassword, newPassword) {
    try {
        const url = `${config.serverUrl}/user/password`
        const body = { id, oldPassword, newPassword }
        const result = await axios.post(url, body)
        console.log(result)
        return result
    } catch (error) {
        return error.response
    }
}
