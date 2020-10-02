# Language learning platform ( Italki clone )
Full stack webdevelopment assignment
## Feladat funkcionális követelményei:

  - Alkalmazás:
    - Lehet regisztrálni az alkalmazásba
    - Ki/be lehet jelentkezni
    - A regisztrált felhasználók rendelkeznek egy profillal

  - Tanuló:
    - Van lehetősége nyelvet választani
    - Tanulóként lehet szűrni a tanárok között különböző szempontok alapján
    - Tud órákat foglalni
    - Van egy felület kommunikálni a tanárral
    - Beadhat megoldásokat házikra

  - Tanár:
    - A tanárok naptárjaikban jelezhetik mikor érnek rá órát tartani
    - A tanárok feltölthetnek fájlokat 
    - A tanárok kiírhatnak házikat és javíthatják őket

## Feladat nem funkcionális követelményei:

  - Megbízhatóság érdekében a REST végpontok tesztelésre kerülnek
  - Autentikáció és autorizáció a hitelesítés és biztonság érdekében
  - Az alkalmazás kinézete igényes és több böngészőt is támogat
  - Technológiai megszorítások:
      * Az adatbázis: **SQLite**
      * A szerveroldali **REST API typescript** nyelven íródik, **Node.js** alatt és **Express** keretrendszerben
      * A kliensoldal **Angular** keretrendszerben készül

## Szakterületi fogalomjegyzék:

  - SQLite
  - REST API
  - Angular
  - MVC
  - Komponens
  - Autentikáció
  - Autorizáció

## Szerepkörök

  - Vendég: Azonosítatlan felhasználó korlátozott jogokkal, csak a publikus oldalat éri.
  - Bejelentkezett felhasználó:
    * **Tanuló**: profillal rendelkezik és hozzáfér az oldal tanulóknak szánt funkcióihoz
    * **Tanárok**: profillal rendelkezik és hozzáfér az oldal tanároknak szánt funkcióihoz
    * **Admin**: törölhet regisztrált felhasználókat
    
# Fejlesztők:

  - Oláh Regina Ildikó Y3WIW6
  - Kocsis Barnabás Péter HM02MI
