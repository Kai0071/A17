function limasSegitiga(alas_segitiga,tinggi_alas,tinggi_limas,keterangan){
    let a = [alas_segitiga,tinggi_alas,tinggi_limas]
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!alas_segitiga)throw new TypeError("angka untuk alas dari alas segitiga dari bangun ruang limas segitiga tidak ditemukan")
            if(!tinggi_alas)throw new TypeError("angka untuk tinggi dari alas segitiga dari bangun ruang limas segitiga tidak ditemukan")
            if(!tinggi_limas)throw new TypeError("angka untuk tinggi dari limas segitiga tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(alas_segitiga) || isNaN(tinggi_alas) || isNaN(tinggi_limas))throw new TypeError("angka harus berupa nomor")
            let hg = 1/3 * (1/2 * alas_segitiga * tinggi_alas) * tinggi_limas
            let ds = `volume = 1/3 x (luas alas segitiga) x tinggi limas segitiga\n       = 1/3 x (1/2 x alas segitiga x tinggi segitiga) x tinggi limas\n       = 1/3 x (1/2 x ${alas_segitiga} x ${tinggi_alas}) x ${tinggi_limas}\n       = 1/3 x ${1/2 * alas_segitiga * tinggi_alas} x ${tinggi_limas}\n       = ${hg}`
            return ds
        }
        if(!alas_segitiga)throw new TypeError("angka untuk alas dari alas segitiga dari bangun ruang limas segitiga tidak ditemukan")
            if(!tinggi_alas)throw new TypeError("angka untuk tinggi dari alas segitiga dari bangun ruang limas segitiga tidak ditemukan")
            if(!tinggi_limas)throw new TypeError("angka untuk tinggi dari limas segitiga tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(alas_segitiga) || isNaN(tinggi_alas) || isNaN(tinggi_limas))throw new TypeError("angka harus berupa nomor")
            let hg = 1/3 * (1/2 * alas_segitiga * tinggi_alas) * tinggi_limas
            if(keterangan === false)return hg
            return hg
}

module.exports = limasSegitiga;