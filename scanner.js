const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');

// Kamerazugriff anfordern
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Kamerazugriff fehlgeschlagen: ", err);
  });

// Foto aufnehmen
snap.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL('image/png');

  // Hier könntest du das Bild an eine KI-API senden
  sendToFaceRecognitionAPI(imageData);
});

// Funktion zum API-Aufruf (Beispiel)
function sendToFaceRecognitionAPI(imageBase64) {
  fetch('https://dein-endpunkt-zur-gesichtserkennung.com/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image: imageBase64 })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Ergebnis:", data);
    // Ergebnis anzeigen oder weiterverarbeiten
  })
  .catch(error => console.error('Fehler bei API-Aufruf:', error));
}
