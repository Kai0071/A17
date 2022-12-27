function segitiga(alas,tinggi,keterangan){
    if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        let a = [alas,tinggi]
        if(keterangan === true){
            if(!alas)throw new TypeError("angka untuk alas segitiga ditemukan")
            if(!tinggi)throw new TypeError("angka untuk tinggi segitiga tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(alas) || isNaN(tinggi) || isNaN(keterangan))throw new TypeError("angka harus berupa nomor")
            let g = 0.5 * alas * tinggi
            let v = `Luas = 1/2 X alas x tinggi\n     = ${g}`
            return v
        }
        if(!alas)throw new TypeError("angka untuk alas segitiga tidak ditemukan")
            if(!tinggi)throw new TypeError("angka untuk tinggi segitiga tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(alas) || isNaN(tinggi) || isNaN(keterangan))throw new TypeError("angka harus berupa nomor")
            let b = 0.5 * alas * tinggi
            if(keterangan === false) return b
            return b
}
module.exports = segitiga