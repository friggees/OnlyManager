# Chattare Dashboard

Detta är landningssidan för användare med rollen 'Chattare' när de loggar in på plattformen. Den ska ge en snabb överblick över relevant information och snabb åtkomst till kärnfunktioner.

## Syfte

Att ge Chattare en central plats för att se sitt schema, hantera uppgifter, få meddelanden och snabbt komma åt funktioner som check-in och säljregistrering.

## Föreslagna Komponenter/Widgets

-   **Dagens Schema:**
    -   Visar dagens arbetspass enligt det schema som lagts in av Manager/Admin/Owner.
    -   Tydlig visning av start- och sluttid.
    -   Eventuellt en timer som räknar ner till nästa pass eller visar pågående pass.
-   **Check-in/Check-out Knapp:**
    -   En framträdande knapp för att enkelt checka in vid arbetspassets början och checka ut vid slutet.
    -   Statusindikator (Incheckad/Utcheckad).
    -   Visar tid för senaste in-/utcheckning.
-   **Snabb Säljregistrering:**
    -   En knapp eller ett litet formulär för att snabbt öppna funktionen 'Registrera Sälj'.
-   **Mina To-Do's:**
    -   Visar de översta/mest brådskande uppgifterna från Chattarens personliga To-Do-lista.
    -   Möjlighet att snabbt markera en uppgift som klar.
    -   Länk till den fullständiga To-Do-listan.
-   **Senaste Meddelanden/Notiser:**
    -   Visar de senaste 'Brådskande Meddelanden' (globala eller från Chatting Manager).
    -   Eventuellt notiser om nya To-Do's eller schemaändringar.
    -   Länk till en fullständig meddelandevy.
-   **Snabbstatistik (Valfritt):**
    -   En liten widget som visar dagens/veckans registrerade sälj eller provision (om konfigurerat).
-   **Länk till Utbildningsmaterial:**
    -   Snabbåtkomst till sektionen 'Files & Education' där delat material finns.

## Anpassning

-   Dashboardens layout och vilka widgets som visas kan eventuellt vara konfigurerbar av Owner/Admin i framtiden, men en standardlayout bör definieras.

## Integrationer

-   Hämtar data från Schemahantering, Närvarohantering (Check-in), Registrera Sälj, Hantering av To-Do-listor, Brådskande Meddelanden och Utbildningsmaterial.
