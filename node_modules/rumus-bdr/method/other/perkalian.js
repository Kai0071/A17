function perkalian(angka_perkalian,jumlah_perkalian){
    let a = [angka_perkalian,jumlah_perkalian]
    if(!angka_perkalian)throw new TypeError("angka untuk perkalian tidak ditemukan")
    if(isNaN(angka_perkalian))throw new TypeError("angka harus berupa nomor")
    if(!jumlah_perkalian)throw new TypeError(`jumlah untuk perkalian dari ${angka_perkalian} tidak ditemukan`)
    if(isNaN(jumlah_perkalian))throw new TypeError("angka harus berupa nomor")
    if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
if(jumlah_perkalian > 100)throw new TypeError("angka tidak bisa lebih dari 100")
    let hg = ""
    for(let i = 0;i<jumlah_perkalian;i++){
        let b = angka_perkalian * (i+1)
        hg += `${angka_perkalian} x ${i + 1} = ${b}`.concat('\n')
    }
    return hg
}
module.exports = perkalian