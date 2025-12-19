const resultEl = document.getElementById("result");
const readerEl = document.getElementById("reader");

// ۱. اسکن با دوربین
document.getElementById("start-camera").addEventListener("click", () => {
    const html5QrCode = new Html5Qrcode("reader");
    Html5Qrcode.getCameras().then(cameras => {
        if(cameras && cameras.length) {
            html5QrCode.start(
                { facingMode: "environment" }, // دوربین پشت گوشی
                { fps: 10, qrbox: 250 },       // تنظیم سرعت و اندازه کادر
                (decodedText) => {             // وقتی بارکد پیدا شد
                    resultEl.innerText = "بارکد پیدا شد: " + decodedText;
                    html5QrCode.stop();        // متوقف کردن دوربین
                    saveBarcode(decodedText);  // ذخیره بارکد
                },
                (errorMessage) => {
                    console.log("خطا: ", errorMessage);
                }
            );
        }
    }).catch(err => console.error(err));
});

// ۲. اسکن با آپلود عکس
document.getElementById("upload-image").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if(!file) return;

    Html5Qrcode.scanFile(file, true)
    .then(decodedText => {
        resultEl.innerText = "بارکد پیدا شد: " + decodedText;
        saveBarcode(decodedText);
    })
    .catch(err => resultEl.innerText = "بارکدی در تصویر پیدا نشد");
});

// ۳. ذخیره بارکد در LocalStorage
function saveBarcode(code) {
    let barcodes = JSON.parse(localStorage.getItem("barcodes") || "[]");
    if(!barcodes.includes(code)){
        barcodes.push(code);
        localStorage.setItem("barcodes", JSON.stringify(barcodes));
    }
    console.log("بارکد ذخیره شد:", code);
}
