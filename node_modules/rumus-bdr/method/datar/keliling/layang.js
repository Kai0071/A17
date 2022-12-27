function layang(sisi_bawah,sisi_atas,keterangan){
    if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    let a = [sisi_bawah,sisi_atas]
    if(keterangan === true){
        if(!sisi_bawah)throw new TypeError("angka untuk sisi samping bawah dari layang-layang tidak ditemukan")
        if(!sisi_atas)throw new TypeError("angka untuk sisi samping atas dari layang-layang tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(sisi_bawah) || isNaN(sisi_atas))throw new TypeError("angka harus berupa nomor")
        let g = 2 * (sisi_bawah + sisi_atas)
        let des = `keliling = 2 x (sisi samping bawah + sisi samping atas)\n         = 2 x ( ${sisi_bawah}+${sisi_atas} )\n         = 2 x ${sisi_bawah + sisi_atas}\n         = ${g}`
        return des
    }
    if(!sisi_bawah)throw new TypeError("angka untuk sisi samping bawah dari layang-layang tidak ditemukan")
        if(!sisi_atas)throw new TypeError("angka untuk sisi samping atas dari layang-layang tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(sisi_bawah) || isNaN(sisi_atas))throw new TypeError("angka harus berupa nomor")
        let fg = 2 * (sisi_bawah + sisi_atas)
        if(keterangan === false)return fg
        return fg
}
module.exports = layang