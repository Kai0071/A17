const bdr = require('./index.js')

/*BANGUN DATAR KELILING*/
//jajar genjang dh bener
let belahKetupat = bdr.datar.keliling.belahKetupat(10,false)
let jajarGenjang = bdr.datar.keliling.jajarGenjang(5.5,3.5,4,5.5,false)
let layang = bdr.datar['keliling'].layang(3.2,3.4,true)
let lingkaran = bdr.datar.keliling.lingkaran(14,false)
let persegi = bdr.datar.keliling.persegi(5,true)
let persegiPanjang = bdr.datar.keliling.persegiPanjang(10,5,false)
let trapesium = bdr.datar.keliling.trapesium(5,3,2,1,false)
// console.log(persegi)

/*BANGUN DATAR LUAS */
let bk = bdr.datar.luas.belahKetupat(5,10,false)
let jg = bdr.datar.luas.jajarGenjang(20,30,false)
let ly = bdr.datar.luas.layang(40,30,false)
let lg = bdr.datar.luas.lingkaran(7,false)
let ps = bdr.datar.luas.persegi(10,false)
let psg = bdr.datar.luas.persegiPanjang(10,20,false)
let sg = bdr.datar.luas.segitiga(20,15,false)
let trp = bdr.datar.luas.trapesium(5,16,20,false)
// console.log(trp);

/*OTHER MTK */
let kuadrat = bdr.rdb.kuadrat(10)
let kubik = bdr.rdb.kubik(5)
let kali = bdr.rdb.perkalian(5,15)
let pg = bdr.rdb.pyhtagoras("miring",8,6,true)
console.log(pg)

/*BANGUN RUANG */
let balok = bdr.ruang.balok("lp",10,20,5,true)
let balokv = bdr.ruang.balok("volume",10,20,5,false)
let bola = bdr.ruang.bola("volume",14,false)
let vbola = bdr.ruang.bola("lp",14,false)
let kerucut = bdr.ruang.kerucut("lp",14,30,false)
let vkerucut = bdr.ruang.kerucut("volume",14,30,false)
let kubus = bdr.ruang.kubus("lp",8,false)
let vkubus = bdr.ruang.kubus("volume",8,false)
let tabung = bdr.ruang.tabung("lp",7,15,false)
let vtabung = bdr.ruang.tabung("volume",7,15,false)
let prisma = bdr.ruang.prisma.luasPermukaan.segitiga(20,30,30,43,35,25,false)
let vprisma = bdr.ruang.prisma.volume.segitiga(12,20,30,false)
let limasEmpat = bdr.ruang.limas.segiempat("lp",15,35,true)
let vlimasEmpat = bdr.ruang.limas.segiempat("volume",15,35,true)
let limasTiga = bdr.ruang.limas.segitiga.volume(15,20,20,false)
let vlimasTiga = bdr.ruang.limas.segitiga.luasPermukaan(25,10,20,false)
// console.log(vlimasEmpat)
// console.log(limasEmpat)

