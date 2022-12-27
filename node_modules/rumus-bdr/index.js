module.exports = {
    rdb: {
        kuadrat: require('./method/other/kuadrat.js'),
        kubik: require('./method/other/kubik.js'),
        pyhtagoras: require('./method/other/pyhtagoras.js'),
        perkalian: require('./method/other/perkalian.js')
    },
    datar:{
        keliling:{
            belahKetupat: require('./method/datar/keliling/belahKetupat.js'),
            jajarGenjang: require('./method/datar/keliling/jajarGenjang.js'),
            layang: require('./method/datar/keliling/layang.js'),
            lingkaran: require('./method/datar/keliling/lingkaran.js'),
            persegi: require('./method/datar/keliling/persegi.js'),
            persegiPanjang: require('./method/datar/keliling/persegiPanjang.js'),
            segitiga: require('./method/datar/keliling/segitiga.js'),
            trapesium: require('./method/datar/keliling/trapesium.js')
        },
        luas:{
            belahKetupat: require('./method/datar/luas/belahKetupat.js'),
            jajarGenjang: require('./method/datar/luas/jajarGenjang.js'),
            layang: require('./method/datar/luas/layang.js'),
            lingkaran: require('./method/datar/luas/lingkaran.js'),
            persegi: require('./method/datar/luas/persegi.js'),
            persegiPanjang: require('./method/datar/luas/persegiPanjang.js'),
            segitiga: require('./method/datar/luas/segitiga.js'),
            trapesium: require('./method/datar/luas/trapesium.js')
        }
    },
    ruang:{
        limas:{
            segiempat:require("./method/ruang/limas/empat.js"),
            segitiga:{
                volume:require("./method/ruang/limas/segitiga/samaVolume.js"),
                luasPermukaan:require("./method/ruang/limas/segitiga/samaVolume.js")
            }
        },
        prisma:{
            volume:{
                segitiga:require('./method/ruang/prisma/tiga/prisma.js')
            },
            luasPermukaan:{
                segitiga: require("./method/ruang/prisma/tiga/prismaLuas.js")
            }
        },
        balok: require("./method/ruang/balok.js"),
        bola: require('./method/ruang/bola.js'),
        kerucut: require('./method/ruang/kerucut.js'),
        kubus: require('./method/ruang/kubus.js'),
        tabung:require("./method/ruang/tabung.js")
    }
}