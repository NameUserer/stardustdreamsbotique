# Stardust Dreams Botique
### Vizsgamunka Dokumentáció – Frontend

## Készítette:
###  -Papp Lilla


## Rövid leírás:
A Stardust Dream Boutique egy olyan online webáruház, amely elsősorban Hoyo-verse témájú jelmezekre és merch termékekre specializálódik.
A célközönség főként cosplay-rajongók, szerepjátékosok és azok, akik különleges ruhákat és kiegészítőket keresnek rendezvényekre vagy saját örömükre.
A weboldal letisztult dizájnnal, felhasználóbarát felépítéssel készült, hogy a vásárlási élmény egyszerű legyen.

## A webáruház frontendje a következő technológiák felhasználásával készült:
* HTML5
  A HTML-t használtam az oldal szerkezetének felépítésére, az egyes oldalak (például home, cart, profile) alapvázának létrehozására. A HTML-ben helyeztem el a termékkártyák konténereit, a navigációs menüt és a formokat (pl. bejelentkezés és regisztráció).

* CSS3
A CSS segítségével alakítottam ki az oldal megjelenését, színeit, elrendezését és reszponzivitását. Használtam saját stílusokat a webshop egyedi hangulatához igazítva, például halvány pasztell színeket és lekerekített éleket, hogy illeszkedjen a „Stardust Dream” letisztult stílushoz.

* JavaScript
A JavaScript biztosítja az oldal interaktivitását. Ezzel oldottam meg többek között:

  * termékek dinamikus betöltését az adatbázisból,

  * kosárba és kívánságlistába helyezés funkciót,

  * popup visszajelzéseket sikeres vagy hibás műveletek esetén,

  * profilkép frissítését és változtatását.

* SweetAlert2
A SweetAlert2-t használtam modern és esztétikus popup ablakok megjelenítésére. Ezt alkalmaztam például termék hozzáadásakor az Admin oldalon, bejelentkezés vagy regisztráció választása a profil kiválasztásakor, illetve ha nincs bejelentkezve a felhasználó és úgy szerette volna a kosár, üzenetek vagy a kívánságlista opciókat választani.

* Bootstrap
A Bootstrap framework segítségével gyorsan és hatékonyan hoztam létre reszponzív elrendezést és mobilbarát felületeket. Használtam beépített komponenseket, például grid rendszert és kártyákat, amelyeket saját stílusaimmal tovább formáztam.

## Oldalak bemutatása
Ez a weboldal 17 html oldalt vett igénybe:
  <details>
  <summary><code>index.html</code></summary>
  <p>Ez az oldal bevezeti a vásárlót a főoldalra. Innen lehet eljutni a home.html-re. Áttekintő, bevezető oldal, amely bemutatja a webáruház stílusát.</p>
  ![wellcomepage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/welcomepage.png)
</details>

<details>
  <summary><code>home.html</code></summary>
  <p>A termékek főoldala, ahol kategóriák és típusok szerint listázva jelennek meg a termékkártyák. Innen lehet hozzáadni a termékeket a kosárba vagy a kívánságlistába.</p>
  ![homepage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/homepage.png)
</details>

<details>
  <summary><code>mail.html</code></summary>
  <p>Itt tekintheti meg a felhasználó az eddigi vásárlásait, minden rendelés eltárolásra kerül. A legújabbak felül jelennek meg.</p>
  ![mailpage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/mailpage.png)
</details>

<details>
  <summary><code>wishlist.html</code></summary>
  <p>A felhasználó kívánságlistája. Bejelentkezés után itt gyűjtheti össze azokat a termékeket, amiket meg szeretne vásárolni később.</p>
  ![wishlistpage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/wishlistpage.png)
</details>

<details>
  <summary><code>cart.html</code></summary>
  <p>A kosár oldala, ahol a kiválasztott termékek láthatók. Innen lehet továbblépni a vásárlásra vagy a termékek szerkesztésére.</p>
  ![cartpage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/cartpage.png)
</details>

<details>
  <summary><code>login.html</code></summary>
  <p>A bejelentkezés felülete. A felhasználók itt tudnak belépni meglévő fiókjukkal.</p>
  ![loginpage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/loginpage.png)
</details>

<details>
  <summary><code>registration.html</code></summary>
  <p>Új fiók létrehozása ezen az oldalon történik, név, email és jelszó megadásával.</p>
  ![singuppage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/singuppage.png)
</details>

<details>
  <summary><code>profile.html</code></summary>
  <p>A felhasználó profiljának áttekintése. Innen elérhetők a profilbeállításokat kezelő oldalak.</p>
  ![profilepage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/profilepage.png)
</details>

<details>
  <summary><code>profileAddress.html</code></summary>
  <p>A szállítási cím módosítására szolgáló oldal.</p>
  ![addresspage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/addresspage.png)
</details>

<details>
  <summary><code>profileName.html</code></summary>
  <p>A felhasználónév módosítása ezen az oldalon történik.</p>
  ![usernamepage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/usernamepage.png)
