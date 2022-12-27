function jajarGenjang(sisi_1,sisi_2,sisi_3,sisi_4,keterangan){
    if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
    let a = [sisi_1,sisi_2,sisi_3,sisi_4]
    if(keterangan === true){
        if(!sisi_1)throw new TypeError("angka untuk sisi 1 dari Jajar genjang tidak ditemukan")
        if(!sisi_2)throw new TypeError("angka untuk sisi 2 dari Jajar genjang tidak ditemukan")
        if(!sisi_3)throw new TypeError("angka untuk sisi 3 dari Jajar genjang tidak ditemukan")
        if(!sisi_4)throw new TypeError("angka untuk sisi 4 dari Jajar genjang tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(sisi_1) || isNaN(sisi_2) || isNaN(sisi_3) || isNaN(sisi_4))throw new TypeError("angka harus berupa nomor")
        let al = sisi_1 + sisi_2 + sisi_3 + sisi_4
        let des = `keliling = sisi 1 + sisi 2 + sisi 3 + sisi 4\n         = ${sisi_1} + ${sisi_2} + ${sisi_3} + ${sisi_4}\n         = ${al}`
        return des
    }
    if(!sisi_1)throw new TypeError("angka untuk sisi 1 dari Jajar genjang tidak ditemukan")
        if(!sisi_2)throw new TypeError("angka untuk sisi 2 dari Jajar genjang tidak ditemukan")
        if(!sisi_3)throw new TypeError("angka untuk sisi 3 dari Jajar genjang tidak ditemukan")
        if(!sisi_4)throw new TypeError("angka untuk sisi 4 dari Jajar genjang tidak ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(sisi_1) || isNaN(sisi_2) || isNaN(sisi_3) || isNaN(sisi_4))throw new TypeError("angka harus berupa nomor")
        let all = sisi_1 + sisi_2 + sisi_3 + sisi_4
        if(keterangan === false) return all
        return all
}
module.exports = jajarGenjang