function prisma(alas_segitiga,tinggi_alas,sisi_1,sisi_2,sisi_3,tinggi_prisma,keterangan){

    let all = [alas_segitiga,tinggi_alas,sisi_1,sisi_2,sisi_3,tinggi_prisma]

    if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    if(keterangan === true){
        if(!alas_segitiga)throw new TypeError("angka untuk alas segitiga dari bangun ruang prisma segitiga tidak ditemukan")
        if(!tinggi_alas)throw new TypeError("angka untuk tinggi alas segitiga dari bangun ruang prisma segitiga tidak ditemukan")
        if(!tinggi_prisma)throw new TypeError("angka untuk tinggi dari bangun ruang prisma segitiga tidak ditemukan")
        if(!sisi_1)throw new TypeError("angka untuk sisi 1 dari bangun ruang prisma segitiga tidak ditemukan")
        if(!sisi_2)throw new TypeError("angka untuk sisi 2 dari bangun ruang prisma segitiga tidak ditemukan")
        if(!sisi_3)throw new TypeError("angka untuk sisi 3 dari bangun ruang prisma segitiga tidak ditemukan")
        if(all.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(all.some(m => isNaN(m)))throw new TypeError("angka harus berupa nomor")
        let keliling = sisi_1 + sisi_2 + sisi_3
        let luasa = 1/2 * alas_segitiga * tinggi_alas
        let cara = (2 * luasa) + (keliling * tinggi_prisma)
        let ds = `Luas permukaan = (2 x luas alas) + (keliling alas x tinggi)
               = (2 x (1/2 x alas segitiga x tinggi alas segitiga)) + ((sisi 1 + sisi 2 + sisi 3) x tinggi prisma)
               = (2 x (1/2 x ${alas_segitiga} x ${tinggi_alas})) + (${sisi_1} + ${sisi_2} + ${sisi_3} x ${tinggi_prisma})
               = (2 x ${luasa}) + (${keliling} x ${tinggi_prisma})
               = ${2 * luasa} + ${keliling * tinggi_prisma}
               = ${cara}`
        return ds
    }
    if(!alas_segitiga)throw new TypeError("angka untuk alas segitiga dari bangun ruang prisma segitiga tidak ditemukan")
    if(!tinggi_alas)throw new TypeError("angka untuk tinggi alas segitiga dari bangun ruang prisma segitiga tidak ditemukan")
    if(!tinggi_prisma)throw new TypeError("angka untuk tinggi dari bangun ruang prisma segitiga tidak ditemukan")
    if(!sisi_1)throw new TypeError("angka untuk sisi 1 dari bangun ruang prisma segitiga tidak ditemukan")
    if(!sisi_2)throw new TypeError("angka untuk sisi 2 dari bangun ruang prisma segitiga tidak ditemukan")
    if(!sisi_3)throw new TypeError("angka untuk sisi 3 dari bangun ruang prisma segitiga tidak ditemukan")
    if(all.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
    if(all.some(m => isNaN(m)))throw new TypeError("angka harus berupa nomor")
    let keliling = sisi_1 + sisi_2 + sisi_3
        let luasa = 1/2 * alas_segitiga * tinggi_alas
        let cara = (2 * luasa) + (keliling * tinggi_prisma)
    if(keterangan === false)return cara
    return cara
}
module.exports = prisma;