</details>

<details>
  <summary><code>profilePic.html</code></summary>
  <p>A profilkép kiválasztására és frissítésére szolgáló oldal. A változtatások azonnal megjelennek.</p>
  ![profilepicpage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/profilepicpage.png)
</details>

<details>
  <summary><code>profilePsw.html</code></summary>
  <p>A jelszó módosítása biztonságos mezőkön keresztül történik. Jelenlegi és új jelszót is meg kell adni.</p>
  ![passwordpage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/passwordpage.png)
</details>

<details>
  <summary><code>setting.html</code></summary>
  <p>Felhasználói beállítások áttekintése és módosítása.</p>
  ![settingpage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/settingpage.png)
</details>

<details>
  <summary><code>admin.html</code></summary>
  <p>Az adminisztrátor számára készült oldal, ahonnan kezelheti a webshop termékeit.</p>
  ![adminpage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/adminpage.png)
</details>

<details>
  <summary><code>add.html</code></summary>
  <p>Új termék hozzáadása az adatbázishoz. Az admin innen tölthet fel új cosplay vagy merch cikkeket.</p>
  ![addpage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/addpage.png)
</details>

<details>
  <summary><code>pcp.html</code></summary>
  <p>Adatkezelési nyilatkozat – itt olvasható, hogyan kezeljük a felhasználók adatait.</p>
  ![pcppage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/pcppage.png)
</details>

<details>
  <summary><code>tc.html</code></summary>
  <p>Felhasználási feltételek – a webshop használatára vonatkozó szabályzat.</p>
  ![tcpage](https://raw.githubusercontent.com/NameUserer/stardustdreamsbotique/master/img/tcpage.png)
</details>

## Funkcionalitások

| Funkció                           | Leírás                                                                 |
|----------------------------------|------------------------------------------------------------------------|
| Kosárba helyezés                 | A felhasználó kiválaszthat termékeket, amiket a kosárba tehet.        |
| Kívánságlistára helyezés         | Bejelentkezett felhasználók kívánságlistára tehetik a kiszemelt termékeket. |
| Popup visszajelzések             | A SweetAlert2 használatával megjelenő üzenetek sikeres vagy hibás műveletekről. |
| Profilkép frissítése             | A felhasználó módosíthatja a profilképét, amely azonnal frissül a profil oldalon. |
| Bejelentkezés / Regisztráció figyelés | A rendszer figyeli, hogy be van-e jelentkezve a felhasználó, és ennek megfelelően ad hozzáférést funkciókhoz. |
| Admin termék hozzáadás           | Az admin felület lehetőséget biztosít új termékek feltöltésére.       |

### Reszponzív dizájn

<p>Az oldal mobilról és tabletről is könnyen kezelhető a Bootstrap és egyéni CSS megoldások segítségével.</p>

Media Query-k használata (CSS3)
* Olyan szabályokat írtam, amelyek csak bizonyos képernyőszélesség esetén érvényesülnek. Például mobilnézetnél a termékkártyák egymás alá rendeződnek, míg asztali nézetben rácsszerű elrendezést kapnak.
* 768px, 1024px figyelembevételével alakítottam a nézeteket.

Grid elrendezések
* A rugalmas elrendezések lehetővé teszik, hogy az elemek helyezkedése dinamikusan változzon a képernyőmérettől függően.

```css
@media (max-width: 768px) {
    .box {
        width: 80%;
    }
    .table {
        border-bottom-left-radius: 40px;
        border-bottom-right-radius: 40px;
    }
    .web p {
        margin-top: 7%;
        margin-bottom: 7%;
    }
    .app p {
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .web{
        margin-top: 15px;
    }
    .form-group input{
        width: 100%;
    }
    .search{
        width: 90%;
        height: 60px;
        top: 75px;
        justify-content: space-around;
    }
    .searchbar{
        width: 70%;
        height: 50px;
    }
    .searchbar input {
        width: 60%;
    }
    .filterbutton {
        width: 50px;
        height: 50px;
    }
    .search img {
        width: 30px;
        height: 30px;
    }
    .navbar{
        flex-direction: row;
        justify-content: space-around;
        width: 90%;
        height: 60px;
        top: 10px;
    }
    .navbar img {
        width: 30px;
        height: 30px;
        object-fit: fill;
    }
    .navbar .icon {
        width: 45px;
        height: 45px;
        align-items: center;
        justify-content: center;
        margin-top: -15px;
    }

    .info{
        flex-direction: row;
        justify-content: space-around;
        width: 95%;
        height: 70px;
        bottom: 20px;
    }

    .info div {
        margin-top: 5%;
    }

    .info button {
        margin: 1%;
    }
    .add button {
        font-size: 20px;
        border-radius: 30px;
        width: 100px;
        height: 50px;
        position: fixed;
        bottom: auto;
        top: 1%;
        right: 5%;
    }
}
```
[Frontend elérhetősége](https://stardustdreams.netlify.app/home.html)
