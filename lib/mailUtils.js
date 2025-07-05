// PATH: /lib/mailUtils.js
import nodemailer from "nodemailer";

// Burada JSX yerine düz HTML string!
const advantagesHTML = `
  <ul style="padding-left:0;list-style:none;">
    <li>✔ Tam Gizlilikte VIP Transfer</li>
    <li>✔ Çok Dilli, Eğitimli Sürücüler</li>
    <li>✔ TÜRSAB Belgeli, Sigortalı Güven</li>
    <li>✔ 5+ Yıllık Tecrübeli Şoförler</li>
    <li>✔ VIP Havalimanı & Şehirlerarası Transfer</li>
    <li>✔ Büyük Gruplara Minibüs & Dron Transfer</li>
    <li>✔ Ultra Lüks Araçlar</li>
    <li>✔ Havalimanı Karşılama</li>
    <li>✔ Ücretsiz Wi-Fi</li>
    <li>✔ 7/24 Müşteri Destek Hattı</li>
  </ul>
`;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendWelcomeMail(email, ad, soyad, uyeno = "") {
  const html = `
    <div style="font-family:sans-serif;">
      <h2>YolcuTransferi.com'a Hoş Geldiniz ${ad ? ad : ""} ${soyad ? soyad : ""}!</h2>
      <p>
        YolcuTransferi ailesine katıldığınız için teşekkür ederiz.<br/>
        <b>Üye Numaranız:</b> ${uyeno}<br/>
        Sizi ayrıcalıklı transfer dünyasına davet ediyoruz.<br/>
        İlk transferinizde size özel sürprizler ve kurumsal fırsatlar sunuyoruz!
      </p>
      <p style="font-size:17px;color:#bfa658;font-weight:bold;">Neden YolcuTransferi?</p>
      ${advantagesHTML}
      <p>Her zaman VIP hizmet, tam gizlilik ve yasal güvence ile...</p>
      <p>Keyifli yolculuklar dileriz!<br/><b>YolcuTransferi.com Ekibi</b></p>
    </div>
  `;
  await transporter.sendMail({
    from: `"YolcuTransferi.com" <info@yolcutransferi.com>`,
    to: email,
    subject: "YolcuTransferi.com - Hoş Geldiniz!",
    html,
  });
}

export async function sendResetPasswordMail(email, newPass) {
  const html = `
    <div style="font-family:sans-serif;">
      <h2>YolcuTransferi.com Şifre Sıfırlama</h2>
      <p>Yeni şifreniz: <b>${newPass}</b></p>
      <p>Lütfen güvenliğiniz için ilk girişte şifrenizi değiştiriniz.</p>
      <p>YolcuTransferi.com ekibi</p>
    </div>
  `;
  await transporter.sendMail({
    from: `"YolcuTransferi.com" <info@yolcutransferi.com>`,
    to: email,
    subject: "YolcuTransferi.com Şifre Sıfırlama",
    html,
  });
}
// PATH: /lib/mailUtils.js
