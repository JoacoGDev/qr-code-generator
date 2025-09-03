// public/js/main.js
const form = document.getElementById("qrForm");
const input = document.getElementById("textInput");
const container = document.getElementById("qrCodeContainer");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    container.innerHTML = "";

    if (!text) return alert("Please enter text or URL");

    try {
        const res = await fetch("/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });
        const data = await res.json();

        if (data.error) return alert(data.error);

        const img = document.createElement("img");
        img.src = data.qr;
        img.alt = "QR Code";
        img.className = "rounded-xl shadow-lg";
        container.appendChild(img);

        const downloadLink = document.createElement("a");
        downloadLink.innerText = "Download QR Code";
        downloadLink.href = data.qr;
        downloadLink.download = "qrcode.png";
        downloadLink.className = "inline-block mt-2 text-white bg-purple-400 px-6 py-2 rounded-xl hover:bg-purple-500 transition";
        container.appendChild(downloadLink);
    } catch (err) {
        alert("Error generating QR code");
        console.error(err);
    }
});
