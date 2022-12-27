function jajarGenjang(alas,tinggi,keterangan){
    if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    let a = [alas,tinggi]
    if(keterangan === true){
        if(!alas)throw new TypeError("angka untuk alas dari Jajar genjang tidak ditemukan")
        if(!tinggi)throw new TypeError("angka untuk tinggi dari Jajar genjang tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(alas) || isNaN(tinggi))throw new TypeError("angka harus berupa nomor")
        let al = alas * tinggi
        let gk = `Luas = alas x tinggi\n     = ${alas} x ${tinggi}\n     = ${al}`
        return gk
    }
    if(!alas)throw new TypeError("angka untuk alas dari Jajar genjang tidak ditemukan")
        if(!tinggi)throw new TypeError("angka untuk tinggi dari Jajar genjang tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(alas) || isNaN(tinggi))throw new TypeError("angka harus berupa nomor")
        let all = alas * tinggi
        if(keterangan === false) return all
        return all
}
module.exports = jajarGenjang