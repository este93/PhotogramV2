export const apiDomain = 'http://192.168.0.154:8000/api/auth/login'
export const loginUrl = apiDomain + 'token'
export const userUrl = apiDomain
export const registerUrl = 'http://192.168.0.154:8000/api/auth/signup'
export const forgotPassword = 'http://192.168.0.154:8000/api/auth/recovery'
export const resetPassword = 'http://192.168.0.154:8000/api/auth/reset'
export const rootUrl = 'http://192.168.0.154:8000/api/'

export const getHeader = function(){
    const tokenData = JSON.parse(window.localStorage.getItem('authUser'))

    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer' + tokenData.access_token
    }
    return headers
}
