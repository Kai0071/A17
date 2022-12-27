function belahKetupat(sisi,keterangan){
    if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    let a = [sisi]
    if(keterangan === true){
        if(!sisi)throw new TypeError("angka untuk sisi dari belah ketupat tidak ditemukan")
        if(isNaN(sisi))throw new TypeError("angka harus berupa nomor")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        let jg = 4 * sisi
        let ds = `keliling = 4 x sisi\n         = 4 x ${sisi}\n         = ${jg}`
        return ds
    }else if(keterangan === false){
    if(!sisi)throw new TypeError("angka untuk sisi dari belah ketupat tidak ditemukan")
        if(isNaN(sisi))throw new TypeError("angka harus berupa nomor")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        let ag = 4 * sisi
        return ag
    }
}
module.exports = belahKetupat