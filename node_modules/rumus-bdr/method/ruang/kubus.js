function kubus(opsi,sisi,keterangan){
    if(!opsi)throw new TypeError("opsi tidak ditemukan")
    if(!isNaN(opsi))throw new TypeError("opsi tidak terdaftar")
    let a = [sisi]
    if(opsi.toLowerCase() === 'volume'){
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!sisi)throw new TypeError("angka untuk sisi dari bangunan kubus tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(sisi))throw new TypeError("angka harus berupa nomor")
            let f = sisi * sisi * sisi
            let ds = `volume = sisi x sisi x sisi\n       = ${sisi} x ${sisi} x ${sisi}\n       = ${f}`
            return ds
        }
        if(!sisi)throw new TypeError("angka untuk sisi dari bangunan kubus tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(sisi))throw new TypeError("angka harus berupa nomor")
            let fd = sisi * sisi * sisi
            if(keterangan === false)return fd
            return fd
    }else if (opsi.toLowerCase() === 'lp' || opsi.toLowerCase() === 'luas') {
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!sisi)throw new TypeError("angka untuk sisi dari bangun kubus tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(sisi))throw new TypeError("angka harus berupa nomor")
            let g = 6 * (sisi * sisi)
            let des = `Luas permukaan = 6 x (sisi x sisi)\n               = 6 x (${sisi} x ${sisi})\n               = ${g}`
            return des
        }
        if(!sisi)throw new TypeError("angka untuk sisi dari bangun kubus tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(sisi))throw new TypeError("angka harus berupa nomor")
            let g = 6 * (sisi * sisi)
            if(keterangan === false)return g
            return g
    }else{
        throw new TypeError("opsi tidak terdaftar")
    }
}

module.exports = kubus;
