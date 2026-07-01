// Google Apps Script para recibir resultados de DSD II Wortschatz Arena 5.2
// 1. Crea un Google Sheet.
// 2. Extensiones → Apps Script.
// 3. Pega este código.
// 4. Implementar → Nueva implementación → Aplicación web.
// 5. Ejecutar como: tú mismo.
// 6. Acceso: cualquier usuario con el enlace.
// 7. Copia la URL y pégala en la plataforma.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Ergebnisse");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Ergebnisse");
    sheet.appendRow([
      "Timestamp",
      "Name",
      "Kurs",
      "Thema",
      "Phase",
      "Richtig",
      "Total",
      "Prozent",
      "ZeitSekunden",
      "Fehler",
      "UserAgent"
    ]);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date(),
    data.name || "",
    data.course || "",
    data.theme || "",
    data.mode || "",
    data.correct || 0,
    data.total || 0,
    data.percent || 0,
    data.timeSeconds || 0,
    data.errors || "",
    data.userAgent || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({status: "ok"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput("DSD II Wortschatz Arena Logger aktiv");
}
