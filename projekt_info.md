**Vad bygger vi?**
En management plattform till för Onlyfans agencies, där de kan registrera konton för sina anställda och modeller för att ge varje anställd en egen dashboard samt för att ge Onlyfans Agenturen en samlad plats för alla deras affärs-behov relaterat till Onlyfans företagande. 

**Planeringsstruktur**
-   **Mappuppdelning**: Uppdelat mellan användare och funktioner, t.ex. funktionerna alla användare kommer ha finns under gemensamma_funktioner mappen, funktionerna endast owner och admin ska ha finns under admin_owner_funktioner mappen, och det finns mappar för alla användare samt .md filer som förklarar varje detalj i funktionen för respektive användare. 

**Ramverk, språk, databas och sådan projekt info nedanför**

---

## Teknisk Plan och Best Practices

Detta avsnitt beskriver den valda tekniska stacken och rekommenderade metoder för att bygga plattformen på ett hållbart och hanterbart sätt, särskilt med tanke på begränsad tidigare kodningserfarenhet.

### 1. Teknisk Stack

*   **Frontend Framework:** **Next.js (med React)**
    *   **Varför:** Ett kraftfullt och populärt React-ramverk som förenklar utvecklingen av moderna webbapplikationer. Det erbjuder funktioner som Server-Side Rendering (SSR), Static Site Generation (SSG), filbaserad routing och API-routes, vilket ger en bra struktur och prestanda. Den stora communityn innebär gott om resurser och hjälp att hitta.
    *   **Språk:** TypeScript (rekommenderas starkt över JavaScript för bättre kodkvalitet och färre fel tack vare statisk typning). Next.js har utmärkt inbyggt stöd för TypeScript.

*   **Backend & Databas:** **Supabase**
    *   **Varför:** En Backend-as-a-Service (BaaS) byggd ovanpå PostgreSQL. Detta minimerar behovet av att skriva egen backend-kod och tillhandahåller kritiska funktioner:
        *   **Databas:** PostgreSQL - en kraftfull och pålitlig relationsdatabas.
        *   **Autentisering:** Hanterar säker inloggning, registrering, lösenordsåterställning och användarsessioner.
        *   **Auktorisation (Row Level Security - RLS):** Kärnan i behörighetssystemet. RLS-policyer definieras direkt i Supabase-databasen för att exakt matcha de roller och behörigheter som beskrivs i `roller_behörigheter.md`. Detta är en säker och effektiv metod för att kontrollera dataåtkomst.
        *   **Realtime Subscriptions:** Möjliggör realtidsfunktioner som chatt (DM) och omedelbara notiser utan komplex backend-logik.
        *   **Storage:** För säker lagring och hantering av filer (kontrakt, utbildningsmaterial, bilder, videor).
        *   **Edge Functions:** (TypeScript/Deno) För eventuell anpassad serverlogik som inte kan hanteras direkt i frontend eller via databasen (t.ex. integration med externa API:er, komplexa beräkningar).

*   **Styling:** **Tailwind CSS**
    *   **Varför:** Ett "utility-first" CSS-ramverk som möjliggör snabb och konsekvent design direkt i HTML/JSX-koden. Det är mycket anpassningsbart och fungerar utmärkt med Next.js.

*   **UI Komponentbibliotek:** **shadcn/ui** (Rekommenderas)
    *   **Varför:** Ett modernt och populärt bibliotek som bygger på Tailwind CSS och Radix UI. Det erbjuder vackra, tillgängliga och anpassningsbara komponenter (knappar, formulär, tabeller, dialogrutor etc.) som kan kopieras in i projektet. Detta accelererar UI-utvecklingen avsevärt och säkerställer en konsekvent design. Alternativ inkluderar Flowbite React eller Material UI (MUI).

### 2. Arkitektur och Utvecklingsmetodik

*   **Projektstruktur:** Följ Next.js standardstruktur (`app/` eller `pages/` router, `components/`, `lib/` för hjälpfunktioner/Supabase-klient, `styles/`). Organisera komponenter och logik baserat på funktioner (t.ex. `components/employees/`, `app/dashboard/schedule/page.tsx`).
*   **Databasdesign:** Designa Supabase-databastabellerna noggrant för att representera data (anställda, roller, scheman, intäkter, utgifter, dokument etc.). Använd relationer (foreign keys) för att koppla samman data korrekt.
*   **Behörighetshantering (RLS):** Implementera Row Level Security-policyer i Supabase FÖR VARJE TABELL som innehåller känslig eller rollspecifik data. Testa dessa policyer noggrant för att säkerställa att användare endast kan se och modifiera den data de har behörighet till enligt `roller_behörigheter.md`. Detta är kritiskt för säkerheten.
*   **State Management (Frontend):** För enklare state, använd Reacts inbyggda `useState` och `useContext`. För mer komplex global state (t.ex. användarinformation, notiser), överväg Zustand eller Jotai som är enklare än Redux.
*   **Datahämtning:** Använd Supabase JavaScript-klienten (`@supabase/supabase-js`) i Next.js (både på servern för SSR/API routes och i klientkomponenter) för att interagera med databasen, autentisering och lagring.

