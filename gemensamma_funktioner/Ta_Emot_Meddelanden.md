# Ta Emot Meddelanden (Brådskande & Team)

Denna funktion beskriver hur användare (alla roller) tar emot och interagerar med meddelanden som skickas ut via systemet, både globala 'Brådskande Meddelanden' och team-specifika meddelanden.

## Syfte

Att säkerställa att viktig information når rätt mottagare snabbt och att användare enkelt kan se och läsa dessa meddelanden.

## Funktioner

-   **Notifiering:**
    -   Användaren får en tydlig notis när ett nytt meddelande (globalt eller team-specifikt) har skickats till dem.
    -   Notisen kan visas direkt på dashboarden, som en popup, eller via en ikon som indikerar olästa meddelanden.
    -   Eventuellt kan notisen skilja sig åt beroende på om det är ett globalt meddelande eller ett från den egna managern.
-   **Meddelandevy:**
    -   En dedikerad sektion eller en widget på dashboarden där mottagna meddelanden listas.
    -   Visar avsändare (t.ex. "System Admin", "Din Manager"), titel och tidpunkt.
    -   Möjlighet att klicka på ett meddelande för att läsa hela innehållet.
    -   Indikator för olästa/lästa meddelanden.
-   **Arkivering/Radering (Valfritt):** Användaren kan eventuellt ha möjlighet att markera meddelanden som lästa eller arkivera dem för att rensa sin inkorg (men de raderas inte från systemets loggar).

## Skillnad mot Skicka-funktioner

-   Denna funktion fokuserar enbart på att ta emot och läsa meddelanden.
-   Användaren kan inte skicka meddelanden via denna vy (det görs via `huvudfunktioner/Brådskande_Meddelanden.md` eller `chatting_manager_funktioner/Team_Meddelanden.md`).

## Integrationer

-   **Brådskande Meddelanden (Admin):** Tar emot meddelanden som skickas globalt.
-   **Team Meddelanden (Chatting Manager):** Tar emot meddelanden som skickas till specifika team.
-   **Notifieringssystem:** Används för att signalera nya meddelanden.
-   **Dashboard:** Visar ofta en sammanfattning eller de senaste mottagna meddelandena.
