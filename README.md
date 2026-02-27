# MyPasteryApp (Sweet Lab)

## Descriere
MyPasteryApp este o aplicatie web e-commerce de tip Single Page Application (SPA) destinata unei cofetarii artizanale. Platforma ofera o interfata fluida pentru clienti si un panou de control pentru gestionarea comenzilor si a inventarului de catre personal.

## Tehnologii Utilizate
* **Frontend**: React (Vite)
* **State Management**: Redux Toolkit
* **Rutare**: React Router 
* **Stilizare**: SCSS (variabile globale, design responsiv)
* **Backend & Auth**: Supabase (Baza de date si Autentificare)

## Functionalitati Principale

* **Sistem de Roluri si Autentificare**: 
  * *Vizitator*: Exploreaza catalogul si plaseaza comenzi.
  * *Worker*: Gestioneaza si proceseaza comenzile.
  * *Admin*: Acces complet la comenzi si la inventarul de produse.
* **Experienta Clientului**:
  * Catalog cu filtrare (text, categorie) si sortare (pret, alfabetic).
  * Cos de cumparaturi persistent (salvat in LocalStorage prin middleware Redux).
  * Plasare automata a comenzilor direct in baza de date.
* **Panoul de Control (Admin Dashboard)**:
  * Managementul inventarului: operatiuni CRUD pentru produse.
  * Sistem de "Soft Delete": Produsele sterse pot fi restaurate dintr-un modal dedicat.
  * Managementul comenzilor: Acceptarea sau respingerea comenzilor plasate de clienti.