### 3. Best Practices & Arbetsflöde för Framgång

*   **Versionshantering (Git):**
    *   **Obligatoriskt:** Använd Git och en plattform som GitHub eller GitLab från dag ett.
    *   **Arbetsflöde:** Skapa en `main` (eller `master`) branch för produktionskod. Skapa nya "feature branches" för varje ny funktion eller buggfix (t.ex. `feature/employee-management`, `fix/login-bug`). När en funktion är klar, skapa en Pull Request (PR) för att granska och sedan slå samman den till `main`.
    *   **Commits:** Gör små, frekventa commits med tydliga meddelanden (t.ex. "feat: Add employee creation form", "fix: Correct RLS policy for schedules").

*   **Iterativ Utveckling:**
    *   **Börja smått:** Implementera en funktion i taget.
    1.  **Setup:** Skapa Next.js-projekt, installera Supabase-klient, Tailwind, shadcn/ui. Konfigurera Supabase-projektet.
    2.  **Autentisering:** Implementera inloggning och registrering med Supabase Auth. Skydda sidor/routes så endast inloggade användare kommer åt dem.
    3.  **Första Modul:** Bygg kärnfunktionaliteten för en modul, t.ex. "Employee Management". Skapa databastabeller i Supabase, implementera RLS-policyer, bygg UI-komponenter i Next.js för att visa, skapa och redigera anställda.
    4.  **Testa:** Testa funktionen noggrant, inklusive behörighetsreglerna.
    5.  **Nästa Modul:** Gå vidare till nästa funktion (t.ex. Schemahantering) och upprepa processen.

*   **Supabase Migrations:**
    *   Använd Supabase CLI för att hantera databasändringar (skapa tabeller, lägga till kolumner etc.). Detta säkerställer att ändringar är spårbara och kan appliceras konsekvent i olika miljöer (lokal utveckling, produktion). `supabase migration new <migration_name>`, redigera SQL-filen, `supabase migration up`.

*   **Miljövariabler:**
    *   Lagra **aldrig** Supabase API-nycklar eller andra hemligheter direkt i koden.
    *   Använd `.env.local` filen (som inte checkas in i Git) för att lagra `NEXT_PUBLIC_SUPABASE_URL` och `SUPABASE_SERVICE_ROLE_KEY` (använd service role key *endast* på serversidan/API routes, aldrig i klientkod). Använd `NEXT_PUBLIC_SUPABASE_ANON_KEY` för klientkod.

*   **Kodkvalitet:**
    *   Använd **ESLint** och **Prettier** (konfigureras ofta automatiskt med `create-next-app`) för att automatiskt formatera kod och fånga vanliga fel. Håll koden ren och läsbar.
    *   Skriv **kommentarer** där koden är komplex eller gör något oväntat.
    *   Bryt ner stora komponenter och funktioner i mindre, återanvändbara delar.

### 4. Hur man Kommer Igång (Steg-för-steg Översikt)

1.  **Skapa Supabase Projekt:** Gå till supabase.com, skapa ett konto och ett nytt projekt. Notera din Projekt-URL och API-nycklar (anon och service_role).
2.  **Skapa Next.js Projekt:** Öppna terminalen och kör: `npx create-next-app@latest your-project-name --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"` (anpassa flaggor efter behov).
3.  **Installera Supabase Klient:** `npm install @supabase/supabase-js`
4.  **Installera shadcn/ui:** Följ instruktionerna på shadcn/ui-webbplatsen för att initiera det i ditt Next.js-projekt.
5.  **Konfigurera Miljövariabler:** Skapa en `.env.local` fil i roten av projektet och lägg till dina Supabase-nycklar.
6.  **Skapa Supabase Klient Helper:** Skapa en fil (t.ex. `src/lib/supabase/client.ts`) för att initiera Supabase-klienten för användning i klientkomponenter. Skapa en separat för serverkomponenter/API-routes om nödvändigt.
7.  **Implementera Autentisering:** Börja med att bygga inloggnings-/registreringssidor med hjälp av Supabase Auth och shadcn/ui-komponenter.
8.  **Börja Bygga Moduler:** Välj den första kärnfunktionen (t.ex. Employee Management) och börja definiera databasstrukturen i Supabase, implementera RLS, och bygg UI i Next.js.

Genom att följa denna plan och dessa metoder kan projektet utvecklas på ett strukturerat sätt, vilket minskar risken för problem och gör det lättare att hantera och bygga vidare på i framtiden. Fokusera på att förstå Supabase RLS och att bygga iterativt.
