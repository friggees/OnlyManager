# Visa Delat Innehåll (Utbildning & Säkra Anteckningar)

Denna funktion beskriver hur anställda (alla roller som kan ta emot delat material) får åtkomst till och kan se utbildningsmaterial och säkra anteckningar som har delats med dem av en Owner/Admin.

## Syfte

Att ge anställda en central plats ('Files & Education' eller liknande sektion) där de kan hitta och konsumera relevant utbildningsinformation och komma åt nödvändiga säkra anteckningar (t.ex. lösenord, instruktioner) som delats specifikt med dem.

## Funktioner

-   **Centraliserad Åtkomst:** En dedikerad sektion i användargränssnittet (t.ex. 'Files & Education', 'Mina Filer') där allt delat innehåll samlas.
-   **Lista Innehåll:** Visar en lista över de utbildningsdokument/-sidor och säkra anteckningstabeller som den inloggade användaren har fått åtkomst till.
    -   Tydlig indikation på typ av innehåll (Utbildning/Anteckning).
    -   Visar titel/namn på innehållet.
    -   Visar vem som delade det och när (valfritt).
-   **Öppna/Visa Innehåll:**
    -   **Utbildningsmaterial:** Möjlighet att öppna och läsa utbildningssidor/-dokument (skapat i plattformens editor eller importerade PDF/Word). Visar text, bilder, video, etc. som specificerat i `huvudfunktioner/Utbildningsmaterial.md`.
    -   **Säkra Anteckningar:** Möjlighet att öppna och se innehållet i de specifika anteckningstabeller som delats. Användaren kan se data i kolumnerna (t.ex. användarnamn, lösenord) men kan inte redigera eller se PIN-koden (om sådan används för åtkomst till själva redigeringsvyn för Owner).
-   **Sök/Filtrering (Valfritt):** Möjlighet att söka eller filtrera i listan över delat innehåll om den blir lång.
-   **Notifiering:** Användaren kan få en notis när nytt innehåll har delats med dem.

## Skillnad mot Administrativ Vy

-   Denna funktion är helt fokuserad på att *konsumera* delat innehåll.
-   Användaren kan inte skapa, redigera, dela vidare eller radera innehåll via denna vy. De kan inte heller se innehåll som inte specifikt delats med dem eller deras roll/team.
-   För Säkra Anteckningar ser användaren endast datan, inte administrationsfunktioner som PIN-kodshantering eller kolumnredigering.

## Integrationer

-   **Utbildningsmaterial (Admin):** Tar emot och visar material som skapats och delats via den administrativa funktionen.
-   **Säker Anteckningshantering (Admin):** Tar emot och visar anteckningstabeller som skapats och delats via den administrativa funktionen.
-   **Notifieringssystem:** Används för att meddela om nytt delat innehåll.
-   **Dashboard:** Kan visa länkar eller notiser om nyligen delat innehåll.
