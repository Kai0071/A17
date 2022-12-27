function bola(opsi,jari_jari,keterangan){
    if(!opsi)throw new TypeError("opsi tidak ditemukan")
    if(!isNaN(opsi))throw new TypeError("opsi tidak terdaftar")
    let a = [jari_jari]
    if(opsi.toLowerCase() === 'volume'){
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!jari_jari) throw new TypeError("angka untuk jari-jari dari bangun ruang bola tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(jari_jari))throw new TypeError("angka harus berupa nomor")
            let kv = 4/3 * 22/7 * (jari_jari * jari_jari * jari_jari)
            let gs = `volume = 4/3 x 22/7 x (jari-jari x jari-jari x jari-jari)\n       = 4/3 x 22/7 x (${jari_jari} x ${jari_jari} x ${jari_jari})\n       = 4/3 x 22/7 x ${jari_jari * jari_jari * jari_jari}\n       = ${kv}`
            return gs
        }
        if(!jari_jari) throw new TypeError("angka untuk jari-jari dari bangun ruang bola tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(jari_jari))throw new TypeError("angka harus berupa nomor")
            let av = 4/3 * 22/7 * (jari_jari * jari_jari * jari_jari)
            if(keterangan === true) return av
            return av

    }else if (opsi.toLowerCase() === 'lp' || opsi.toLowerCase() === 'luas') {
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!jari_jari) throw new TypeError("angka untuk jari-jari dari bangun ruang bola tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(jari_jari))throw new TypeError("angka harus berupa nomor")
            let ad = 4 * 22/7 * (jari_jari * jari_jari)
            let hs = `Luas permukaan = 4 x 22/7 x (jari_jari x jari_jari)\n               = 4 x 22/7 x (${jari_jari} x ${jari_jari})\n               = 4 x 22/7 x ${jari_jari * jari_jari}\n               = ${ad}`
            return hs
        }
        if(!jari_jari) throw new TypeError("angka untuk jari-jari dari bangun ruang bola tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(jari_jari))throw new TypeError("angka harus berupa nomor")
            let ac = 4 * 22/7 * (jari_jari * jari_jari)
            if(keterangan === false)return ac
            return ac
    }else{
        throw new TypeError("opsi tidak terdaftar")
    }
}

module.exports = bola;