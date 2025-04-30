# Signera Dokument

Denna funktion beskriver hur anställda (alla roller som kan behöva signera dokument, t.ex. anställningsavtal) interagerar med signeringsprocessen som initierats av en Owner/Admin.

## Syfte

Att möjliggöra för anställda att digitalt granska och signera dokument som delas med dem via plattformen.

## Funktioner

-   **Notifiering:** Användaren får en notis (på dashboarden, via e-post/annan kanal om konfigurerat) när ett nytt dokument har delats för signering.
-   **Visa Dokument:**
    -   En dedikerad sektion (eller via en länk i notisen) där användaren kan se dokument som väntar på deras signatur.
    -   Möjlighet att öppna och granska PDF-dokumentet direkt i plattformen.
-   **Signeringsverktyg:**
    -   Möjlighet att rita sin signatur med musen/fingret/stylus.
    -   Möjlighet att fylla i eventuella textfält som lagts till av avsändaren (t.ex. datum, adress).
-   **Slutför Signering:** En knapp ('Signera'/'Godkänn'/'Klar') för att bekräfta och låsa sin signatur och ifyllda fält.
-   **Statusuppdatering:** När den anställde signerat uppdateras dokumentets status, och avsändaren (Owner/Admin) notifieras.
-   **Åtkomst till Signerade Dokument:** När båda parter signerat, blir det slutgiltiga dokumentet tillgängligt för den anställde att se och ladda ner (ofta via deras profil under 'Kontrakt' eller liknande).

## Skillnad mot Administrativ Vy

-   Denna vy fokuserar på att ta emot, granska och signera ett specifikt dokument.
-   Användaren kan inte ladda upp nya dokument eller dela dem med andra via denna funktion.

## Integrationer

-   **Signaturer (Admin):** Tar emot dokument som delas via den administrativa funktionen. Skickar tillbaka statusuppdateringar och den signerade informationen.
-   **Notifieringssystem:** Används för att meddela användaren om nya dokument att signera.
-   **Användarprofil/Kontrakt:** Lagrar de slutgiltiga, signerade dokumenten.
