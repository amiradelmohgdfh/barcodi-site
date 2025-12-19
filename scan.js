const resultEl = document.getElementById("result");

// اسکن عکس گرفته شده با دوربین
document.getElementById("camera-image").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if(!file) return;

    Html5Qrcode.scanFile(file, true)
    .then(decodedText => {
        resultEl.innerText = "بارکد پیدا شد: " + decodedText;
        saveBarcode(decodedText);
    })
    .catch(err => resultEl.innerText = "بارکدی در تصویر پیدا نشد");
});

// اسکن عکس آپلود شده از گالری
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

// ذخیره بارکد در LocalStorage
function saveBarcode(code) {
    let barcodes = JSON.parse(localStorage.getItem("barcodes") || "[]");
    if(!barcodes.includes(code)){
        barcodes.push(code);
        localStorage.setItem("barcodes", JSON.stringify(barcodes));
    }
    console.log("بارکد ذخیره شد:", code);
}
