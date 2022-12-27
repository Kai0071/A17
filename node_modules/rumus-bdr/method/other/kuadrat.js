function kuadrat(angka) {
    if (!angka) throw new TypeError("angka tidak ditemukan")
    let g = [angka]
    if(g.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
    if(isNaN(angka) || angka === true && angka === false)throw new TypeError("angka harus berupa nomor")
    let ga = Math.pow(angka,2)
    return ga
}

module.exports = kuadrat;
