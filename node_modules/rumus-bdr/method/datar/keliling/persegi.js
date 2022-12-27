function persegi(sisi,keterangan){
    if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    let a = [sisi]
    if(keterangan === true){
        if(!sisi)throw new TypeError("angka untuk sisi dari persegi tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(sisi))throw new TypeError("angka harus berupa nomor")
        let g = 4 * sisi
        let h = `Keliling = 4 x sisi\n         = 4 x ${sisi}\n         = ${g}`
        return h
    }
    if(!sisi)throw new TypeError("angka untuk sisi dari persegi tidak ditemukan")
    if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(sisi))throw new TypeError("angka harus berupa nomor")
        let fr = 4 * sisi
        if(keterangan === false)return fr
        return fr
}
module.exports = persegi