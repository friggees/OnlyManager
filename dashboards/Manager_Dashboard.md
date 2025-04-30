# Manager Dashboard

Detta är landningssidan för användare med rollen 'Manager'. Den ger en översikt över teamets aktiviteter, schemaläggning, uppgifter, kommunikation och relevant statistik.

## Syfte

Att ge Managers en central plats för att övervaka och hantera sitt team, planera arbete, följa upp uppgifter och få en snabb bild av teamets status och prestation.

## Föreslagna Komponenter/Widgets

-   **Teamöversikt (Snabbvy):**
    -   Lista över teammedlemmar med aktuell status (t.ex. Incheckad/Utcheckad, Pågående uppgift - om tillgängligt).
    -   Länk till fullständig teamhanteringsvy.
-   **Dagens/Veckans Schema (Teamvy):**
    -   Översikt över teamets scheman för dagen eller veckan.
    -   Markeringar för eventuella avvikelser (t.ex. sen ankomst, frånvaro - om Check-in används).
    -   Länk till fullständig Schemahantering.
-   **Teamets To-Do's (Översikt):**
    -   Visar antal öppna/brådskande uppgifter per teammedlem.
    -   Visar nyligen slutförda uppgifter inom teamet.
    -   Länk till funktionen för att hantera teammedlemmars To-Do-listor.
-   **Statistik (Teamnivå - Snabbvy):**
    -   Nyckeltal relevanta för teamet (t.ex. närvaroprocent, antal slutförda uppgifter, eventuellt team-specifika KPI:er beroende på konfiguration).
    -   Länk till mer detaljerad teamstatistik (om tillgänglig för rollen).
-   **Senaste Meddelanden/Notiser:**
    -   Visar globala 'Brådskande Meddelanden'.
    -   Notiser relevanta för managern (t.ex. ledighetsansökningar att godkänna - om det implementeras, uppgifter som passerat deadline).
    -   Länk till fullständig meddelandevy/kommunikationscenter.
-   **Snabbåtkomst:**
    -   Knappar/länkar till ofta använda funktioner som Schemahantering, Hantera To-Do's, Starta DM/Gruppchatt med teamet.
-   **Mina Egna Uppgifter/Schema:**
    -   En mindre sektion för Managerns egna To-Do's och dagens schema.

## Anpassning

-   Fokus ligger på teamöversikt och hanteringsverktyg.

## Integrationer

-   Hämtar data från Användarhantering (teamdefinition), Schemahantering, Närvarohantering (Check-in), Hantering av To-Do-listor, Statistik, Brådskande Meddelanden och Direktmeddelanden/Gruppchattar.
