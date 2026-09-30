import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // API Route to send voucher email notifications to info@dolomitinordicski.com
  app.post("/api/notify-voucher", async (req, res) => {
    try {
      const { voucher, recipient } = req.body;

      if (!voucher || !voucher.voucherCode) {
        return res.status(400).json({ error: "Dati voucher mancanti" });
      }

      const targetEmail = recipient || process.env.NOTIFICATION_EMAIL || "info@dolomitinordicski.com";
      const subject = `[Dolomiti NordicSki] Nuovo Voucher Emesso: ${voucher.voucherCode} (${voucher.guestName || "Ospite"})`;

      const isPackage = voucher.voucherCategory === "package";
      const categoryLabel = isPackage ? "PACCHETTO HOTEL" : "SKIPASS NORDICSKI";

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f8; margin: 0; padding: 20px; color: #083845; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 2px solid #0D4D5E; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
            .header { background-color: #0D4D5E; color: #ffffff; padding: 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 1px; }
            .header p { margin: 5px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #AAD0D1; }
            .badge { display: inline-block; background-color: #AAD0D1; color: #083845; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; margin-top: 10px; }
            .content { padding: 24px; }
            .info-grid { display: table; width: 100%; margin-bottom: 20px; border-collapse: separate; border-spacing: 0 10px; }
            .info-row { display: table-row; }
            .info-cell { display: table-cell; padding: 10px; background: #f8fafc; border-radius: 8px; font-size: 13px; }
            .info-label { font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: bold; display: block; margin-bottom: 2px; }
            .info-value { font-weight: bold; color: #083845; }
            .price-tag { font-size: 20px; font-weight: 900; color: #0D4D5E; background: #e2eff1; padding: 12px; border-radius: 10px; text-align: center; margin-top: 15px; }
            .footer { background: #083845; color: #AAD0D1; padding: 16px; text-align: center; font-size: 11px; border-top: 1px solid #1a5b6e; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>DOLOMITI NORDICSKI</h1>
              <p>Notifica Automatica Emissione Voucher</p>
              <div class="badge">${categoryLabel}</div>
            </div>
            
            <div class="content">
              <p style="font-size: 14px; margin-bottom: 20px;">
                È stato emesso un nuovo voucher sul portale partner Dolomiti NordicSki per l'indirizzo <strong>${targetEmail}</strong>.
              </p>

              <div style="background-color: #f0f5f6; padding: 15px; border-radius: 12px; border-left: 4px solid #0D4D5E; margin-bottom: 20px;">
                <div style="font-size: 11px; color: #64748b; font-weight: bold; text-transform: uppercase;">Codice Voucher QR</div>
                <div style="font-size: 18px; font-family: monospace; font-weight: 900; color: #0D4D5E; margin-top: 2px;">${voucher.voucherCode}</div>
              </div>

              <div class="info-grid">
                <div class="info-row">
                  <div class="info-cell" style="width: 50%;">
                    <span class="info-label">Ospite / Intestatario</span>
                    <span class="info-value">${voucher.guestName}</span>
                    <div style="font-size: 11px; color: #64748b;">${voucher.guestCount} persona/e</div>
                  </div>
                  <div class="info-cell" style="width: 50%;">
                    <span class="info-label">Struttura Partner</span>
                    <span class="info-value">${voucher.accommodationName}</span>
                    <div style="font-size: 11px; color: #64748b;">ID: ${voucher.partnerCode}</div>
                  </div>
                </div>
              </div>

              ${isPackage ? `
                <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 14px; border-radius: 10px; margin-bottom: 15px;">
                  <span class="info-label">Pacchetto Vacanza</span>
                  <div style="font-size: 14px; font-weight: bold; color: #0D4D5E;">${voucher.packageName || 'N/A'}</div>
                  <div style="font-size: 12px; color: #334155; margin-top: 4px;"><strong>Area:</strong> ${voucher.regionName || 'Dolomiti NordicSki'}</div>
                  <div style="font-size: 12px; color: #334155; margin-top: 2px;"><strong>Periodo:</strong> ${voucher.stayDates || 'N/A'}</div>
                  ${voucher.includedServices ? `<div style="font-size: 11px; color: #64748b; margin-top: 6px; font-style: italic;">Servizi: ${voucher.includedServices}</div>` : ''}
                </div>
              ` : `
                <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 14px; border-radius: 10px; margin-bottom: 15px;">
                  <span class="info-label">Dettagli Skipass</span>
                  <div style="font-size: 14px; font-weight: bold; color: #0D4D5E;">${voucher.coverage === 'dolomiti' ? 'Dolomiti NordicSki (1.000 km)' : (voucher.selectedRegion || 'Area Regionale')}</div>
                  <div style="font-size: 12px; color: #334155; margin-top: 4px;"><strong>Tipo Pass:</strong> ${voucher.skipassType || 'Standard'}</div>
                  <div style="font-size: 12px; color: #334155; margin-top: 2px;"><strong>Validità:</strong> ${voucher.validFrom} al ${voucher.validTo}</div>
                </div>
              `}

              <div class="price-tag">
                Valore Totale: €${voucher.totalPrice},00
              </div>

              <div style="margin-top: 20px; font-size: 11px; color: #64748b; text-align: center;">
                Data di emissione: ${voucher.createdAt}
              </div>
            </div>

            <div class="footer">
              &copy; 2026 Dolomiti NordicSki &bull; Sistema Gestione Voucher Partner
            </div>
          </div>
        </body>
        </html>
      `;

      // Check if SMTP environment variables are configured
      const smtpHost = process.env.SMTP_HOST;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (smtpHost && smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Dolomiti NordicSki Portal" <${smtpUser}>`,
          to: targetEmail,
          subject,
          html: htmlContent,
        });

        console.log(`[EMAIL NOTIFICATION SENT VIA SMTP] To: ${targetEmail} for voucher ${voucher.voucherCode}`);
      } else {
        // Fallback logging if SMTP is not set up
        console.log(`====================================================`);
        console.log(`[VOUCHER EMAIL NOTIFICATION DISPATCHED]`);
        console.log(`TO: ${targetEmail}`);
        console.log(`SUBJECT: ${subject}`);
        console.log(`VOUCHER CODE: ${voucher.voucherCode}`);
        console.log(`GUEST: ${voucher.guestName} (${voucher.guestCount} pers.)`);
        console.log(`HOTEL: ${voucher.accommodationName}`);
        console.log(`PRICE: €${voucher.totalPrice}`);
        console.log(`====================================================`);
      }

      return res.status(200).json({
        success: true,
        recipient: targetEmail,
        message: `Notifica email inviata a ${targetEmail} per il voucher ${voucher.voucherCode}`,
      });
    } catch (err: any) {
      console.error("Error sending voucher email notification:", err);
      return res.status(500).json({ error: "Impossibile inviare la notifica email", details: err.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Dolomiti NordicSki running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
