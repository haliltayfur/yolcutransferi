// PATH: /lib/mailUtils.js
import nodemailer from "nodemailer";
import ReactDOMServer from "react-dom/server";
import AdvantagesBar from "@/app/components/AdvantagesBar";

// GMAIL için örnek transport. Prod'da kendi SMTP bilgilerini gir!
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // .env dosyandan alınacak
    pass: process.env.MAIL_PASS,
  },
});

export async function sendWelcomeMail(email, ad, soyad, uyeno = "") {
  const advantagesHtml = ReactDOMServer.renderToStaticMarkup(<AdvantagesBar />);
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
      ${advantagesHtml}
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
