# Min To-Do Lista

Denna funktion ger anställda (alla roller utom möjligen Owner/Admin som använder den administrativa vyn) möjlighet att se och hantera sina egna personliga arbetsuppgifter.

## Syfte

Att ge anställda en tydlig överblick över sina tilldelade uppgifter, deadlines och status, samt möjlighet att markera när uppgifter är slutförda.

## Funktioner

-   **Visa Uppgifter:** Listar alla uppgifter som tilldelats den inloggade användaren.
    -   Visar uppgiftens namn/beskrivning.
    -   Visar eventuell deadline.
    -   Visar status (t.ex. 'Att göra', 'Pågående', 'Klar').
    -   Visar prioritet (t.ex. 'Brådskande', 'Normal').
-   **Markera som Klar:** Möjlighet för användaren att markera en uppgift som slutförd. Statusen uppdateras då i systemet och blir synlig för managers/admins.
-   **Filtrering/Sortering:** (Valfritt) Möjlighet att sortera listan efter deadline, prioritet eller status.
-   **Notiser:** Användaren kan få notiser om nya tilldelade uppgifter eller påminnelser om deadlines (om aktiverat av den som skapade uppgiften via den administrativa vyn).

## Skillnad mot Administrativ Vy

-   Denna vy tillåter endast hantering av den *egna* listan.
-   Användaren kan primärt ändra status (markera som klar), men inte nödvändigtvis redigera eller ta bort uppgifter som tilldelats av en manager/admin (detta styrs via `huvudfunktioner/Hantering_av_To-Do-listor.md`).

## Integrationer

-   **Hantering av To-Do-listor (Admin):** Uppgifter som skapas/tilldelas via den administrativa vyn visas här. Statusändringar gjorda här reflekteras i den administrativa vyn.
-   **Dashboard:** Visar ofta en sammanfattning eller de mest brådskande uppgifterna från denna lista.
