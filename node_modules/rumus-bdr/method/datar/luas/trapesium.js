function trapesium(sisi_atas,sisi_bawah,tinggi_trapesium,keterangan){
    if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    let a = [sisi_atas,sisi_bawah,tinggi_trapesium]
    if(keterangan === true){
        if(!sisi_atas)throw new TypeError("angka untuk sisi atas dari trapesium tidak ditemukan")
        if(!sisi_bawah)throw new TypeError("angka untuk sisi bawah dari trapesium tidak ditemukan")
        if(!tinggi_trapesium)throw new TypeError("angka untuk tinggi dari trapesium tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(sisi_atas) || isNaN(sisi_bawah) || isNaN(tinggi_trapesium))throw new TypeError("angka harus berupa nomor")
        let all = 0.5 * (sisi_atas + sisi_bawah) * tinggi_trapesium
        let ds = `Luas = 1/2 x (sisi atas + sisi bawah) x tinggi\n     = 1/2 x ${sisi_atas + sisi_bawah} x ${tinggi_trapesium}\n     = ${all}`
        return ds
    }
    if(!sisi_atas)throw new TypeError("angka untuk sisi atas dari trapesium tidak ditemukan")
        if(!sisi_bawah)throw new TypeError("angka untuk sisi bawah dari trapesium tidak ditemukan")
        if(!tinggi_trapesium)throw new TypeError("angka untuk tinggi dari trapesium tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(sisi_atas) || isNaN(sisi_bawah) || isNaN(tinggi_trapesium))throw new TypeError("angka harus berupa nomor")
        let al = 0.5 * (sisi_atas + sisi_bawah) * tinggi_trapesium
        if(keterangan === false)return al
        return al
}
module.exports = trapesium
