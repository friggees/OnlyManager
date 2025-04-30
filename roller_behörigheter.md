# Roller och Behörigheter
Owner, Admin, Manager, Chatting Manager, Chatter, Model, Virtual Assistant

## Owner

En 'Owner' är den primära kontoadministratören för en agentur på plattformen. Denna roll har de mest omfattande behörigheterna för att hantera alla aspekter av agenturens verksamhet inom systemet.

### Behörigheter:

**Användarhantering (Employees):**
*   Skapa konton för anställda.
*   Redigera och lägga till löneuppgifter (fast lön, procentuell ersättning).
*   Konfigurera löneavdrag baserat på närvaro (sen ankomst, frånvaro).
*   Lägga till anställdas Telegram-användarnamn.
*   Lägga till övrig information ('Other' info) för anställda.
*   Ladda upp och hantera anställningsavtal och andra kontrakt.
*   Redigera anställdas 'To-do'-listor.

**Ekonomi (Economy):**
*   Registrera intäkter och ange källa.
*   Registrera utgifter, ange källa och typ (engångs/återkommande).

**Utbildningsmaterial (Files & Education):**
*   Skapa och importera utbildningsmaterial (likt Notion, men förenklat).
*   Importera befintliga PDF- och Word-dokument som utbildningsmaterial.
*   Redigera utbildningsinnehåll (text, bilder, video, callouts, text-rutor) med fri placering på ett gridnät.
*   Formatera text (färg, fet, kursiv, understruken, rubriker, dropdown-text).
*   Dela specifikt utbildningsmaterial med utvalda användare.

**Schemaläggning:**
*   Skapa, redigera och ta bort schemaposter (dagar, tider, ledighet, exakta timmar) för alla användare, inklusive sig själv.
*   Se både sin egen och den anställdes tidszon i schemavyn.

**Säkra Anteckningar (Notes/Passwords):**
*   Skapa och hantera säkra anteckningar/lösenordstabeller (likt Excel, men förenklat) skyddade med PIN-kod.
*   Lägga till kolumner för specifik information (t.ex. användarnamn, lösenord, proxy ID, 2FA-kod).
*   Dela specifika anteckningar/tabeller med utvalda anställda.

**To-Do Listor:**
*   Hantera sin egen och anställdas 'To-do'-listor (lägga till, ändra, ta bort uppgifter).
*   Markera uppgifter som brådskande/icke-brådskande och slutförda/pågående.
*   Aktivera notispåminnelser för anställdas uppgifter.

**Importera PDF med penna och text funktion:**
*   Importera PDF-dokument för signering med penna
*   Dela en PDF med en specifik anställd för gemensam signering (både 'Owner' och anställd signerar).
*   Automatiskt spara signerade dokument under den anställdes profil ('contract'-sektionen).

**Statistik (Statistics):**
*   Se sammanställd statistik baserad på registrerade intäkter, utgifter och försäljning.
*   Se hur utgifter påverkar budgeten.
*   Alternativ för att exkludera OnlyFans-avgift eller ange manuell avgiftsprocent för chattar-försäljning.
*   Se statistik över anställdas närvaro (procentuell närvaro/frånvaro).
*   Filtrera statistik baserat på olika kriterier och tidsperioder (dag, vecka, månad, år, specifika datum).
*   Se översiktlig statistik (total intäkt, utgift, differens, tillväxttakt %, genomsnittlig närvaro/frånvaro).

**Kommunikation:**
*   Starta 1-till-1 direktmeddelanden (DM) med valfri anställd (med stöd för rich text och emojis).
*   Skapa gruppchatter.
*   Skicka ut brådskande meddelanden ('Urgent Announcements') till utvalda användare eller användargrupper.

**Systemadministration:**
*   Hantera roller och behörigheter för andra användare (lägga till/ta bort specifika behörigheter).
*   Byta namn på befintliga roller (t.ex. ändra 'Manager' till 'Site-manager').

