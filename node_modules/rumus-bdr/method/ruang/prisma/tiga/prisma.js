function prisma(alas,tinggi_alas,tinggi,keterangan){
    if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    let a = [alas,tinggi_alas,tinggi]
    if(keterangan === true){
        if(!alas)throw new TypeError("angka untuk alas segitiga dari bangun ruang prisma segitiga tidak ditemukan")
        if(!tinggi_alas)throw new TypeError("angka untuk tinggi segitiga dari bangun ruang prisma segitiga tidak ditemukan")
        if(!tinggi)throw new TypeError("angka untuk tinggi dari bangun ruang prisma segitiga tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(alas) || isNaN(tinggi_alas) || isNaN(tinggi))throw new TypeError("angka harus berupa nomor")
        let k = (1/2 * alas * tinggi_alas) * tinggi
        let ds = `volume = Luas Alas x tinggi prisma\n       = (1/2 x ${alas} x ${tinggi_alas}) x ${tinggi}\n       = ${1/2 * alas * tinggi_alas} x ${tinggi}\n       = ${k}`
        return ds
    }
    if(!alas)throw new TypeError("angka untuk alas segitiga dari bangun ruang prisma segitiga tidak ditemukan")
    if(!tinggi_alas)throw new TypeError("angka untuk tinggi segitiga dari bangun ruang prisma segitiga tidak ditemukan")
    if(!tinggi)throw new TypeError("angka untuk tinggi dari bangun ruang prisma segitiga tidak ditemukan")
    if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
    if(isNaN(alas) || isNaN(tinggi_alas) || isNaN(tinggi))throw new TypeError("angka harus berupa nomor")
    let k = (1/2 * alas * tinggi_alas) * tinggi
    if(keterangan == false)return k
    return k
}
module.exports = prisma;