function belahKetupat(diagonal_1,diagonal_2,keterangan){
    let a = [diagonal_1,diagonal_2]
    if(keterangan){
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        // if(keterangan !== true || keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    }
    if(keterangan === true){
        if(!diagonal_1)throw new TypeError("angka untuk diagonal 1 dari belah ketupat tidak ditemukan")
        if(!diagonal_2)throw new TypeError("angka untuk diagonal 2 dari belah ketupat tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(diagonal_1) || isNaN(diagonal_2))throw new TypeError("angka harus berupa nomor")
        let gs = 0.5 * (diagonal_1 * diagonal_2)
        let fs = `luas = 1/2 x diagonal 1 x diagonal 2\n     = 1/2 x ${diagonal_1} x ${diagonal_2}\n     = ${gs}`
        return fs
    }
    if(!diagonal_1)throw new TypeError("angka untuk diagonal 1 dari belah ketupat tidak ditemukan")
        if(!diagonal_2)throw new TypeError("angka untuk diagonal 2 dari belah ketupat tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(diagonal_1) || isNaN(diagonal_2))throw new TypeError("angka harus berupa nomor")
        let vs = 0.5 * (diagonal_1 * diagonal_2)
        if(keterangan === false)return vs
        return vs
}
module.exports = belahKetupat