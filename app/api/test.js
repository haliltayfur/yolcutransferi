import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const result = await resend.emails.send({
      from: 'YolcuTransferi KVKK <info@yolcutransferi.com>',
      to: ['byhaliltayfur@hotmail.com'],
      subject: 'Test Mail',
      html: '<p>Bu sadece testtir</p>',
    });

    console.log("✅ Mail gönderildi:", result);
    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error("❌ Mail gönderim hatası:", error);
    return Response.json({ success: false, error: String(error) });
  }
}