## Admin

En 'Admin' har nästintill fullständiga behörigheter, liknande 'Owner', men kan ha vissa begränsningar gällande systemkritiska eller ägarspecifika funktioner.

### Behörigheter:

**Användarhantering (Employees):**
*   Skapa, redigera och ta bort konton för anställda (exklusive 'Owner').
*   Hantera löneuppgifter och avdrag.
*   Hantera kontaktinformation och kontrakt.
*   Redigera anställdas 'To-do'-listor.

**Ekonomi (Economy):**
*   Registrera intäkter och utgifter.
*   Full tillgång till ekonomisk data.

**Utbildningsmaterial (Files & Education):**
*   Skapa, importera, redigera och dela utbildningsmaterial.

**Schemaläggning:**
*   Skapa, redigera och ta bort schemaposter för alla användare (exklusive 'Owner').
*   Se alla användares scheman och tidszoner.

**Säkra Anteckningar (Notes/Passwords):**
*   Skapa, hantera och dela säkra anteckningar/lösenordstabeller.

**To-Do Listor:**
*   Hantera sin egen och alla anställdas 'To-do'-listor.
*   Aktivera notispåminnelser.

**Signaturer (Signatures):**
*   Importera, dela och hantera dokument för signering.

**Statistik (Statistics):**
*   Se all sammanställd statistik (ekonomi, närvaro, etc.).
*   Filtrera och analysera data.

**Kommunikation:**
*   Starta DM, skapa gruppchatter och skicka 'Urgent Announcements'.

**Systemadministration:**
*   Hantera roller och behörigheter för användare (exklusive 'Owner').
*   Kan *inte* byta namn på roller eller utföra systemkritiska ändringar som 'Owner' kan.

## Manager

En 'Manager' ansvarar för att leda ett team eller en specifik avdelning inom agenturen. Behörigheterna fokuserar på personalhantering, schemaläggning och uppföljning för sitt team.

### Behörigheter:

**Användarhantering (Employees):**
*   Se information om anställda inom sitt team.
*   Kan ha behörighet att redigera viss information (t.ex. kontaktuppgifter, 'To-do') för sina teammedlemmar, beroende på konfiguration av 'Owner'/'Admin'.
*   Kan *inte* skapa/ta bort konton eller hantera löneuppgifter/kontrakt.

**Ekonomi (Economy):**
*   Kan ha begränsad insyn i team-relaterade intäkter/utgifter, beroende på konfiguration.
*   Kan *inte* registrera nya poster.

**Utbildningsmaterial (Files & Education):**
*   Se allt utbildningsmaterial.
*   Dela relevant material med sina teammedlemmar.
*   Kan *inte* skapa eller redigera material.

**Schemaläggning:**
*   Skapa, redigera och ta bort schemaposter för sina teammedlemmar och sig själv.
*   Se scheman för sina teammedlemmar.

**Säkra Anteckningar (Notes/Passwords):**
*   Se anteckningar/tabeller som delats med dem eller deras team.
*   Kan ha behörighet att skapa/hantera team-specifika anteckningar.

**To-Do Listor:**
*   Hantera sin egen 'To-do'-lista.
*   Hantera 'To-do'-listor för sina teammedlemmar (lägga till, ändra, markera som slutförd).
*   Aktivera notispåminnelser för teammedlemmars uppgifter.

**Signaturer (Signatures):**
*   Se dokument som kräver deras eller teammedlemmars signatur.
*   Signera dokument som de är part i.

**Statistik (Statistics):**
*   Se statistik relaterad till sitt teams prestation och närvaro.
*   Kan *inte* se övergripande ekonomisk statistik för hela agenturen.

**Kommunikation:**
*   Starta DM med teammedlemmar och andra managers/admins.
*   Skapa gruppchatter för sitt team.
*   Ta emot 'Urgent Announcements'.

## Chatting Manager

