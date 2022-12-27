function persegi(sisi,keterangan){
    if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    let a = [sisi]
    if(keterangan === true){
        if(!sisi)throw new TypeError("angka untuk sisi dari persegi tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(sisi))throw new TypeError("angka harus berupa nomor")
        let g = sisi * sisi
        let h = `Luas = sisi x sisi\n     = ${sisi} x ${sisi}\n     = ${g}`
        return h
    }
    if(!sisi)throw new TypeError("angka untuk sisi dari persegi tidak ditemukan")
    if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
    if(isNaN(sisi))throw new TypeError("angka harus berupa nomor")
    let gc = sisi * sisi
    if(keterangan === false)return gc
    return gc
}
module.exports = persegi