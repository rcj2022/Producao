const dadosgrid = document.querySelector("#dadosgrid");
const btn_add = document.querySelector("#btn_add");
const novoColaborador = document.querySelector("#novoColaborador");
const btn_gravarPop = document.querySelector("#btn_gravarPop");
const btn_cancelarPop = document.querySelector("#btn_cancelarPop");
const telefones = document.querySelector("#telefones");
const f_fone = document.querySelector("#f_fone");
const f_nome = document.querySelector("#f_nome");
const f_tipoColab = document.querySelector("#f_tipoColab");
const f_status = document.querySelector("#f_status");
const f_foto= document.querySelector("#f_foto");
const img_foto= document.querySelector("#img_foto");

// N=Novo colaborador | E=Editar Novo Colaborador

let ModuloJanela="n";



// comandos
const endpoint_todoscolaboradores = `http://127.0.0.1:1880/todosUsuarios`;
fetch(endpoint_todoscolaboradores)
    .then(res => res.json())
    .then(res => {
       
        dadosgrid.innerHTML = "";
        res.forEach(e => {
            const divlinha = document.createElement("div");
            divlinha.setAttribute("class", "linhaGrid");
            // 1ª Coluna: ID
            const divc1 = document.createElement("div");
            divc1.setAttribute("class", "colunaLinhaGrid c1");
            divc1.innerHTML = e.n_usuario_usuario;
            divlinha.appendChild(divc1);
            // 2ª Coluna: NOME
            const divc2 = document.createElement("div");
            divc2.setAttribute("class", "colunaLinhaGrid c2");
            divc2.innerHTML = e.s_nome_usuario;
            divlinha.appendChild(divc2);

            // 3ª Coluna: TIPO DE USUÁRIO
            const divc3 = document.createElement("div");
            divc3.setAttribute("class", "colunaLinhaGrid c3");
            divc3.innerHTML = e.n_tipousuario_tipousuario;
            divlinha.appendChild(divc3);

            // 4ª Coluna: TIPO DE USUÁRIO
            const divc4 = document.createElement("div");
            divc4.setAttribute("class", "colunaLinhaGrid c4");
            divc4.innerHTML = e.c_status_usuario;
            divlinha.appendChild(divc4);

            // 5ª Coluna: TIPO DE USUÁRIO
            const divc5 = document.createElement("div");
            divc5.setAttribute("class", "colunaLinhaGrid c5");
            divlinha.appendChild(divc5);

            // const img_status=document.createElement("img");
            // img_status.setAttribute("src", "../../imgs/on.svg");
            // img_status.setAttribute("class", "icone_op");
            // divc5.appendChild(img_status);

            const img_editar=document.createElement("img");
            img_editar.setAttribute("src", "../../imgs/edit.svg");
            img_editar.setAttribute("class", "icone_op");
            img_editar.addEventListener("click",(evt)=>{
                // editar dados
                const id=evt.target.parentNode.parentNode.firstChild.innerHTML;
                ModuloJanela="e";
                document.getElementById("titulopopup").innerHTML="Editar Colaborador";
                let endpoint=`http://127.0.0.1:1880/dadoscolab/${id}`;
                fetch(endpoint)
                .then(res=>res.json())
                .then(res=>{
                    // console.log(res[0]);
                    f_nome.value=res[0].s_nome_usuario;
                    f_tipoColab.value=res[0].n_tipousuario_tipousuario;
                    f_status.value=res[0].c_status_usuario;
                    img_foto.src=res[0].s_foto_usuario;
                    novoColaborador.classList.remove("ocultarPopup");

                })

                endpoint=`http://127.0.0.1:1880/telefonescolab/${id}`;
                fetch(endpoint)
                .then(res=>res.json())
                .then(res=>{
                    // console.log(res[0]);
                    f_nome.value=res[0].s_nome_usuario;
                    f_tipoColab.value=res[0].n_tipousuario_tipousuario;
                    f_status.value=res[0].c_status_usuario;
                    img_foto.src=res[0].s_foto_usuario;
                   

                })

              
            });
            divc5.appendChild(img_editar);

            const img_delete=document.createElement("img");
            img_delete.setAttribute("src", "../../imgs/delete.svg");
            img_delete.setAttribute("class", "icone_op");
            divc5.appendChild(img_delete);





            dadosgrid.appendChild(divlinha);

        });

    });

