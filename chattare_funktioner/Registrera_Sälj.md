# Registrera Sälj

Denna funktion möjliggör manuell registrering av försäljning/intäkter i systemet. Den är tillgänglig för roller som Owner, Admin, Chatting Manager, Chattare och Model, men presentation och kontext kan variera något beroende på roll.

## Syfte

Att logga intäkter kopplade till specifika modeller eller källor för att korrekt spåra prestation och beräkna eventuell provision samt förse statistikmodulen med data.

## Funktioner

-   **Intäktsbelopp:** Ange det totala beloppet för försäljningen.
-   **Valuta:** Välj relevant valuta (systemet bör ha en standardvaluta men tillåta andra).
-   **Källa/Modell:** Välj vilken modell intäkten ska attribueras till. Listan bör endast visa modeller som användaren har behörighet att se eller hantera (för Chattare/Chatting Manager/Model) eller alla modeller (för Owner/Admin).
-   **Plattform/Underkälla:** (Valfritt) Ange specifik plattform eller källa för intäkten (t.ex. OnlyFans Tips, Fansly PPV, etc.). Detta kan vara en dropdown eller fritextfält.
-   **Datum:** Datum för försäljningen (standard är idag, men kan ändras).
-   **Notering:** (Valfritt) Lägg till en kort anteckning om försäljningen.

## Rollspecifika Aspekter

-   **Chattare:** Registrerar primärt försäljning gjord för de modeller de arbetar med. Deras vy för att välja modell kan vara begränsad.
-   **Model:** Kan ha möjlighet att registrera intäkter som kommit in via kanaler agenturen inte direkt hanterar, eller för att dubbelkolla/komplettera data.
-   **Chatting Manager:** Kan registrera sälj för sitt team eller korrigera poster. Har översikt över teamets registreringar.
-   **Owner/Admin:** Har full översikt och kan registrera/redigera alla säljposter.

## Integrationer

-   **Ekonomi/Statistik:** Registrerade säljdata flödar direkt in i Ekonomi- och Statistikmodulerna.
-   **Lönehantering:** Används som underlag för eventuell provisionsbaserad lön för Chattare och Modeller.