En 'Chatting Manager' är en specialiserad managerroll med fokus på att leda och övervaka chattoperatörer ('Models', 'Chatter').

### Behörigheter:

**Användarhantering (Employees):**
*   Liknande 'Manager', men specifikt för chatt-teamet. Se information, hantera 'To-do'.
*   Har insyn i prestation kopplad till chatt som försäljning per chattare och team

**Ekonomi (Economy):**
*   Insyn i intäkter genererade av chatt-teamet.
*   Kan *inte* se övergripande ekonomi eller registrera poster.

**Utbildningsmaterial (Files & Education):**
*   Se och dela utbildningsmaterial relevant för chattoperatörer.

**Schemaläggning:**
*   Hantera scheman specifikt för chatt-teamet.

**Säkra Anteckningar (Notes/Passwords):**
*   Hantera och dela anteckningar/lösenord relevanta för chattkonton och processer (t.ex. inloggningsuppgifter till plattformar, scripts).

**To-Do Listor:**
*   Hantera 'To-do'-listor för chatt-teamet, ofta relaterade till specifika konton eller kampanjer.

**Statistik (Statistics):**
*   Se detaljerad statistik för chatt-teamets prestation (försäljning, aktivitet, närvaro).

**Kommunikation:**
*   Kommunicera med chatt-teamet via DM och gruppchatter.
*   Ta emot 'Urgent Announcements'.
*   Skicka 'Urgent Announcements' till chatt-teamet

## Model

En 'Model' är en kreatör eller artist vars onlyfans konto hanteras av agenturen. Modellen ska ha behörighet att se saker gällande henne själv som genomsnittlig intäkt på försäljning, schema, utbildningar och content-plan

### Behörigheter:

**Användarhantering (Employees):**
*   Se sin egen profilinformation (kontaktuppgifter, etc.). Redigering hanteras av Admin/Owner.
*   Se sina egna löneuppgifter och kontrakt.
*   Kan *inte* se eller redigera andra användares information.

**Ekonomi (Economy):**
*   Har insyn i intäkter chattarna registrerat som sälj under hennes namn
*   Kan *inte* se agenturens övergripande ekonomi eller registrera poster.

**Utbildningsmaterial (Files & Education):**
*   Se utbildningsmaterial som delats med dem.
*   Kan *inte* skapa, redigera eller dela material.

**Schemaläggning och content-plan:**
*   Se sitt eget schema.
*   Se sin content-plan med bild/video exempel och förklarande texter.
*   Kan *inte* se eller redigera andras scheman.

**Säkra Anteckningar (Notes/Passwords):**
*   Se säkra anteckningar/lösenord som specifikt delats med dem (t.ex. inloggningsuppgifter till sociala medier).
*   Kan *inte* skapa eller hantera egna tabeller om inte specifikt tillåtet.

**To-Do Listor:**
*   Se och hantera sin egen 'To-do'-lista.
*   Markera egna uppgifter som slutförda.
*   Kan *inte* se eller redigera andras listor.

**Signaturer (Signatures):**
*   Se och signera dokument som kräver deras signatur.
*   Se sina signerade kontrakt.

**Statistik (Statistics):**
*   Se sin egen prestationsstatistik (t.ex. intäkter, närvaro), beroende på konfiguration.
*   Kan *inte* se agenturens eller andra anställdas statistik.

**Kommunikation:**
*   Starta DM med managers och admins.
*   Delta i relevanta gruppchatter.
*   Ta emot 'Urgent Announcements'.

## Chattare

En 'Chattare' är en anställd vars primära uppgift är att hantera kommunikation och försäljning på plattformar som OnlyFans för agenturens modeller.

### Behörigheter:

**Användarhantering (Employees):**
*   Se sin egen grundläggande profilinformation. Redigering hanteras av Admin/Owner.
*   Se sina egna löneuppgifter och kontrakt.
*   Checka in/ut för arbetspass (om närvarosystem används).
*   Kan *inte* se eller redigera andra användares information.

