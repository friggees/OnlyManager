# Chatting Manager Dashboard

Detta är landningssidan för användare med rollen 'Chatting Manager'. Den är optimerad för att ge översikt och kontroll över chatt-teamets prestation, scheman, uppgifter och kommunikation.

## Syfte

Att ge Chatting Managers en centraliserad vy för att effektivt leda sitt chatt-team, övervaka försäljning och närvaro, hantera uppgifter och kommunicera med teamet.

## Föreslagna Komponenter/Widgets

-   **Teamöversikt (Chatt-fokus):**
    -   Lista över teammedlemmar (Chattare, Modeller) med status (Incheckad/Utcheckad, Aktiv/Inaktiv).
    -   Snabbvy av dagens försäljning per Chattare/Modell.
    -   Länk till fullständig 'Team Prestation Dashboard'.
-   **Dagens/Veckans Schema (Teamvy):**
    -   Översikt över chatt-teamets scheman.
    -   Markeringar för avvikelser (sen ankomst, frånvaro).
    -   Länk till fullständig Schemahantering för teamet.
-   **Teamets To-Do's (Översikt):**
    -   Visar antal öppna/brådskande uppgifter per teammedlem, särskilt de relaterade till specifika konton eller kampanjer.
    -   Länk till funktionen för att hantera teammedlemmars To-Do-listor.
-   **Försäljningsstatistik (Teamnivå - Snabbvy):**
    -   Widget som visar dagens/veckans totala försäljning för teamet.
    -   Topplista för Chattare inom teamet (dagens/veckans).
    -   Länk till den detaljerade 'Team Prestation Dashboard'.
-   **Närvarostatistik (Teamnivå - Snabbvy):**
    -   Snabb överblick över teamets närvaro idag.
    -   Länk till detaljerad närvarostatistik i 'Team Prestation Dashboard'.
-   **Senaste Meddelanden/Notiser:**
    -   Visar globala 'Brådskande Meddelanden' och team-specifika meddelanden skickade av Chatting Managern.
    -   Notiser relevanta för managern (t.ex. uppgifter som passerat deadline).
    -   Länk till fullständig meddelandevy.
-   **Snabbåtkomst:**
    -   Knappar/länkar till 'Registrera Sälj', 'Skicka Team-Meddelande', Schemahantering, Hantera To-Do's, Starta DM/Gruppchatt med teamet.
-   **Mina Egna Uppgifter/Schema:**
    -   En mindre sektion för Chatting Managerns egna To-Do's och schema.

## Anpassning

-   Fokus ligger på realtidsdata för försäljning, närvaro och teamhantering specifikt för chatt-operationen.

## Integrationer

-   Hämtar data från Användarhantering (teamdefinition), Schemahantering, Närvarohantering (Check-in), Hantering av To-Do-listor, Statistik ('Team Prestation'), Brådskande Meddelanden, Team-Meddelanden och Direktmeddelanden/Gruppchattar.
