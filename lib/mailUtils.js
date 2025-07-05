// PATH: lib/mailUtils.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.yourmailserver.com", // SMTP bilgilerini buraya
  port: 587,
  secure: false,
  auth: {
    user: "info@yolcutransferi.com",
    pass: "MAIL_PASSWORD",
  },
});

export async function sendWelcomeMail(email, ad, soyad) {
  await transporter.sendMail({
    from: '"YolcuTransferi.com" <info@yolcutransferi.com>',
    to: email,
    subject: "YolcuTransferi.com'a Hoş Geldiniz!",
    html: `
      <div style="font-family:Arial;background:#19160a;color:#ffeec2;border-radius:16px;padding:36px 20px 24px 20px;max-width:580px;margin:auto;border:2px solid #FFD700">
        <h1 style="color:#FFD700;font-size:2.2em;margin-bottom:6px;">Hoş Geldiniz ${ad || ""} ${soyad || ""}!</h1>
        <p style="font-size:1.17em;margin:12px 0 22px 0;">
          YolcuTransferi.com ailesine katıldığınız için teşekkür ederiz.<br />
          <b>VIP transfer dünyasının ayrıcalıkları şimdi sizinle!</b>
        </p>
        <ul style="font-size:1.13em;line-height:1.6;margin-bottom:20px;">
          <li>• İlk transferinizde sürpriz hediyeler ve avantajlar!</li>
          <li>• Lüks, güvenli ve tam zamanında yolculuk deneyimi</li>
          <li>• 7/24 Müşteri desteği ve kişisel çözüm hattı</li>
          <li>• Dilediğiniz aracı anında seçin, rahatınıza bakın</li>
        </ul>
        <div style="display:flex;gap:18px;margin:24px 0;">
          <div style="background:#ffd70022;border-radius:12px;padding:16px 10px;flex:1;min-width:150px;">
            <h2 style="color:#FFD700;margin-bottom:5px;">Neden YolcuTransferi?</h2>
            <ul style="margin:0 0 0 14px;font-size:1.05em;">
              <li>VIP Araçlar</li>
              <li>Profesyonel Şoförler</li>
              <li>Uygun Fiyatlar</li>
              <li>Tüm Türkiye'de Hizmet</li>
              <li>Kurumsal Güvence</li>
              <li>Ücretsiz İptal Hakkı</li>
              <li>Online ve Hızlı Rezervasyon</li>
            </ul>
          </div>
          <div style="background:#ffd70022;border-radius:12px;padding:16px 10px;flex:1;min-width:150px;">
            <h2 style="color:#FFD700;margin-bottom:5px;">Ayrıcalıklarınız</h2>
            <ul style="margin:0 0 0 14px;font-size:1.05em;">
              <li>Öncelikli Rezervasyon</li>
              <li>Özel Kampanyalar</li>
              <li>Kişisel Asistan</li>
              <li>VIP Lounge Erişimi</li>
              <li>İkramlar ve Minibar</li>
            </ul>
          </div>
        </div>
        <div style="margin:24px 0 10px 0;">
          <a href="https://yolcutransferi.com" style="color:#FFD700;font-size:1.15em;text-decoration:none;font-weight:bold;">YolcuTransferi.com — Ayrıcalıklı Dünyanıza Giriş!</a>
        </div>
        <div style="margin-top:22px;font-size:.98em;color:#e6d199;">
          <b>İlk yolculuğunuzda sorularınız için 7/24 WhatsApp:</b> <a href="https://wa.me/905395267569" style="color:#FFD700">+90 539 526 75 69</a>
        </div>
      </div>
    `
  });
}

export async function sendResetPasswordMail(email, newPassword) {
  await transporter.sendMail({
    from: '"YolcuTransferi.com" <info@yolcutransferi.com>',
    to: email,
    subject: "Yeni Şifreniz (YolcuTransferi.com)",
    html: `
      <div style="font-family:Arial;background:#19160a;color:#ffeec2;border-radius:12px;padding:30px 18px;max-width:460px;margin:auto;border:2px solid #FFD700">
        <h2 style="color:#FFD700;font-size:1.5em;">Şifre Yenilendi</h2>
        <p>Sayın Kullanıcımız,<br />
        Talebiniz üzerine yeni şifreniz oluşturuldu:</p>
        <div style="font-size:1.45em;color:#FFD700;padding:12px 0 12px 0;font-weight:bold;letter-spacing:1px;">
          ${newPassword}
        </div>
        <p>Giriş yaptıktan sonra dilediğiniz zaman profilinizden şifrenizi değiştirebilirsiniz.<br />
        Güvenliğiniz için bu şifreyi kimseyle paylaşmayınız.</p>
      </div>
    `
  });
}
// PATH: lib/mailUtils.js
