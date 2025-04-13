import { fetchAPI } from ".";
import { BASE_URL } from "./constantes";


export async function createActualite(body: any) {
    try {
        let url = `${BASE_URL}/actualites`;
        const headers = {}
        return await fetchAPI(url, 'POST', headers, JSON.stringify(body));

    } catch (error) {
        throw new Error('Failed to create actualite data.');
    }
}


export async function createMessage(body: any) {
    try {
        let url = `${BASE_URL}/mot_archeve`;
        const headers = {}
        return await fetchAPI(url, 'POST', headers, JSON.stringify(body));

    } catch (error) {
        throw new Error('Failed to create message data.');
    }
}

export async function fetchMessages(params: string = "") {
    try {
        let url = `${BASE_URL}/mot_archeve${params}`;
        let body = {}
        const headers = {}
        return await fetchAPI(url, 'GET', headers, JSON.stringify(body));

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch mot_archeve data.');
    }
}

export async function fetchActualites(params: string = "") {
    try {
        let url = `${BASE_URL}/actualites${params}`;
        let body = {}
        const headers = {}
        return await fetchAPI(url, 'GET', headers, JSON.stringify(body));

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch actualites data.');
    }
}


export async function createGalerie(body: any) {
    try {
        let url = `${BASE_URL}/galeries`;
        const headers = {}
        return await fetchAPI(url, 'POST', headers, body);

    } catch (error) {
        throw new Error('Failed to create message data.');
    }
}

export async function fetchCategories(params: string = "") {
    try {
        let url = `${BASE_URL}/categories${params}`;
        let body = {}
        const headers = {}
        return await fetchAPI(url, 'GET', headers, body);

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch categories data.');
    }
}