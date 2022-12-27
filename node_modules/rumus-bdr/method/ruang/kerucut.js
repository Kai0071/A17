function kerucut(opsi,jari_jari,tinggi,keterangan){
    if(!opsi)throw new TypeError("opsi tidak ditemukan")
    if(!isNaN(opsi))throw new TypeError("opsi tidak terdaftar")
    let a = [jari_jari,tinggi]
    if(opsi.toLowerCase() === 'volume'){
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!jari_jari)throw new TypeError("angka untuk jari-jari dari alas kerucut tidak ditemukan")
            if(!tinggi)throw new TypeError("angka untuk tinggi dari kerucut tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(jari_jari) || isNaN(tinggi))throw new TypeError("angka harus berupa nomor")
            let g = 1/3 * 22/7 * (jari_jari * jari_jari) * tinggi
            let ds = `volume = 1/3 x 22/7 x (jari-jari x jari-jari) x tinggi\n       = 1/3 x 22/7 x ( ${jari_jari} x ${jari_jari} ) x ${tinggi}\n       = 1/3 x 22/7 x ${jari_jari * jari_jari} x ${tinggi}\n       = ${g}`
            return ds
        }
        if(!jari_jari)throw new TypeError("angka untuk jari-jari dari alas kerucut tidak ditemukan")
            if(!tinggi)throw new TypeError("angka untuk tinggi dari kerucut tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(jari_jari) || isNaN(tinggi))throw new TypeError("angka harus berupa nomor")
            let gh = 1/3 * 22/7 * (jari_jari * jari_jari) * tinggi
            if(keterangan === false)return gh
            return gh

    }else if (opsi.toLowerCase() === 'lp' || opsi.toLowerCase() === 'luas') {
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!jari_jari)throw new TypeError("angka untuk jari-jari dari alas kerucut tidak ditemukan")
            if(!tinggi)throw new TypeError("angka untuk garis pelukis dari kerucut tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(jari_jari) || isNaN(tinggi))throw new TypeError("angka harus berupa nomor")
            let k = 22/7 * jari_jari * (jari_jari + tinggi)
            let fs = `Luas permukaan = 22/7 x jari-jari x (jari-jari + garis pelukis)\n               = 22/7 x ${jari_jari} x (${jari_jari} + ${tinggi})\n               = 22/7 x ${jari_jari} x ${jari_jari + tinggi}\n               = ${k}`
            return fs
        }
        if(!jari_jari)throw new TypeError("angka untuk jari-jari dari alas kerucut tidak ditemukan")
            if(!tinggi)throw new TypeError("angka untuk garis pelukis dari kerucut tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(jari_jari) || isNaN(tinggi))throw new TypeError("angka harus berupa nomor")
            let kv = 22/7 * jari_jari * (jari_jari + tinggi)
            if(keterangan === false)return kv
            return kv
    }else{
        throw new TypeError("opsi tidak terdaftar")
    }
}

module.exports = kerucut;