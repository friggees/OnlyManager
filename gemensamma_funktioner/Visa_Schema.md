# Visa Schema

Denna funktion beskriver hur anställda (alla roller) ser sitt personliga arbetsschema som har lagts in av en behörig administratör eller manager.

## Syfte

Att ge anställda en tydlig och lättillgänglig översikt över sina planerade arbetspass, ledigheter och tider.

## Funktioner

-   **Schema Vy:**
    -   Visar en kalender- eller listvy över den anställdes schema för en vald tidsperiod (dag, vecka, månad).
    -   Tydlig markering av arbetspass med start- och sluttider.
    -   Visar inplanerad ledighet.
    -   Visar eventuella specifika uppgifter eller anteckningar kopplade till ett pass (om tillagt av manager/admin).
-   **Tidszoninformation:** Visar schemat i den anställdes lokala tidszon, men kan även visa motsvarande tid i agenturens/managerns tidszon för tydlighet vid internationella team.
-   **Navigering:** Enkel navigering mellan dagar, veckor och månader.
-   **Notifiering:** Användaren kan få en notis vid schemaändringar.

## Skillnad mot Administrativ Vy

-   Denna funktion är enbart för att *visa* det tilldelade schemat.
-   Användaren kan inte redigera, lägga till eller ta bort pass via denna vy (det görs via `huvudfunktioner/Schemahantering.md` av behöriga roller). Vissa roller som Manager/Model kan ha separata behörigheter att redigera sitt *eget* schema, vilket kan vara en del av den administrativa vyn eller en separat funktion beroende på implementation.

## Integrationer

-   **Schemahantering (Admin):** Visar data som skapats/redigerats via den administrativa funktionen.
-   **Dashboard:** Visar ofta en sammanfattning av dagens schema från denna vy.
-   **Närvarohantering:** Schemat används som referens för att avgöra sen ankomst/frånvaro vid check-in.
