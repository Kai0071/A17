function pyhtagoras(bagian,angka_1,angka_2,keterangan) {
    let samping = ["samping","miring"]
    let a = [angka_1,angka_2]
    if(!bagian)throw new TypeError("Bagian tidak ditemukan")
    if(!isNaN(bagian))throw new TypeError("bagian tidak terdaftar")
    if(samping.some(m => bagian.toLowerCase().startsWith(m))){
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!angka_1)throw new TypeError("angka untuk alas dari segitiga tidak dapat ditemukan")
            if(!angka_2)throw new TypeError("angka untuk tinggi dari segitiga tidak dapat ditemukan")
            if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
            if(isNaN(angka_1) || isNaN(angka_2))throw new TypeError("angka harus berupa nomor")
            let k = Math.sqrt(Math.pow(angka_1,2)+Math.pow(angka_2,2))
            let ds = `Miring = Akar Kuadrat Dari((alas x alas) + (tinggi x tinggi))\n       = Akar Kuadrat Dari((${angka_1} x ${angka_1}) + (${angka_2} x ${angka_2}))\n       = Akar Kuadrat Dari(${Math.pow(angka_1,2)} + ${Math.pow(angka_2,2)})\n       = Akar Kuadrat Dari(${Math.pow(angka_1,2) + Math.pow(angka_2,2)})\n       = ${k}`
            return ds
        }
        if(!angka_1)throw new TypeError("angka untuk alas dari segitiga tidak dapat ditemukan")
        if(!angka_2)throw new TypeError("angka untuk tinggi dari segitiga tidak dapat ditemukan")
        if(a.some(m => m === false || m === true))throw new TypeError("angka harus berupa nomor")
        if(isNaN(angka_1) || isNaN(angka_2))throw new TypeError("angka harus berupa nomor")
        let ks = Math.sqrt(Math.pow(angka_1,2)+Math.pow(angka_2,2))
        if(keterangan === false)return ks
        return ks
    }else if(bagian.toLowerCase() === "tinggi"){
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!angka_1)throw new TypeError("angka untuk sudut miring dari segitiga tidak dapat ditemukan")
            if(!angka_2)throw new TypeError("angka untuk alas dari segitiga tidak dapat ditemukan")
            if(isNaN(angka_1) || isNaN(angka_2))throw new TypeError("angka harus berupa nomor")
            let k = Math.sqrt(Math.pow(angka_1,2)-Math.pow(angka_2,2))
            let ds = `Tinggi = Akar Kuadrat Dari((sisi miring x sisi miring) - (alas x alas))\n       = Akar Kuadrat Dari((${angka_1} x ${angka_1}) - (${angka_2} x ${angka_2}))\n       = Akar Kuadrat Dari(${Math.pow(angka_1,2)} - ${Math.pow(angka_2,2)})\n       = Akar Kuadrat Dari(${Math.pow(angka_1,2) - Math.pow(angka_2,2)})\n       = ${k}`
            return ds
        }
        if(!angka_1)throw new TypeError("angka untuk sudut miring dari segitiga tidak dapat ditemukan")
        if(!angka_2)throw new TypeError("angka untuk alas dari segitiga tidak dapat ditemukan")
        if(isNaN(angka_1) || isNaN(angka_2))throw new TypeError("angka harus berupa nomor")
        let k = Math.sqrt(Math.pow(angka_1,2)-Math.pow(angka_2,2))
        if(keterangan === false)return k
        return k
    }else if(bagian.toLowerCase() === "alas"){
        if(isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(!isNaN(keterangan) && keterangan !== true && keterangan !== false)throw new TypeError("keterangan tidak terdaftar")
        if(keterangan === true){
            if(!angka_1)throw new TypeError("angka untuk sudut miring dari segitiga tidak dapat ditemukan")
            if(!angka_2)throw new TypeError("angka untuk tinggi dari segitiga tidak dapat ditemukan")
            if(isNaN(angka_1) || isNaN(angka_2))throw new TypeError("angka harus berupa nomor")
            let k = Math.sqrt(Math.pow(angka_1,2)-Math.pow(angka_2,2))
            let ds = `Alas = Akar Kuadrat Dari(sisi miring x sisi miring) - (tinggi x tinggi))\n     = Akar Kuadrat Dari((${angka_1} x ${angka_1}) - (${angka_2} x ${angka_2}))\n     = Akar Kuadrat Dari(${Math.pow(angka_1,2)} - ${Math.pow(angka_2,2)})\n     = Akar Kuadrat Dari(${Math.pow(angka_1,2) - Math.pow(angka_2,2)})\n     = ${k}`
            return ds
        }
        if(!angka_1)throw new TypeError("angka untuk sudut miring dari segitiga tidak dapat ditemukan")
        if(!angka_2)throw new TypeError("angka untuk tinggi dari segitiga tidak dapat ditemukan")
        if(isNaN(angka_1) || isNaN(angka_2))throw new TypeError("angka harus berupa nomor")
        let k = Math.sqrt(Math.pow(angka_1,2)-Math.pow(angka_2,2))
        if(keterangan === false)return k
        return k
    }else{
        throw new  TypeError("bagian tidak terdaftar")
    }
}

module.exports = pyhtagoras;