var WA="6289529544112"; // nomor WhatsApp toko (format 62…)
var BUNGKUS=15000;
var F=[["Mawar merah",15000,"#c0213a"],["Mawar pink",15000,"#f07ea6"],["Mawar putih",15000,"#f7f4ee"],["Baby’s breath",8000,"#ece9f5"],["Tulip",25000,"#e8527a"],["Bunga matahari",20000,"#f2b807"],["Lily",30000,"#fbd6e3"],["Anyelir",12000,"#d9468b"],["Aster",10000,"#8b6fd1"],["Krisan",10000,"#f4cf4d"]];
var W=[["Putih","#ffffff"],["Pink muda","#f6c9d6"],["Merah marun","#7a1f33"],["Hitam","#222222"],["Kraft cokelat","#b58b5e"],["Biru dusty","#8aa6c1"],["Lavender","#c3b3e0"],["Hijau sage","#a8bba2"]];
var qty=F.map(function(){return 0}),wrap=[0];
function rp(n){return "Rp"+n.toLocaleString("id-ID")}
var fl=document.getElementById("flowers");
F.forEach(function(f,i){
 var d=document.createElement("div");d.className="item";
 d.innerHTML='<span class="dot" style="background:'+f[2]+'"></span><div class="info"><div class="name">'+f[0]+'</div><div class="price">'+rp(f[1])+' per tangkai</div></div><div class="step"><button type="button" aria-label="Kurangi '+f[0]+'">−</button><output>0</output><button type="button" aria-label="Tambah '+f[0]+'">+</button></div>';
 var b=d.querySelectorAll("button"),o=d.querySelector("output");
 b[0].onclick=function(){if(qty[i]>0){qty[i]--;o.textContent=qty[i];upd()}};
 b[1].onclick=function(){qty[i]++;o.textContent=qty[i];upd()};
 fl.appendChild(d);
});
var wr=document.getElementById("wraps");
W.forEach(function(w,i){
 var l=document.createElement("label");
 l.innerHTML='<input type="checkbox"'+(i===0?" checked":"")+'><span class="sw" style="background:'+w[1]+'"></span>'+w[0];
 var c=l.querySelector("input");c.onchange=function(){var k=wrap.indexOf(i);if(c.checked){if(k<0)wrap.push(i)}else if(wrap.length>1){wrap.splice(k,1)}else{c.checked=true}upd()};
 wr.appendChild(l);
});
["nama","tgl","alamat","kartu"].forEach(function(id){document.getElementById(id).oninput=upd});
function upd(){
 var lines=[],sub=0,n=0,wn=wrap.map(function(i){return W[i][0]}).join(" + ");
 F.forEach(function(f,i){if(qty[i]){lines.push([qty[i]+" × "+f[0],f[1]*qty[i]]);sub+=f[1]*qty[i];n+=qty[i]}});
 var s=document.getElementById("sum"),a=document.getElementById("kirim");
 if(!n){s.innerHTML='<span class="empty">Belum ada bunga dipilih. Tambahkan tangkai dengan tombol +.</span>';a.setAttribute("aria-disabled","true");a.href="#";return}
 var tot=sub+BUNGKUS;
 s.innerHTML=lines.map(function(l){return "<div><span>"+l[0]+"</span><span>"+rp(l[1])+"</span></div>"}).join("")+
 "<div><span>Bungkus "+wn+"</span><span>"+rp(BUNGKUS)+"</span></div><div class=\"tot\"><span>Total</span><span>"+rp(tot)+"</span></div>";
 var g=function(id){return document.getElementById(id).value.trim()};
 var t="Halo, saya ingin memesan buket:\n"+lines.map(function(l){return "- "+l[0]+" ("+rp(l[1])+")"}).join("\n")+
 "\nBungkus: "+wn+"\nTotal: "+rp(tot)+
 "\n\nNama: "+(g("nama")||"-")+"\nTanggal: "+(g("tgl")||"-")+"\nAlamat: "+(g("alamat")||"Ambil sendiri")+"\nKartu ucapan: "+(g("kartu")||"-");
 a.href="https://wa.me/"+WA+"?text="+encodeURIComponent(t);
 a.removeAttribute("aria-disabled");
}
upd();