const endpoint_tiposColab = `http://127.0.0.1:1880/tiposColab`;
fetch(endpoint_tiposColab)
    .then(res => res.json())
    .then(res => {
        f_tipoColab.innerHTML = "";
        res.forEach(e => {
            const opt = document.createElement("option");

            opt.setAttribute("value", e.n_tipousuario_tipousuario);
            opt.innerHTML = e.s_desc_tipousuario;
            f_tipoColab.appendChild(opt);

        });
    })

btn_add.addEventListener("click", (evt) => {
    
    ModuloJanela="n";
    document.getElementById("titulopopup").innerHTML="Novo Colaborador";
    novoColaborador.classList.remove("ocultarPopup");

});

btn_fecharPopup.addEventListener("click", (evt) => {
    novoColaborador.classList.add("ocultarPopup");

});

btn_gravarPop.addEventListener("click", (evt) => {

    // novoColaborador.classList.add("ocultarPopup");
    const tels=[...document.querySelectorAll(".Numtel")];
    let numTels=[];
    tels.forEach(t=>{
        numTels.push(t.innerHTML);

    });

    const dados={
        s_nome_usuario:f_nome.value,
        n_tipousuario_tipousuario:f_tipoColab.value,
        c_status_usuario:f_status.value,
        numtelefones:numTels,
        s_foto_usuario:img_foto.getAttribute("src")


    }

    const cab={
        method:'POST',
        body:JSON.stringify(dados) 
    }
    const endpointnovocolab=`http://127.0.0.1:1880/novocolab`
    fetch(endpointnovocolab,cab)
    .then(res=>{
        if(res.status==200){

            alert("Novo colaborador gravado");
            f_nome.value="";
            f_tipoColab.value="";
            f_status.value="";
            f_foto.value="";
            img_foto.setAttribute("src","#");
            telefones.innerHTML="";
            novoColaborador.classList.add("ocultarPopup");

            
        }else{
            alert("Erro ao grava Novo colaborador");
            novoColaborador.classList.add("ocultarPopup");
        }
    })
    
});

btn_cancelarPop.addEventListener("click", (evt) => {
    novoColaborador.classList.add("ocultarPopup");
});

f_fone.addEventListener("keyup", (evt) => {
    if (evt.key == "Enter") {
        if(evt.target.value.length >= 8){
               const divTel=document.createElement("div");
        divTel.setAttribute("class","tel");

        const Numtel=document.createElement("div");
        Numtel.setAttribute("class","Numtel");
        Numtel.innerHTML=evt.target.value;
        divTel.appendChild(Numtel);

        const delTel=document.createElement("img");
        delTel.setAttribute("src","../../imgs/delete.svg");
        delTel.setAttribute("class","delTel");
        delTel.addEventListener("click",(evt)=>{
            evt.target.parentNode.remove();
        });
        divTel.appendChild(delTel);

        telefones.appendChild(divTel);

        evt.target.value="";
        }else{
            alert("Número de telefone inválido!");
        }
        // console.log(evt.target.value);
     


    }

});

const converter_imagem_b64=(localDestino,arquivoimg)=>{
    const obj=arquivoimg;
    const reader=new FileReader();
    reader.addEventListener("load",(evt)=>{
        localDestino.src=reader.result;

    });
    if(obj){
        reader.readAsDataURL(obj);
    }
}

f_foto.addEventListener("change", (evt)=>{
    converter_imagem_b64(img_foto,evt.target.files[0]);


});

