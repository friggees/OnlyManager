# Modell Intäktsöversikt

Denna funktion ger Modeller en dedikerad vy för att se de intäkter som har registrerats i deras namn inom plattformen.

## Syfte

Att ge Modellen transparens och insikt i den ekonomiska aktivitet som genereras via deras profil och som hanteras av agenturen (primärt via Chattare).

## Funktioner

-   **Visning av Registrerade Sälj:** Listar alla försäljningsposter som attribuerats till Modellen (via funktionen 'Registrera Sälj').
    -   Visar datum, belopp, valuta, källa/plattform (om angivet), och eventuell notering.
    -   Visar vem som registrerade säljet (t.ex. vilken Chattare, eller om Admin/Owner/Manager gjort det).
-   **Summeringar:** Visar totalsummor för valda tidsperioder.
-   **Filtrering och Tidsintervall:**
    -   Möjlighet att filtrera intäkterna baserat på tidsperiod:
        -   Idag
        -   Denna vecka
        -   Denna månad
        -   Detta år
    -   Möjlighet att välja ett specifikt datumintervall (från datum - till datum).
-   **Grafisk Presentation:** (Valfritt men rekommenderat) Enkel grafisk visualisering av intäktstrender över den valda tidsperioden.

## Behörigheter

-   Endast Modellen själv kan se sin egen intäktsöversikt.
-   Owner/Admin/Manager/Chatting Manager har tillgång till denna data via de mer omfattande Statistik- och Ekonomimodulerna.

## Integrationer

-   **Registrera Sälj:** Hämtar data direkt från de poster som skapas via 'Registrera Sälj'-funktionen och som är kopplade till Modellen.
-   **Statistik:** Denna vy är en specifik, begränsad vy av den data som finns i den övergripande Statistikmodulen.
