import express from "express";
import { mountAnalyticsPreflight } from "./server/analyticsPreflightRoute";
import { mountPartnerSession } from "./server/partnerSessionRoute";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // Off by default: never expose a Hub -> Analytics session pathway until
  // DNS Admin explicitly enables it after membership verification tests.
  mountAnalyticsPreflight(app, process.env.DNS_ANALYTICS_PREFLIGHT_ENABLED === "true");
  mountPartnerSession(app, process.env.DNS_PARTNER_LOGIN_ENABLED === "true");

  // API Route to send voucher email notifications to info@dolomitinordicski.com
  // Fail closed: the legacy endpoint accepted unverified voucher requests and
  // recipient addresses. Re-enable only with DNS server-side grants and no guest PII.
  app.post("/api/notify-voucher", (_req, res) => {
    res.status(503).json({ error: "Voucher notifications are temporarily disabled." });
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
