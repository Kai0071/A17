function lingkaran(jari_jari,keterangan){
    if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        let a = [jari_jari]
        if (keterangan === true) {
            if (!jari_jari) throw new TypeError("angka untuk jari-jari dari lingkaran tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if (isNaN(jari_jari)) throw new TypeError("angka harus berupa nomor")
            let j = 22 / 7 * (jari_jari * jari_jari)
            let py = `luas = 22/7 x jari-jari x jari-jari\n     = 22/7 x ${jari_jari} x ${jari_jari}\n     = ${j}`
            return py
        }
        if (!jari_jari) throw new TypeError("angka untuk jari-jari dari lingkaran tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if (isNaN(jari_jari)) throw new TypeError("angka harus berupa nomor")
        let j = 22 / 7 * (jari_jari * jari_jari)
        if(keterangan === false)return j
        return j
}
module.exports = lingkaran