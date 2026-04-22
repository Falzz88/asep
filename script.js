let data = JSON.parse(localStorage.getItem('parkir')) || [];

function simpan(){
    localStorage.setItem('parkir', JSON.stringify(data));
}

function tambah(){
    const plat = document.getElementById('plat').value.trim();
    const jenis = document.getElementById('jenis').value;
    const durasi = parseInt(document.getElementById('durasi').value);


    if(!plat || !durasi || durasi <= 0){
        alert('Plat dan durasi harus diisi dengan benar!');
        return;
    }

    const tarif = jenis === 'Mobil' ? 5000 : 2000;

    data.push({
        plat: plat,
        jenis: jenis,
        tarif: tarif,
        durasi: durasi,
        masuk: new Date()
    });

    // reset input
    document.getElementById('plat').value = '';
    document.getElementById('durasi').value = '';

    simpan();
    render();
}

function keluar(index){
    const item = data[index];

    const total = item.durasi * item.tarif;

    alert(
        "STRUK PARKIR\n\n" +
        "Plat: " + item.plat + "\n" +
        "Jenis: " + item.jenis + "\n" +
        "Durasi: " + item.durasi + " jam\n" +
        "Total: Rp " + total.toLocaleString("id-ID")
    );

    data.splice(index,1);
    simpan();
    render();
}

function formatWaktu(w){
    return new Date(w).toLocaleTimeString('id-ID');
}

function render(){
    const list = document.getElementById('list');

    if(data.length === 0){
        list.innerHTML = '<tr><td colspan="5" class="empty">Tidak ada kendaraan</td></tr>';
        return;
    }

    list.innerHTML = '';

    data.forEach((d,i)=>{
        list.innerHTML += `
        <tr>
            <td>${d.plat}</td>
            <td><span class="badge ${d.jenis==='Mobil'?'mobil':'motor'}">${d.jenis}</span></td>
            <td>${d.durasi} jam</td>
            <td>${formatWaktu(d.masuk)}</td>
            <td><button class="btn-danger" onclick="keluar(${i})">Keluar</button></td>
        </tr>
        `;
    });
}

render();