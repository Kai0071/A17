function limasSegitiga(alas_limas,tinggi_limas,keterangan){
    let a = [alas_limas,tinggi_limas]
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!alas_limas)throw new TypeError("angka untuk alas dari alas segitiga dari bangun ruang limas segitiga tidak ditemukan")
            if(!tinggi_limas)throw new TypeError("angka untuk tinggi dari alas segitiga dari bangun ruang limas segitiga tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(alas_limas) || isNaN(tinggi_limas))throw new TypeError("angka harus berupa nomor")
            let hg = 4 * (1/2 * alas_limas * tinggi_limas)
            let ds = `volume = 4 x (1/2 x alas x tinggi)\n       = 4 x (1/2 x ${alas_limas} x ${tinggi_limas})\n       = 4 x ${1/2 * alas_limas * tinggi_limas}\n       = ${hg}`
            return ds
        }
        if(!alas_limas)throw new TypeError("angka untuk alas dari alas segitiga dari bangun ruang limas segitiga tidak ditemukan")
            if(!tinggi_limas)throw new TypeError("angka untuk tinggi dari alas segitiga dari bangun ruang limas segitiga tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(alas_limas) || isNaN(tinggi_limas))throw new TypeError("angka harus berupa nomor")
            let hg = 4 * (1/2 * alas_limas * tinggi_limas)
            if(keterangan === false)return hg
            return hg
}

module.exports = limasSegitiga;