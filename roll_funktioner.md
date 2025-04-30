# Rollers Funktionstillgång (Översikt)

Detta dokument sammanfattar vilka användarroller som har tillgång till de olika huvudfunktionerna i plattformen, baserat på standardkonfigurationen och möjligheten för 'Owner' att delegera ytterligare behörigheter.

**Roller:** Owner, Admin, Manager/Chatting Manager, Chattare, Model, Virtual Assistant

---

## 1. Gemensamma Funktioner (`gemensamma_funktioner/`) - Detaljerad Åtkomst

Dessa funktioner är grundläggande och tillgängliga för de flesta roller, men med specifika begränsningar och möjligheter per roll:

*   **Direktmeddelanden (DM):**
    *   **Alla Roller:** Kan skicka och ta emot 1-till-1 meddelanden med rich text och emojis.
    *   **Begränsningar:** Vilka användare man kan initiera en chatt med kan vara begränsat. T.ex.:
        *   Chattare/Model/VA: Kan primärt initiera chatt med Managers, Admins, Owner.
        *   Manager/Chatting Manager: Kan initiera chatt med sina teammedlemmar, andra Managers, Admins, Owner.
        *   Admin/Owner: Kan initiera chatt med alla användare.
    *   **Gruppchattar:** Delta i gruppchattar de blivit tillagda i. (Skapande av gruppchattar hanteras under Admin/Owner-funktioner).

*   **Min To-Do Lista:**
    *   **Alla Roller:** Kan se sin egen To-Do-lista, lägga till egna privata uppgifter, markera uppgifter (både egna och tilldelade) som 'done'/'under process'.
    *   **Begränsningar:** Kan *inte* se eller redigera andras To-Do-listor (om inte Manager/Admin/Owner). Kan *inte* ta bort eller redigera uppgifter som tilldelats av en högre roll (t.ex. Manager).

*   **Närvarohantering (Checka in/ut):**
    *   **Chattare, Virtual Assistant (och ev. andra konfigurerade roller):** Kan checka in och ut för sina schemalagda pass. Kan se sin egen närvarohistorik och eventuella löneavdrag kopplade till sen ankomst/frånvaro.
    *   **Manager/Chatting Manager:** Kan se närvarostatus och historik för *sina teammedlemmar*.
    *   **Admin/Owner:** Kan se närvarostatus och historik för *alla* anställda. Kan konfigurera regler för löneavdrag.
    *   **Model:** Har normalt inte denna funktion (om inte specifikt konfigurerat).

*   **Signera Dokument:**
    *   **Alla Roller:** Kan se dokument som specifikt har delats med dem för signering. Kan öppna dokumentet, rita sin signatur och fylla i eventuella textfält som tilldelats dem. Kan se sina tidigare signerade dokument (t.ex. kontrakt) under sin profil.
    *   **Begränsningar:** Kan *endast* signera dokument de är part i. Kan *inte* ladda upp eller dela dokument för signering (detta görs av Admin/Owner).

*   **Ta Emot Meddelanden (Gruppchatt):**
    *   **Alla Roller:** Kan läsa och skicka meddelanden i de gruppchatter de är medlemmar i.

*   **Ta Emot Urgent Meddelanden:**
    *   **Alla Roller:** Tar emot notiser/pop-ups på sin dashboard när ett brådskande meddelande skickas till dem individuellt eller till deras rollgrupp. Kan läsa meddelandet.
    *   **Begränsningar:** Kan *inte* skicka brådskande meddelanden (om inte Admin/Owner/Chatting Manager till sitt team).

*   **Visa Delat Innehåll (Utbildning/Anteckningar):**
    *   **Alla Roller:** Kan navigera till 'Files & Education' (eller motsvarande) och se de specifika utbildningsdokument, sidor eller säkra anteckningstabeller som en Admin/Owner (eller ev. Manager för team-anteckningar) har delat med just dem eller deras rollgrupp. Kan läsa innehållet, se bilder/videos, etc.
    *   **Begränsningar:** Kan *inte* redigera, ta bort, skapa nytt eller dela vidare innehållet. Kan *endast* se det som aktivt delats med dem.

