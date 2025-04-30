# Helhetsbild

Plattformen utgår från att kunden får ett eget inlogg med 'owner'-rättigheter. Detta konto kan logga in på plattformen och komma till sin dashboard. Kunden har sedan flera alternativ för att sätta upp sitt konto:

## Hantering av Anställda ('Employees')

Under 'Employees'-sektionen kan kunden:

-   **Skapa konton:** Direkt skapa konton för anställda (se `användare.md` för detaljer om olika användartyper).
-   **Hantera löneuppgifter:**
    -   Lägga till eller redigera löneinformation, såsom månadslön eller procentuell ersättning. Detta visas i 'Economy'-sektionen.
    -   Konfigurera löneavdrag vid sen ankomst (t.ex. "Deduct X$ from salary if the user checks-in XX minutes late").
    -   Konfigurera löneavdrag vid utebliven incheckning (t.ex. "Deduct X$ from salary if the user doesn't check in at all for a day").
-   **Lägga till Telegram:** Ange användarens Telegram-användarnamn.
-   **Lägga till övrig info:** Spara annan relevant information ('Other' info).
-   **Ladda upp kontrakt:** Ladda upp och spara kontrakt kopplade till den anställde (t.ex. anställningsavtal).
-   **Redigera To-Do-lista:** Hantera den anställdes att-göra-lista.

## Ekonomihantering ('Economy')

Tillgång till 'Economy'-sektionen ger möjlighet att:

-   **Lägga till intäkter:** Registrera intäkter och markera källan.
-   **Lägga till utgifter:** Registrera utgifter, markera källan och ange om det är en engångs- eller återkommande betalning.

## Utbildningsmaterial ('Create or Import Education Material')

Denna sektion fungerar likt en förenklad Notion Workspace:

-   **Skapa och Dela:** Skapa utbildningsmaterial och dela det med valda användare, som kan se det under sin 'Files & Education'-sektion.
-   **Importera:** Importera befintliga `.pdf`- eller Word-dokument för att samla utbildningsmaterial på plattformen.
-   **Redigeringsverktyg:**
    -   Ladda upp bilder och videor.
    -   Skapa callout-rutor och text-rutor.
    -   Fritt placera element med hjälp av ett kvadratiskt gridnät för linjering.
    -   Formatera text: ändra färg, fetstil, kursiv, understruken, rubriker (större/mindre).
    -   Skapa dropdown-text (klickbar för att visa/dölja underinnehåll).

## Schemahantering

Funktioner för att redigera scheman för alla användare (inklusive sig själv):

-   **Lägga till/Ta bort:** Hantera dagar, tider, ledighet och exakta arbetstimmar.
-   **Tidszoner:** Både ägare och användare ser båda parters tidszoner för tydlighet.

## Säker Anteckningshantering

En funktion liknande Excel (utan avancerade funktioner) för att säkert spara känslig information bakom en PIN-kod:

-   **Spara information:** Lagra t.ex. användarnamn, lösenord, proxy-ID, 2FA-koder etc.
-   **Anpassningsbara kolumner:** Lägg till egna kolumner efter behov.
-   **Dela anteckningar:** Dela specifika tabeller/anteckningar med valda anställda, som hittar dem under 'Files & Education'.

## Hantering av To-Do-listor

Redigera egna och anställdas att-göra-listor:

-   **Hantera uppgifter:** Lägga till, ändra, ta bort uppgifter.
-   **Prioritering/Status:** Markera uppgifter som 'urgent'/'non-urgent' och 'done'/'under process'.
-   **Notispåminnelser:** Aktivera notiser så anställda får påminnelser i telefonen.

## Signaturer ('Signatures')

Funktion för digital signering av dokument:

-   **Importera PDF:** Ladda upp en eller flera PDF-filer.
-   **Dela för signering:** Dela dokumentet med en specifik anställd.
-   **Signera:** Båda parter kan rita sin signatur och fylla i textfält (t.ex. adress).
-   **Automatisk lagring:** Efter att båda signerat och klickat 'Done Signing', sparas dokumentet automatiskt under den anställdes profil i 'Contract'-sektionen.

## Statistik ('Statistics')

Automatisk sammanställning och visualisering av data:

-   **Intäkter:** Registreras automatiskt (manuellt inlagda eller från chattare) och visas i statistiken.
-   **Utgifter:** Läggs in i budgeten och dras automatiskt av från totala intäkter.
-   **Avgiftsalternativ:**
    -   Möjlighet att klicka i "Remove OnlyFans fee from statistics".
    -   Möjlighet att ange en manuell avgiftsprocent att dra av från chattarnas registrerade sälj (kräver att chattarnas provision är angiven för korrekt löneberäkning).
-   **Närvaro:** Procentuell närvaro och frånvaro för anställda visas.
-   **Filtrering och Vyer:** Flera filtreringsmöjligheter och olika vyer finns tillgängliga.

## Direktmeddelanden (1-on-1 DMs)

Enkel chattfunktion:

-   **Individuella chattar:** Chatta med valfri anställd.
-   **Formatering:** Stöd för emojis och rik textformatering (fet, kursiv).
-   **Gruppchattar:** Möjlighet att skapa gruppchatter.

## Brådskande Meddelanden ('Urgent Announcements')

Skicka ut viktiga meddelanden:

-   **Notifiering:** Meddelanden visas som en notis ('plingar till') på valda användares eller användarkategoriers dashboards.

## Roll- och Behörighetshantering

Kunden (ägaren) kan hantera roller och behörigheter:

-   **Anpassa behörigheter:** Lägga till eller ta bort specifika behörigheter för enskilda användare.
-   **Byta namn på roller:** Ändra namn på roller (t.ex. från 'Manager' till 'Site-manager').

## Statistikkalkyler

Detaljerad statistik baserad på insamlad data:

-   **Datapunkter:** Intäkter, utgifter, anställdas närvaro.
-   **Filtrering:** Filtrera efter tidsperiod (dag, vecka, månad, år) eller specifika datumintervall.
-   **Översikt:** Visar total intäkt, total utgift, total differens, total tillväxt (%) samt genomsnittlig närvaro/frånvaro (%).


