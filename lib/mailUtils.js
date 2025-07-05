// PATH: /lib/mailUtils.js
import nodemailer from "nodemailer";

// (Statik avantaj listesi kullan, JSX YOK!)
const advantageHtml = `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
    <div><b>✓ Tam Gizlilikte VIP Transfer</b><br/>Tüm yolculuklarınızda %100 gizlilik ve ayrıcalık.</div>
    <div><b>✓ Çok Dilli, Eğitimli Sürücüler</b><br/>Uluslararası deneyimli, yabancı dil bilen şoförler.</div>
    <div><b>✓ TÜRSAB Belgeli, Sigortalı Güven</b><br/>Yasal, sigortalı ve belgeli transfer.</div>
    <div><b>✓ 7/24 Müşteri Destek Hattı</b><br/>Günün her saati canlı destek.</div>
    <!-- ... tüm avantajları ekle ... -->
  </div>
`;

export async function sendWelcomeMail(email, ad, soyad) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // SMTP bilgilerini .env'den çek!
    port: process.env.SMTP_PORT || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    from: '"YolcuTransferi" <info@yolcutransferi.com>',
    to: email,
    subject: "YolcuTransferi.com Hoş Geldiniz!",
    html: `
      <div style="font-family:sans-serif">
        <h2>Merhaba ${ad || ""} ${soyad || ""},</h2>
        <p>YolcuTransferi.com’a hoş geldiniz! Sizi ayrıcalıklı bir transfer deneyimi bekliyor.<br/>
        İlk transferinize özel sürpriz hediyeler ve VIP avantajlar sunuyoruz.</p>
        <h3 style="color:#bfa658;">Neden YolcuTransferi?</h3>
        ${advantageHtml}
        <hr />
        <div style="font-size:13px;color:#777;">Sorunuz olursa 7/24 bizimle iletişime geçebilirsiniz.<br/>Keyifli yolculuklar!</div>
      </div>
    `
  });
}

export async function sendResetPasswordMail(email, newPass) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    from: '"YolcuTransferi" <info@yolcutransferi.com>',
    to: email,
    subject: "YolcuTransferi.com Yeni Şifre",
    html: `
      <div style="font-family:sans-serif">
        <h2>Şifre Yenilendi</h2>
        <p>Yeni şifreniz: <b>${newPass}</b></p>
        <p>Lütfen ilk girişte şifrenizi değiştirin.<br/>Güvenliğiniz için eski şifreniz geçersiz kılındı.</p>
      </div>
    `
  });
}
// PATH: /lib/mailUtils.js
