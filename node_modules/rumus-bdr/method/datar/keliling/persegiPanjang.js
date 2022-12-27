function persegiPanjang(panjang,lebar,keterangan){
    if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    let a = [panjang,lebar]
    if(keterangan === true){
        if(!panjang)throw new TypeError("angka untuk panjang dari persegi panjang tidak ditemukan")
        if(!lebar)throw new TypeError("angka untuk lebar dari persegi panjang tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(panjang) || isNaN(lebar))throw new TypeError("angka harus berupa nomor")
        let g = 2 * (panjang + lebar)
        let h = `keliling = 2 x ( panjang + lebar )\n         = 2 x ( ${panjang} + ${lebar} )\n         = 2 x ${panjang + lebar}\n         = ${g}`
        return h
    }
    if(!panjang)throw new TypeError("angka untuk panjang dari persegi panjang tidak ditemukan")
        if(!lebar)throw new TypeError("angka untuk lebar dari persegi panjang tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")

        if(isNaN(panjang) || isNaN(lebar))throw new TypeError("angka harus berupa nomor")
        let g = 2 * (panjang + lebar)
        if(keterangan === false)return g
        return g
}
module.exports = persegiPanjang