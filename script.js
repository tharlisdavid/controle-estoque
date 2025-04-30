const html5QrCode = new Html5Qrcode("reader");
const qrConfig = { fps: 10, qrbox: 250 };

// Prepara o áudio do bip
const bipSound = new Audio("bip.mp3");

Html5Qrcode.getCameras().then(devices => {
  if (devices && devices.length) {
    const cameraId = devices[0].id;
    html5QrCode.start(
      cameraId,
      qrConfig,
      qrCodeMessage => {
        // Ao escanear com sucesso
        document.getElementById('codigo').value = qrCodeMessage;
        bipSound.play(); // Toca o som 🔊
        html5QrCode.stop(); // Para leitura após sucesso
      },
      errorMessage => {
        // silencioso
      }
    ).catch(err => {
      alert("Erro ao acessar a câmera: " + err);
    });
  }
});


function enviarProduto() {
  const btn = document.getElementById("btnEnviar");
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader" class="spin"></i> Enviando...`;
  lucide.createIcons();

  const produto = {
    descricao: document.getElementById('descricao').value,
    quantidade: parseInt(document.getElementById('quantidade').value),
    marca: document.getElementById('marca').value,
    vencimento: document.getElementById('vencimento').value,
    codigo: document.getElementById('codigo').value
  };

  fetch("https://script.google.com/macros/s/AKfycbxFpTnEVHYZrDnRqtwlEwauwi494AY9tthtK_z6HcHhoPsRBbpubwRE_DaNZ9575y-7ZA/exec   ", 
    {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto)
  })
  .then(response => response.json())
  .then(data => {
    alert("✅ Produto cadastrado com sucesso!");
    document.getElementById("produtoForm").reset();
  })
  .catch(error => {
    alert("❌ Erro ao cadastrar produto.");
    console.error(error);
  })
  .finally(() => {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="send"></i> Cadastrar Produto`;
    lucide.createIcons();
  });
}
