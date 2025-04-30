# Chatting Manager - Skicka Team-Meddelanden

Denna funktion utökar 'Brådskande Meddelanden' genom att ge Chatting Managers möjlighet att skicka riktade meddelanden specifikt till medlemmarna i sitt eget team.

## Syfte

Att möjliggöra snabb och effektiv kommunikation av viktig information, uppdateringar eller instruktioner som är relevanta endast för chatt-teamet, utan att störa andra användare i organisationen.

## Funktioner

-   **Skapa Meddelande:** Ett gränssnitt liknande det för globala 'Brådskande Meddelanden'.
    -   Ange titel och meddelandetext.
    -   Stöd för grundläggande formatering (fet, kursiv) och eventuellt emojis.
-   **Målgruppsurval:**
    -   Möjlighet att välja "Hela Teamet" som mottagare.
    -   Möjlighet att välja specifika individer *inom* sitt team som mottagare. Chatting Managern kan inte skicka till användare utanför sitt definierade team via denna funktion.
-   **Sändning:** Skickar meddelandet till de valda mottagarna.
-   **Notifiering:** Mottagarna får en notis (liknande globala meddelanden, men kan eventuellt indikera att det är från deras manager). Meddelandet visas på deras dashboard eller i ett dedikerat meddelandecenter.

## Behörigheter

-   **Avsändare:** Endast Chatting Managers kan använda denna funktion för att skicka meddelanden *till sitt team*.
-   **Mottagare:** Medlemmar i Chatting Managerns team (Chattare, eventuellt Modeller om de ingår i teamet).
-   **Insyn:** Owner/Admin har sannolikt möjlighet att se alla skickade meddelanden, inklusive team-specifika, för översikt och kontroll.

## Skillnad mot Globala Meddelanden

-   **Avsändare:** Begränsad till Chatting Manager (för sitt team) vs. Owner/Admin (för alla/valda grupper).
-   **Målgrupp:** Begränsad till medlemmar inom Chatting Managerns team vs. alla användare eller bredare definierade grupper.

## Integrationer

-   **Användarhantering:** Använder teamdefinitionen för att avgöra vilka användare som är valbara mottagare.
-   **Notifieringssystem:** Använder samma system som globala meddelanden för att leverera notiser och visa meddelandet.
