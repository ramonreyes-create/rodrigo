# DSD II Wortschatz Arena 5.3 – Lehrer-Modus einfach

## Nutzung lokal
1. ZIP entpacken.
2. `index.html` im Browser öffnen.
3. Schülerin gibt nur Name und Kurs ein.
4. Ergebnisse können an Google Sheets gesendet werden.

## Google Sheets einrichten
1. Google Sheet erstellen.
2. Erweiterungen → Apps Script.
3. Code aus `google_apps_script.gs` kopieren und einfügen.
4. Implementieren → Neue Bereitstellung → Web-App.
5. Ausführen als: Ich.
6. Zugriff: Jeder mit dem Link.
7. Web-App-URL kopieren.

## URL einmalig eintragen
Öffne die Datei:

`js/config.js`

Dort diese Zeile ersetzen:

```js
window.SHEET_WEBAPP_URL = "";
```

durch deine URL:

```js
window.SHEET_WEBAPP_URL = "https://script.google.com/macros/s/DEINE_URL/exec";
```

Danach müssen die Schülerinnen die URL nicht mehr sehen oder eingeben.

## Gespeichert werden
- Timestamp
- Name
- Kurs
- Thema
- Phase
- Richtig
- Total
- Prozent
- ZeitSekunden
- Fehler
- UserAgent
