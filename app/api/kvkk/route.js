let errorStep = "başlangıç";

export async function POST(request) {
  try {
    console.log("✅ Adım 0: İstek geldi");

    const body = await request.json();
    errorStep = "body parsing";

    const { adsoyad, telefon, eposta, talep, aciklama } = body;
    if (!adsoyad || !eposta || !talep) {
      errorStep = "eksik alan kontrolü";
      return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
    }

    errorStep = "MongoDB bağlantısı";
    const db = await connectToDatabase();

    errorStep = "MongoDB kayıt işlemi";
    await db.collection("kvkkForms").insertOne({
      adsoyad,
      telefon,
      eposta,
      talep,
      aciklama,
      createdAt: new Date(),
    });

    errorStep = "mail gönderim başlangıcı";
    await resend.emails.send({
      from: "YolcuTransferi KVKK <info@yolcutransferi.com>",
      to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
      subject: "Yeni KVKK Başvurusu",
      html: `
        <div style="font-family:sans-serif; font-size:15px;">
          <p><strong>Ad Soyad:</strong> ${adsoyad}</p>
          <p><strong>Telefon:</strong> ${telefon || "-"}</p>
          <p><strong>E-posta:</strong> ${eposta}</p>
          <p><strong>Talep Türü:</strong> ${talep}</p>
          <p><strong>Açıklama:</strong><br/>${aciklama || "-"}</p>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(`❌ KVKK HATA – Adım: ${errorStep}`, JSON.stringify(err, null, 2));
    return NextResponse.json({ error: `Sunucu hatası – Adım: ${errorStep}` }, { status: 500 });
  }
}
