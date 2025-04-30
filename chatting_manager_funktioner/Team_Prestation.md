# Chatting Manager - Team Prestation Dashboard

Denna funktion ger Chatting Managers en specifik vy inom statistikmodulen, fokuserad på prestation och aktivitet för deras dedikerade chatt-team.

## Syfte

Att ge Chatting Managers de verktyg och den data de behöver för att effektivt kunna leda, utvärdera och stödja sitt team av Chattare och Modeller (om tillämpligt inom teamet).

## Funktioner

-   **Teamöversikt:** Visar en lista över medlemmar i Chatting Managerns team.
-   **Försäljningsstatistik (Teamnivå):**
    -   Total försäljning för teamet under valda tidsperioder (dag, vecka, månad, år, specifikt intervall).
    -   Genomsnittlig försäljning per teammedlem (Chattare).
    -   Försäljning per Modell som teamet hanterar.
    -   Topplistor inom teamet (t.ex. mest säljande Chattare).
-   **Närvarostatistik (Teamnivå):**
    -   Översikt över teamets närvaro, sena ankomster och frånvaro.
    -   Detaljerad vy per teammedlem för deras in- och utcheckningar (om Check-in systemet används).
-   **Aktivitetsmått (Potentiell framtida utökning):**
    -   Beroende på integrationer kan detta inkludera mått som antal skickade meddelanden, svarstid, etc. (Kräver mer detaljerad specifikation).
-   **Filtrering:**
    -   Filtrera all data baserat på tidsperiod (dag, vecka, månad, år, specifikt intervall).
    -   Filtrera per specifik Chattare inom teamet.
    -   Filtrera per specifik Modell som teamet hanterar.
-   **Jämförelser:** (Valfritt) Möjlighet att jämföra prestation mellan olika tidsperioder.

## Behörigheter

-   Endast Chatting Managers kan se denna specifika team-vy.
-   De kan endast se data för de användare som är definierade som medlemmar i deras team.
-   Owner/Admin har tillgång till all denna data (och mer) via den globala Statistikmodulen.

## Integrationer

-   **Registrera Sälj:** Hämtar försäljningsdata från poster skapade av teamets Chattare eller andra roller för de modeller teamet hanterar.
-   **Check-in System (Närvarohantering):** Hämtar närvarodata för teammedlemmarna.
-   **Schemahantering:** Kan användas för att jämföra närvaro mot planerat schema.
-   **Användarhantering:** Definierar vilka användare som tillhör Chatting Managerns team.
