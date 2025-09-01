
// src/app/api/recaptcha/route.ts
export async function POST(request: Request) {

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Méthode non autorisée.' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Analysez le corps de la requête
  const body = await request.json();

  const { captchaToken } = body ;
  
  if (!captchaToken) {
    return new Response(JSON.stringify({ success: false, message: 'Jeton reCAPTCHA manquant.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
  
  try {
    const response = await fetch(verificationUrl, { method: 'POST' });
    const data = await response.json();

    if (data.success) {
      // reCAPTCHA validé : Traitez le formulaire ici (e.g., enregistrer dans une base de données, envoyer un email)
      return new Response(JSON.stringify({ success: true, message: 'Formulaire soumis avec succès.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      console.log('reCAPTCHA non valide :', data['error-codes']);
      return new Response(JSON.stringify({ success: false, message: 'Vérification reCAPTCHA échouée.' + data }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

  } catch (error) {
    console.error('Erreur lors de la vérification reCAPTCHA :', error);
    return new Response(JSON.stringify({ success: false, message: 'Erreur interne du serveur.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}