
export const fetchAPI = async (url: string, method: string, headers: any, body: any, timeout: number = 60000 * 3) => {

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    
    try {
        
        headers = {
            'Content-Type': 'application/json',
            ...headers
        }

        let res: any;

        if (method === 'GET' || method === 'DELETE') {
            res = await fetch(url, {
                method: method,
                headers: headers,
                signal: controller.signal
            })
        }
        else {
            res = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(body),
                signal: controller.signal
            })
        }
        return await res.json()
    } catch (error: any) {
        if (error.name === "AbortError"){
            return await new Promise<any>((resolve, _) => {
                resolve({ code: 520, message: 'delai_depasse' })
            })
        }        
        else {            
            return await new Promise<any>((resolve, _) => {
                resolve({ code: 521, message: error.message })
            })
        }
    }
    finally {
        clearTimeout(timer);
    }
}