**Ekonomi (Economy):**
*   Registrera försäljning/intäkter kopplade till de konton de hanterar. Ange källa (t.ex. vilket modellkonto).
*   Kan se hur mycket dem har tjänat i provision med filtrering som dag, vecka, månad, år och specifika datum
*   Kan *inte* se agenturens övergripande ekonomi eller registrera utgifter.

**Utbildningsmaterial (Files & Education):**
*   Se utbildningsmaterial som delats med dem (t.ex. chatt-strategier, scripts).
*   Kan *inte* skapa, redigera eller dela material.

**Schemaläggning:**
*   Se sitt eget schema.
*   Kan *inte* redigera sitt schema (endast se).

**Säkra Anteckningar (Notes/Passwords):**
*   Se säkra anteckningar/lösenord som specifikt delats med dem (t.ex. inloggningsuppgifter till chattplattformar, modellspecifika detaljer).
*   Kan *inte* skapa eller hantera egna tabeller.

**To-Do Listor:**
*   Se och hantera sin egen 'To-do'-lista (t.ex. uppföljning med specifika kunder, nå försäljningsmål).
*   Markera egna uppgifter som slutförda.
*   Kan *inte* se eller redigera andras listor.

**Signaturer (Signatures):**
*   Se och signera dokument som kräver deras signatur (t.ex. anställningsavtal).
*   Se sina signerade kontrakt.

**Statistik (Statistics):**
*   Se sin egen närvarostatistik.
*   Se sin egen försäljningsstatistik och eventuell provision.
*   Kan *inte* se agenturens eller andra anställdas statistik (förutom eventuella topplistor om det implementeras).

**Kommunikation:**
*   Starta DM med managers (särskilt Chatting Manager) och admins.
*   Delta i relevanta gruppchatter (t.ex. chatt-teamet).
*   Ta emot 'Urgent Announcements'.

## Virtual Assistant

En 'Virtual Assistant' (inom OnlyFans-branschen) använder plattformen primärt för att ta emot information, utbildning och hantera sina arbetsuppgifter och schema. De har begränsade redigeringsmöjligheter.

### Behörigheter:

**Användarhantering (Employees):**
*   Se sin egen grundläggande profilinformation. Redigering hanteras av Admin/Owner.
*   Se sina egna löneuppgifter och kontrakt.
*   Checka in/ut för arbetspass
*   Kan *inte* se eller redigera andra användares information.

**Ekonomi (Economy):**
*   Kan se hur mycket deras nästa lön är på samt när den är och se avdrag på lönen uppdaterade direkt vid t.ex. sen ankomst

**Utbildningsmaterial (Files & Education):**
*   Se utbildningsmaterial som delats med dem.
*   Kan *inte* skapa, redigera eller dela material.

**Schemaläggning:**
*   Se sitt eget schema.
*   Kan *inte* redigera sitt schema (endast se).

**Säkra Anteckningar (Notes/Passwords):**
*   Se säkra anteckningar/lösenord som specifikt delats med dem (t.ex. för specifika arbetsuppgifter).
*   Kan *inte* skapa eller hantera egna tabeller.

**To-Do Listor:**
*   Se och hantera sin egen 'To-do'-lista (markera uppgifter som slutförda).
*   Kan *inte* se eller redigera andras listor.

**Signaturer (Signatures):**
*   Se och signera dokument som kräver deras signatur.
*   Se sina signerade kontrakt.

**Statistik (Statistics):**
*   Se sin egen närvarostatistik.
*   Kan eventuellt se begränsad egen prestationsstatistik om relevant för rollen (t.ex. antal hanterade meddelanden), beroende på konfiguration.
*   Kan *inte* se agenturens eller andra anställdas statistik.

**Kommunikation:**
*   Starta DM med managers och admins.
*   Delta i relevanta gruppchatter.
*   Ta emot 'Urgent Announcements'.
