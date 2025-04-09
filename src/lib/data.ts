import { fetchAPI } from ".";
import { BASE_URL } from "./constantes";



export async function createMessage(body: any) {
    try {
        let url = `${BASE_URL}/mot_archeve`;
        const headers = {}
        return await fetchAPI(url, 'POST', headers, body);

    } catch (error) {
        throw new Error('Failed to create message data.');
    }
}