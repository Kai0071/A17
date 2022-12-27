function lingkaran(diameter,keterangan){
    let a = [diameter]
    if (keterangan === true) {
        if (!diameter) throw new TypeError("angka untuk diameter dari lingkaran tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if (isNaN(diameter)) throw new TypeError("angka harus berupa nomor")
        let n = 22 / 7 * diameter
        let k = `keliling = 22/7 x diameter\n         = 22/7 x ${diameter}\n         = ${n}`
        return k
    }
    if (!diameter) throw new TypeError("angka untuk diameter dari lingkaran tidak ditemukan")
    if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
    if (isNaN(diameter)) throw new TypeError("angka harus berupa nomor")
    let q = 22 / 7 * diameter
    if(keterangan === false)return q
    return q
}
module.exports = lingkaran