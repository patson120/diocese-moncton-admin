
import { useState } from 'react';


const useRecaptcha = () => {

    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    // Your hook logic here (if any)

    const handleRecaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
    }

    const verifyRecaptchaToken = async () => {
        return await fetch('/api/recaptcha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ captchaToken }),
        });
    }

    return {
        // Return any values or functions you want to expose from the hook
        captchaToken,
        handleRecaptchaChange,
        verifyRecaptchaToken
    }
}

export default useRecaptcha;