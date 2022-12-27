function layang(diagonal_1,diagonal_2,keterangan){
    if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        let a = [diagonal_1,diagonal_2]
        if(keterangan === true){
            if(!diagonal_1)throw new TypeError("angka untuk diagonal 1 dari layang-layang tidak ditemukan")
            if(!diagonal_2)throw new TypeError("angka untuk diagonal 2 dari layang-layang tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(diagonal_1) || isNaN(diagonal_2))throw new TypeError("angka harus berupa nomor")
            let k = 0.5 * (diagonal_1 * diagonal_2)
            let ds = `luas = 1/2 x diagonal 1 x diagonal 2\n     = 1/2 x ${diagonal_1} x ${diagonal_2}\n     = ${k}`
            return ds
        }
        if(!diagonal_1)throw new TypeError("angka untuk diagonal 1 dari layang-layang tidak ditemukan")
            if(!diagonal_2)throw new TypeError("angka untuk diagonal 2 dari layang-layang tidak ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(diagonal_1) || isNaN(diagonal_2))throw new TypeError("angka harus berupa nomor")
            let kf = 0.5 * (diagonal_1 * diagonal_2)
            if(keterangan === false)return kf
            return kf
}
module.exports = layang