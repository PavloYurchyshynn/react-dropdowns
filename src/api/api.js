import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://autobooking.com/api/test/v1/'
})

export const API = {
    getTerms() {
        return instance.get('search/terms')
    },
    getBrands() {
        return instance.get('search/brands_terms')
    },
    // getStyles() {
    //     return instance.get('search/styles')
    // }
}