import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { ad, telefon, email, konu, mesaj } = body;

    const response = await resend.emails.send({
      from: "info@yolcutransferi.com",
      to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
      subject: `Yeni İletişim Mesajı: ${konu}`,
      html: `
        <h2>Yeni Mesaj Alındı</h2>
        <p><strong>Ad:</strong> ${ad}</p>
        <p><strong>Telefon:</strong> ${telefon}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Konu:</strong> ${konu}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${mesaj}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true, data: response }), {
      status: 200,
    });
  } catch (error) {
    console.error("Resend hata:", error);
    return new Response(
      JSON.stringify({ error: "E-posta gönderilemedi." }),
      { status: 500 }
    );
  }
}
