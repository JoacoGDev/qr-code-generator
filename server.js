import express from "express";
import QRCode from "qrcode";


const app = express();

app.use(express.static("public"));
app.use(express.json()); // for parsing JSON requests

// Endpoint to generate QR code
app.post("/generate", async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    try {
        const qrDataURL = await QRCode.toDataURL(text, { width: 300 });
        res.json({ qr: qrDataURL });
    } catch (err) {
        res.status(500).json({ error: "Error generating QR code" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

