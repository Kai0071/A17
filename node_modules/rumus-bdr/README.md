# Rumus-bdr

<!-- <div align="center">
<a href="https://nppmjs.com/package/rumus-bdr"><img src="https://nodei.co/npm/rumus-bdr.png?downloads=true&stars=true" alt="Npm"></a><br>
<a href=""><img src="https://img.shields.io/npm/dt/rumus-bdr.svg?maxAge=3600" alt="Total Download"></a>
<a href=""><img src="https://img.shields.io/npm/v/rumus-bdr.svg?maxAge=3600" alt="Npm version"></a>
<a href=""><img src="https://img.shields.io/discord/729411185165991995?color=7289da&logo=discord&logoColor=white" alt="Discord Server"></a>

</div> -->

## 🔧 Instalasi

```
npm i rumus-bdr
```

## 🔎 Tentang

Rumus-Bdr adalah sebuah npm package yang dapat mempermudah anda untuk membantu menyelesaikan sebuah luas atau keliling bangun datar & sebuah luas permukaan dan volume bangun ruang

Rumus-Bdr juga dapat menyelesaikan rumus matematika yang lain seperti:
- Rumus Pythagoras
- Rumus Perkalian
- Rumus Kuadrat & Kubik

## 📄 Konten

Rumus-Bdr adalah rumus yang mencakup: 
- [Rumus Bangun Datar](#bangun_datar)
    - [Persegi](#bangun_datar)
    - [Persegi Panjang](#bangun_datar)
    - [Segitiga](#bangun_datar)
    - [Lingkaran](#bangun_datar)
    - [Layang-Layang](#bangun_datar)
    - [Jajar Genjang](#bangun_datar)
    - [Belah Ketupat](#bangun_datar)
    - [Trapesium](#bangun_datar)
- [Rumus Bangun Ruang](#bangun_ruang)
    - [Balok](#bangun_ruang)
    - [Kubus](#bangun_ruang)
    - [Kerucut](#bangun_ruang)
    - [Tabung](#bangun_ruang)
    - [Bola](#bangun_ruang)
    - [Prisma Segitiga](#bangun_ruang)
    - [Limas SegiEmpat](#bangun_ruang)
    - [Lima Segitiga](#bangun_ruang)
- [Rumus Matematika Lain](#matematika_lainnya)
    - [Kuadrat](#matematika_lainnya)
    - [Kubik](#matematika_lainnya) 
    - [Pyhtagoras](#matematika_lainnya)
    - [Perkalian](#matematika_lainnya)

## 📕 Contoh

- <b>Keterangan: Boolean (true atau false)</b>
    - true: Output akan mengeluarkan hasil beserta cara penyelesaian

    - false: Output hanya mengeluarkan hasil

- <b>Opsi: Pilihan<br></b>
        Opsi hanya digunakan untuk <b><i>sebagian</i></b> rumus bangun ruang 
       dan rumus pythagoras<br><br>
        <i>**Opsi Bangun Ruang:**</i><br>
     - volume: Volume dari bangun ruang

     - luas/lp: Luas Permukaan dari bangun ruang<br>
     
     
     <i>**Opsi Pyhtagoras:**</i>

     - miring: Mencari angka untuk sisi miring

     - alas: Mencari angka untuk alas

     - tinggi: Mencari angka untuk tinggi 

```js
const bdr = require("rumus-bdr")

const persegi = bdr.datar.keliling.persegi(5,false)
console.log(persegi)
/*
    Output -> 20
*/

const caraPersegi = bdr.datar.keliling.persegi(5,true)
console.log(caraPersegi)
/*
    Output -> Keliling = 4 x sisi
                       = 4 x 5
                       = 20
*/
```

## 📄 Dokumentasi

- [Bangun Datar](#bangun_datar)
- [Bangun Ruang](#bangun_ruang)
- [Matematika lainnya](#matematika_lainnya)

    ## Bangun_Datar

    - Persegi: 
    
       - **Keliling:** `.datar.keliling.persegi(sisi,keterangan)`

        - **Luas:** `.datar.luas.persegi(sisi,keterangan)`

    - Persegi Panjang: 

        - **Keliling:** `.datar.keliling.persegiPanjang(panjang,lebar,keterangan)`

        - **Luas:** `.datar.luas.persegiPanjang(panjang,lebar,keterangan)`

    - Segitiga: 

        - **Keliling:** `.datar.keliling.segitiga(sisi_1,sisi_2,sisi_3,keterangan)`

        - **Luas:** `.datar.luas.segitiga(alas,tinggi,keterangan)`

    - Lingkaran:

        - **Keliling:** `.datar.keliling.lingkaran(diameter,keterangan)`

        - **Luas:** `.datar.luas.lingkaran(jari_jari,keterangan)`

    - Layang-Layang:

        - **Keliling:** `.datar.keliling.layang(sisi_bawah,sisi_atas,keterangan)`

        - **Luas:** `.datar.luas.layang(sisi_bawah,sisi_atas,keterangan)`

    - Jajar Genjang:

        - **Kelliling:** `.datar.keliling.jajarGenjang(sisi_1,sisi_2,sisi_3,sisi_4,keterangan)`

        - **Luas:** `.datar.luas.jajarGenjang(alas,tinggi,keterangan)`

    - Belah Ketupat:

        - **Kelliling:** `.datar.keliling.belahKetupat(sisi,keterangan)`

        - **Luas:** `.datar.luas.belahKetupat(diagonal_1,diagonal_2,keterangan)`

    - Trapesium:

        - **Kelliling:** `.datar.keliling.belahKetupat(sisi_1,sisi_2,sisi_3,sisi_4,keterangan)`

        - **Luas:** `.datar.luas.belahKetupat(sisi_bawah,sisi_atas,tinggi_trapesium,keterangan)`
    
    ## Bangun_Ruang

    - **Balok:** `.ruang.balok(opsi,panjang,lebar,tinggi,keterangan)`

    - **Kubus:** `.ruang.kubus(opsi,sisi,keterangan)`

    - **Kerucut:** `.ruang.kerucut(opsi,jari_jari,tinggi_kerucut,keterangan)`

    - **Tabung:** `.ruang.tabung(opsi,jari_jari,tinggi_tabung,kerterangan)`

    - **Bola:** `.ruang.bola(opsi,jari_jari,keterangan)`

    - **Limas Segitiga Sama Sisi:**

        - <i><b>Volume:</b></i> `.ruang.limas.segitiga.volume(alas_segitiga,tinggi_alas,tinggi_limas,keterangan)`<br>


            <img src="https://cdn.discordapp.com/attachments/777509514890313758/788057185305100298/limasVol.jpg" alt="Limas Segitiga image" align="center"><br>

        - <i><b>Luas Permukaan:</b></i> `.ruang.limas.segitiga.volume(alas_limas,tinggi_limas,keterangan)`

    - **Limas SegiEmpat:** `.ruang.limas.segiEmpat(opsi,sisi_limas,tinggi_limas,keterangan)`

        <img src="https://cdn.discordapp.com/attachments/777509514890313758/788057338866171985/LimasSegiEmpat.jpg" alt="Limas SegiEmpat image" align="center">

    - **Prisma Segitiga:**

        - <i><b>Volume:</b></i> `.ruang.prisma.volume(alas,tinggi_alas,tinggi_prisma,keterangan)`

            <img src="https://cdn.discordapp.com/attachments/777509514890313758/788057510196019210/PrismaVolume.jpg" alt="Prisma Segitiga image" align="center"><br>

        - <i><b>Luas Permukaan:</i></b> `.ruang.prisma.luasPermukaan(alas_segitiga,tinggi_alas,sisi_1,sisi_2,sisi_3,tinggi_prisma,keterangan)`

        <img src="https://cdn.discordapp.com/attachments/777509514890313758/788057383012007936/PrismaLuas.jpg" alt="Prisma Segitiga image" align="center"><br>


    ## Matematika_Lainnya      

     - **Kuadrat:** `.rdb.kuadrat(angka)`

     - **Kubik:** `.rdb.kubik(angka)`

     - **Pyhtagoras:** `.rdb.pyhtagoras(opsi,angka_1,angka_2,keterangan)`

```js
const bdr = require("rumus-bdr")

const pyhtagoras = bdr.rdb.pyhtagoras("miring",8,6,false)
console.log(pyhtagoras)
// Output -> 10

const caraPyhtagoras = bdr.rdb.pyhtagoras("miring",8,6,true)
console.log(caraPyhtagoras)
/*
Output -> Miring = Akar Kuadrat Dari((alas x alas) + (tinggi x tinggi))
                 = Akar Kuadrat Dari((8 x 8) + (6 x 6))
                 = Akar Kuadrat Dari(64 + 36)
                 = Akar Kuadrat Dari(100)
                 = 10
*/
```

 <img src="https://cdn.discordapp.com/attachments/777509514890313758/788057518534033428/Pyhtagoras.jpg" alt="Pyhtagoras image" align="center"><br>


- **Perkalian:** `.rdb.perkalian(angka_perkalian,jumlah_perkalian)`

    ```js
    const bdr = require("rumus-bdr")

    const perkalian = bdr.rdb.perkalian(5,15)
    console.log(perkalian)
    /*
        Output -> 5 x 1 = 5
                  5 x 2 = 10
                  5 x 3 = 15
                  5 x 4 = 20
                  5 x 5 = 25
                  5 x 6 = 30
                  5 x 7 = 35
                  5 x 8 = 40
                  5 x 9 = 45
                  5 x 10 = 50
                  5 x 11 = 55
                  5 x 12 = 60
                  5 x 13 = 65
                  5 x 14 = 70
                  5 x 15 = 75
    */
    ```

## 📢 Discord Server

- [https://discord.gg/8rUvTYhFqK](https://discord.gg/8rUvTYhFqK)

## 📩 Masukan & Laporan
> Jika kalian memiliki masukan, saran, atau menemui bug, bisa join discord server kami [https://discord.gg/8rUvTYhFqK](https://discord.gg/8rUvTYhFqK)