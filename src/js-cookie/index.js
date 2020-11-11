import Cookies from 'js-cookie'

export const setCookie = function(key, value, time) {
    Cookies.set(key, value, { expires: time });
}
export const getCookie = function(key) {
    return Cookies.get(key);
}
export const removeCookie = function(key) {
    Cookies.remove(key);
}