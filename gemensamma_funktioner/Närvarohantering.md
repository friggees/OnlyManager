# Närvarohantering (Check-in / Check-out System)

Denna funktion hanterar anställdas tidsrapportering genom in- och utcheckning för arbetspass. Den är primärt avsedd för roller som Chattare och Virtual Assistant, men övervakas av Managers, Chatting Managers, Admins och Owner.

## Syfte

Att automatiskt spåra arbetstid och närvaro, underlätta löneberäkningar (särskilt vid avdrag för sen ankomst/frånvaro) och ge underlag för närvarostatistik.

## Funktioner

**För Anställda (Chattare, VA):**
-   **Check-in Knapp:** En tydlig knapp på dashboarden för att starta arbetspasset.
    -   Registrerar tidpunkt för incheckning.
    -   Visuell indikator på att användaren är incheckad.
-   **Check-out Knapp:** En tydlig knapp för att avsluta arbetspasset.
    -   Registrerar tidpunkt för utcheckning.
    -   Beräknar arbetad tid för passet.
    -   Visuell indikator på att användaren är utcheckad.
-   **Statusvisning:** Visar aktuell status (Incheckad/Utcheckad) och tid för senaste åtgärd.
-   **Automatisk Utcheckning (Valfritt):** Systemet kan eventuellt konfigureras att automatiskt checka ut användare efter en viss tids inaktivitet eller vid schemats sluttid.

**För Managers / Admins / Owner:**
-   **Närvaroöversikt:** En vy (ofta integrerad i Statistik eller Användarhantering) som visar:
    -   Aktuell status för alla (eller teamets) anställda (Incheckad/Utcheckad/Sen/Frånvarande).
    -   Dagens/veckans/månadens in- och utcheckningstider per anställd.
    -   Beräknad arbetad tid vs. schemalagd tid.
    -   Flaggning för avvikelser (sen incheckning, tidig utcheckning, utebliven incheckning).
-   **Manuell Korrigering:** Möjlighet för behöriga roller (typiskt Manager/Admin/Owner) att manuellt justera in-/utcheckningstider vid fel eller speciella omständigheter. Kräver loggning av vem som gjorde ändringen.
-   **Rapporter:** Generera rapporter över arbetad tid och närvaro per anställd eller team för valda tidsperioder.

## Koppling till Schema

-   Systemet jämför incheckningstiden mot den schemalagda starttiden för att identifiera sen ankomst.
-   Systemet kan identifiera utebliven incheckning om en användare inte checkar in alls under ett schemalagt pass.

## Koppling till Lönehantering

-   Data om sen ankomst och utebliven incheckning används för att automatiskt applicera de löneavdrag som konfigurerats under 'Hantering av Anställda'.

## Koppling till Statistik

-   Närvarodata (procentuell närvaro, frånvaro, sena ankomster) aggregeras och visas i Statistikmodulen, både globalt och per team (för Managers/Chatting Managers).

## Behörigheter

-   **Checka in/ut:** Chattare, Virtual Assistant (och eventuellt andra roller om konfigurerat).
-   **Se Status/Rapporter:** Manager, Chatting Manager (för sitt team), Admin, Owner (för alla).
-   **Manuell Korrigering:** Manager (för sitt team), Admin, Owner (för alla).
