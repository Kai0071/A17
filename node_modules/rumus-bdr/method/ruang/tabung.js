function tabung(opsi,jari_jari,tinggi,keterangan){
    if(!opsi)throw new TypeError("opsi tidak ditemukan")
    if(!isNaN(opsi))throw new TypeError("opsi tidak terdaftar")
    let a = [jari_jari,tinggi]
    
    if(opsi.toLowerCase() === 'volume'){
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!jari_jari)throw new TypeError("angka untuk jari-jari dari alas tabung tidak ditemukan")
            if(!tinggi)throw new TypeError("angka untuk tinggi dari tabung tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(jari_jari) || isNaN(tinggi))throw new TypeError("angka harus berupa nomor")
            let v = 22 / 7 * (jari_jari * jari_jari) * tinggi
            let ds = `volume = 22/7 x (jari-jari x jari-jari) x tinggi\n       = 22/7 x (${jari_jari} x ${jari_jari}) x ${tinggi}\n       = 22/7 x ${jari_jari * jari_jari} x ${tinggi}\n       = ${v}`
            return ds
        }
        if(!jari_jari)throw new TypeError("angka untuk jari-jari dari alas tabung tidak ditemukan")
            if(!tinggi)throw new TypeError("angka untuk tinggi dari tabung tidak ditemukan")
            if(isNaN(jari_jari) || isNaN(tinggi))throw new TypeError("angka harus berupa nomor")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            let v = 22 / 7 * (jari_jari * jari_jari) * tinggi
            if(keterangan === false)return v
            return v
    }else if (opsi.toLowerCase() === 'lp' || opsi.toLowerCase() === 'luas') {
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!jari_jari)throw new TypeError("angka untuk jari-jari dari alas tabung tidak ditemukan")
            if(!tinggi)throw new TypeError("angka untuk tinggi dari tabung tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(jari_jari) || isNaN(tinggi))throw new TypeError("angka harus berupa nomor")
            let c = 2 * 22 / 7 * jari_jari * (jari_jari + tinggi)
            let ds = `Luas permukaan = 2 x 22/7 x jari-jari x (jari-jari + tinggi)\n               = 2 x 22/7 x ${jari_jari} x (${jari_jari} + ${tinggi})\n                ${c}`
            return ds
        }
        if(!jari_jari)throw new TypeError("angka untuk jari-jari dari alas tabung tidak ditemukan")
            if(!tinggi)throw new TypeError("angka untuk tinggi dari tabung tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(jari_jari) || isNaN(tinggi))throw new TypeError("angka harus berupa nomor")
            let c = 2 * 22 / 7 * jari_jari * (jari_jari + tinggi)
            if(keterangan === false)return c
            return c
        
    }else{
        throw new TypeError("opsi tidak terdaftar")
    }
}

module.exports = tabung;