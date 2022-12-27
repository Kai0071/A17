function balok(opsi,panjang,lebar,tinggi,keterangan){
    if(!opsi)throw new TypeError("opsi tidak ditemukan")
    if(!isNaN(opsi))throw new TypeError("opsi tidak terdaftar")
    let a = [panjang,lebar,tinggi]
    if(opsi.toLowerCase() === 'volume' || opsi.toLowerCase() === "vol"){
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!panjang)throw new TypeError("angka untuk panjang dari bangunan balok tidak ditemukan")
            if(!lebar)throw new TypeError("angka untuk lebar dari bangunan balok tidak ditemukan")
            if(!tinggi)throw new TypeError("angka untuk tinggi dari bangunan balok tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(panjang) || isNaN(lebar) || isNaN(tinggi)) throw new TypeError("angka harus berupa nomor")
            let k = panjang * lebar * tinggi
            let ds = `volume = panjang x lebar x tiggi\n       = ${panjang} x ${lebar} x ${tinggi}\n       = ${k}`
            return ds
        }
        if(!panjang)throw new TypeError("angka untuk panjang dari bangunan balok tidak ditemukan")
            if(!lebar)throw new TypeError("angka untuk lebar dari bangunan balok tidak ditemukan")
            if(!tinggi)throw new TypeError("angka untuk tinggi dari bangunan balok tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(panjang) || isNaN(lebar) || isNaN(tinggi)) throw new TypeError("angka harus berupa nomor")
            let k = panjang * lebar * tinggi
            if(keterangan === false)return k
            return k
    }else if (opsi.toLowerCase() === 'lp' || opsi.toLowerCase() === "luas") {
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!panjang)throw new TypeError("angka untuk panjang dari bangunan balok tidak ditemukan")
            if(!lebar)throw new TypeError("angka untuk lebar dari bangunan balok tidak ditemukan")
            if(!tinggi)throw new TypeError("angka untuk tinggi dari bangunan balok tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(panjang) || isNaN(lebar) || isNaN(tinggi)) throw new TypeError("angka harus berupa nomor")
            let ls = 2 * ((panjang * lebar) + (panjang * tinggi) + (lebar * tinggi))
            let des = `luas permukaan = 2 x ((panjang x lebar) + (panjang x tinggi) + (lebar x tinggi))\n               = 2 x ((${panjang} x ${lebar}) + (${panjang} x ${tinggi}) + (${lebar} x ${tinggi}))\n               = 2 x (${((panjang * lebar) + (panjang * tinggi) + (lebar * tinggi))})\n               = ${ls}`
            return des
        }
        if(!panjang)throw new TypeError("angka untuk panjang dari bangunan balok tidak ditemukan")
            if(!lebar)throw new TypeError("angka untuk lebar dari bangunan balok tidak ditemukan")
            if(!tinggi)throw new TypeError("angka untuk tinggi dari bangunan balok tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(panjang) || isNaN(lebar) || isNaN(tinggi)) throw new TypeError("angka harus berupa nomor")
            let lsx = 2 * ((panjang * lebar) + (panjang * tinggi) + (lebar * tinggi))
            if(keterangan === false)return lsx
            return lsx
    }else{
        throw new TypeError("opsi tidak terdaftar")
    }
}

module.exports = balok;


