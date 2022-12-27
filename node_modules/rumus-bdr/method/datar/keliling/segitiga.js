function segitiga(sisi_1,sisi_2,sisi_3,keterangan){
    if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    let a = [sisi_1,sisi_2,sisi_3]
    if(keterangan === true){
        if(!sisi_1)throw new TypeError("angka untuk sisi 1 tidak ditemukan")
        if(!sisi_2)throw new TypeError("angka untuk sisi 2 tidak ditemukan")
        if(!sisi_3)throw new TypeError("angka untuk sisi 3 tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(sisi_1) || isNaN(sisi_2) || isNaN(sisi_3))throw new TypeError("angka harus berupa nomor")
        let g = sisi_1 + sisi_2 + sisi_3
        let v = `Keliling = sisi 1 + sisi 2 + sisi 3\n         = ${sisi_1} + ${sisi_2} + ${sisi_3}\n         = ${g}`
        return v
    }
    if(!sisi_1)throw new TypeError("angka untuk sisi 1 tidak ditemukan")
        if(!sisi_2)throw new TypeError("angka untuk sisi 2 tidak ditemukan")
        if(!sisi_3)throw new TypeError("angka untuk sisi 3 tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(sisi_1) || isNaN(sisi_2) || isNaN(sisi_3))throw new TypeError("angka harus berupa nomor")
        let b = sisi_1 + sisi_2 + sisi_3
        if(keterangan === false)return b
        return b
}
module.exports = segitiga