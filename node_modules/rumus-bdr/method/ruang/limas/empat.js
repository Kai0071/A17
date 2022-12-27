function segiempat(opsi,sisi_alas,tinggi_limas,keterangan){
    if(!opsi)throw new TypeError("opsi tidak ditemukan")
    if(!isNaN(opsi))throw new TypeError("opsi tidak terdaftar")
    let a = [sisi_alas,tinggi_limas]
    if(opsi.toLowerCase() === 'volume'){
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!sisi_alas)throw new TypeError("angka untuk sisi dari alas limas segitiga tidak ditemukan")
            if(!tinggi_limas)throw new TypeError("angka untuk tinggi dari alas limas segitiga tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(a.some(m => isNaN(m)))throw new TypeError("angka harus berupa nomor")
            let k = 1/3 * (sisi_alas * sisi_alas) * tinggi_limas
            let ds = `volume = 1/3 x (luas alas) x tinggi\n       = 1/3 x (sisi x sisi) x tinggi\n       = 1/3 x (${sisi_alas} x ${sisi_alas}) x ${tinggi_limas}\n       = 1/3 x ${Math.pow(sisi_alas,2)} x ${tinggi_limas}\n       = ${k}`
            return ds
        }
        if(!sisi_alas)throw new TypeError("angka untuk sisi dari alas limas segitiga tidak ditemukan")
            if(!tinggi_limas)throw new TypeError("angka untuk tinggi dari alas limas segitiga tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(a.some(m => isNaN(m)))throw new TypeError("angka harus berupa nomor")
            let sk = 1/3 * (sisi_alas * sisi_alas) * tinggi_limas
        if(keterangan === false)return sk
        return sk

    }else if (opsi.toLowerCase() === 'lp' || opsi.toLowerCase() === 'luas') {
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!sisi_alas)throw new TypeError("angka untuk sisi dari alas limas segitiga tidak ditemukan")
            if(!tinggi_limas)throw new TypeError("angka untuk tinggi dari alas limas segitiga tidak ditemukan")
            let hg = Math.sqrt(Math.pow(sisi_alas/2,2)+Math.pow(tinggi_limas,2))//tinggi segitiga tegak miring
            let ks = 4 * (1/2 * sisi_alas * hg)//luas alas bidang tegak
            let mt = sisi_alas * sisi_alas + ks
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(a.some(m => isNaN(m)))throw new TypeError("angka harus berupa nomor")
            //Math.floor(sisi_alas * sisi_alas + (4 * (1/2 * (sisi_alas/2) *)))
            let ds = `Luas permukaan = luas alas + (4 x luas bidang tegak)\n               = ${sisi_alas} x ${sisi_alas} + (4 x (1/2 x alas x tinggi))\n               = ${Math.pow(sisi_alas,2)} + (4 x (1/2 x ${sisi_alas} x ${hg}))\n               = ${Math.pow(sisi_alas,2)} + ${ks}\n               = ${mt}`
            return ds
        }
        if(!sisi_alas)throw new TypeError("angka untuk sisi dari alas limas segitiga tidak ditemukan")
            if(!tinggi_limas)throw new TypeError("angka untuk tinggi dari alas limas segitiga tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(a.some(m => isNaN(m)))throw new TypeError("angka harus berupa nomor")
            let hg = Math.sqrt(Math.pow(sisi_alas/2,2)+Math.pow(tinggi_limas,2))//tinggi segitiga tegak miring
            let ks = 4 * (1/2 * sisi_alas * hg)//luas alas bidang tegak
            let mt = sisi_alas * sisi_alas + ks
        return mt
    }else{
        throw new TypeError("opsi tidak terdaftar")
    }
}

module.exports = segiempat;