*   **Visa Schema:**
    *   **Alla Roller:** Kan se sitt eget personliga arbetsschema (dagar, tider, ledighet). Kan se schemat i sin egen tidszon och eventuellt även ägarens/agenturens tidszon för referens.
    *   **Begränsningar:** Kan *inte* redigera sitt eget schema (om inte Manager/Admin/Owner). Kan *inte* se andras scheman (om inte Manager/Admin/Owner).

---

## 2. Admin & Owner Funktioner (`admin_owner_funktioner/`)

Dessa funktioner är primärt tillgängliga för **Owner** och **Admin**. Owner kan ha exklusiv rätt till vissa delar initialt och kan delegera till Admin.

*   **Hantering av Anställda:**
    *   Owner: Fullständig hantering (skapa, redigera, lön, kontrakt, etc.).
    *   Admin: Nästan fullständig hantering (kan ej hantera Owner-kontot).
    *   Manager/Chatting Manager: Kan se teammedlemmar, ev. redigera viss info (To-Do) om delegerat.
*   **Utbildningsmaterial (Skapa/Redigera/Dela):**
    *   Owner/Admin: Fullständig hantering.
    *   Manager/Chatting Manager: Kan se allt, dela med team. Kan *inte* skapa/redigera.
*   **Schemahantering (För andra):**
    *   Owner/Admin: Hantera scheman för alla (utom Owner för Admin).
    *   Manager/Chatting Manager: Hantera scheman för *sina teammedlemmar*.
*   **Säker Anteckningshantering (Skapa/Hantera/Dela):**
    *   Owner/Admin: Fullständig hantering.
    *   Manager/Chatting Manager: Se delade, ev. skapa/hantera team-specifika om delegerat.
*   **Hantering av To-Do-listor (För andra):**
    *   Owner/Admin: Hantera To-Do för alla anställda.
    *   Manager/Chatting Manager: Hantera To-Do för *sina teammedlemmar*.
*   **Signaturer (Importera/Dela):**
    *   Owner/Admin: Importera och dela dokument för signering.
*   **Brådskande Meddelanden (Skicka):**
    *   Owner/Admin: Skicka till alla/utvalda.
    *   Chatting Manager: Skicka till *sitt team*.
*   **Direktmeddelanden (Admin-vy/Gruppchattar):**
    *   Owner/Admin: Skapa gruppchatter, bredare kommunikationsmöjligheter.

---

## 3. Owner Only Funktioner (`owner_only_funktioner/`)

Dessa funktioner är initialt **endast för Owner**, men åtkomst kan delegeras till Admin.

*   **Ekonomihantering (Registrera Intäkter/Utgifter):** Owner (kan delegeras till Admin).
*   **Statistik (Övergripande):** Owner (kan delegeras till Admin).
*   **Statistikkalkyler:** Owner (kan delegeras till Admin).
*   **Roll- och Behörighetshantering:** Owner (Admin kan hantera behörigheter men ej byta rollnamn).

---

## 4. Rollspecifika Funktioner

*   **Registrera Sälj (`chattare_funktioner/`, `admin_owner_funktioner/`, `chatting_manager_funktioner/`, `modell_funktioner/`):**
    *   Tillgängligt för: **Chattare, Owner, Admin, Manager/Chatting Manager, Model**. (Ej Virtual Assistant som standard).
*   **Intäktsöversikt (Personlig/Team) (`chattare_funktioner/`, `modell_funktioner/`):**
    *   Chattare: Se egen provision/intjäning.
    *   Model: Se intäkter genererade under sitt namn.
*   **Team Prestation/Meddelanden (`chatting_manager_funktioner/`):**
    *   Tillgängligt för: **Manager/Chatting Manager** för att se teamets statistik och skicka team-meddelanden.

---

**Notera:** Denna översikt baseras på standardroller. 'Owner' har möjlighet att finjustera behörigheter för enskilda användare utöver dessa standardinställningar.
