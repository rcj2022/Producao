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
const f_foto = document.querySelector("#f_foto");
const img_foto = document.querySelector("#img_foto");

// N=Novo colaborador | E=Editar Novo Colaborador

let ModuloJanela = "n";

const serv=sessionStorage.getItem("servidor_nodered");
const criarcxTelefone = (fone, idtel, tipo) => {

    const divTel = document.createElement("div");
    divTel.setAttribute("class", "tel");

    const Numtel = document.createElement("div");
    if (tipo == "n") {
        Numtel.setAttribute("class", "Numtel novoTel");
    } else {
        Numtel.setAttribute("class", "Numtel editarTel");
    }
    Numtel.innerHTML = fone;
    divTel.appendChild(Numtel);

    const delTel = document.createElement("img");
    delTel.setAttribute("src", "../../imgs/delete.svg");
    delTel.setAttribute("class", "delTel");
    delTel.setAttribute("data-idtel", idtel);
    delTel.addEventListener("click", (evt) => {

        if (idtel = "-1") {

            const objTel = evt.target;
            const idtel = objTel.dataset.idtel;

            const endpoint_delTel = `${serv}/deletartelefone/${idtel}`;
            fetch(endpoint_delTel)
                .then(res => {
                    if (res.status == 200) {
                        evt.target.parentNode.remove();
                    }

                })
        } else {
            evt.target.parentNode.remove();
        }



    });

    divTel.appendChild(delTel);

    telefones.appendChild(divTel);
}


// comandos
const CarregarTodosColabs=()=>{


const endpoint_todoscolaboradores = `${serv}/todosUsuarios`;
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

            const img_editar = document.createElement("img");
            img_editar.setAttribute("src", "../../imgs/edit.svg");
            img_editar.setAttribute("class", "icone_op");
            img_editar.addEventListener("click", (evt) => {

                // editar dados
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML;
                ModuloJanela = "e";
                document.getElementById("titulopopup").innerHTML = "Editar Colaborador";
                let endpoint = `${serv}/dadoscolab/${id}`;
                fetch(endpoint)
                    .then(res => res.json())
                    .then(res => {
                        btn_gravarPop.setAttribute("data-idcolab", id);
                        f_nome.value = res[0].s_nome_usuario;
                        f_tipoColab.value = res[0].n_tipousuario_tipousuario;
                        f_status.value = res[0].c_status_usuario;
                        img_foto.src = res[0].s_foto_usuario;
                        novoColaborador.classList.remove("ocultarPopup");

                    })

                endpoint = `${serv}/telefonescolab/${id}`;

                fetch(endpoint)
                    .then(res => res.json())
                    .then(res => {
                        telefones.innerHTML = "";

                        res.forEach(t => {
                            // console.log(t);

                            criarcxTelefone(t.s_numero_telefone, t.n_telefone_telefone, "e"
                            );
                        })
                        // console.log(res);
                        // 



                    })


            });

        
            divc5.appendChild(img_editar);

            const img_delete = document.createElement("img");
            img_delete.setAttribute("src", "../../imgs/delete.svg");
            img_delete.setAttribute("class", "icone_op");
            divc5.appendChild(img_delete);





            dadosgrid.appendChild(divlinha);

        });

    });
}
CarregarTodosColabs();

const endpoint_tiposColab = `${serv}/tiposColab`;
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

    ModuloJanela = "n";
    document.getElementById("titulopopup").innerHTML = "Novo Colaborador";
    novoColaborador.classList.remove("ocultarPopup");
    f_nome.value = "";
    f_tipoColab.value = "";
    f_status.value = "";
    f_foto.value = "";
    img_foto.setAttribute("src", "#");
    telefones.innerHTML = "";

});

btn_fecharPopup.addEventListener("click", (evt) => {
    novoColaborador.classList.add("ocultarPopup");

});

btn_gravarPop.addEventListener("click", (evt) => {

    // novoColaborador.classList.add("ocultarPopup");
    const tels = [...document.querySelectorAll(".novoTel")];
    let numTels = [];
    tels.forEach(t => {
        numTels.push(t.innerHTML);

    });

    const dados = {

        n_usuario_usuario: evt.target.dataset.idcolab,
        s_nome_usuario: f_nome.value,
        n_tipousuario_tipousuario: f_tipoColab.value,
        c_status_usuario: f_status.value,
        numtelefones: numTels,
        s_foto_usuario: img_foto.getAttribute("src")


    }

    const cab = {
        method: 'POST',
        body: JSON.stringify(dados)
    }
    let endpointNovocoEditarlab = null;

    if (ModuloJanela == "n") {
        endpointNovocoEditarlab = `${serv}/novocolab`
    } else {
        endpointNovocoEditarlab = `${serv}/editarcolab`
    }

    fetch(endpointNovocoEditarlab, cab)
        .then(res => {

            if (res.status == 200) {

                if (ModuloJanela == "n") {

                    alert("Novo colaborador gravado");
                    f_nome.value = "";
                    f_tipoColab.value = "";
                    f_status.value = "";
                    f_foto.value = "";
                    img_foto.setAttribute("src", "#");
                    telefones.innerHTML = "";
                    CarregarTodosColabs();
                    novoColaborador.classList.add("ocultarPopup");
                } else {
                    alert("colaborador atualizado com sucesso");
                    CarregarTodosColabs();
                    novoColaborador.classList.add("ocultarPopup");
                }
            } else {
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
        if (evt.target.value.length >= 8) {
            criarcxTelefone(evt.target.value, "-1", "n");
            // const divTel=document.createElement("div");
            // divTel.setAttribute("class","tel");

            // const Numtel=document.createElement("div");
            // Numtel.setAttribute("class","Numtel");
            // Numtel.innerHTML=evt.target.value;
            // divTel.appendChild(Numtel);

            // const delTel=document.createElement("img");
            // delTel.setAttribute("src","../../imgs/delete.svg");
            // delTel.setAttribute("class","delTel");
            // delTel.addEventListener("click",(evt)=>{
            //     evt.target.parentNode.remove();
            // });
            // divTel.appendChild(delTel);

            // telefones.appendChild(divTel);

            evt.target.value = "";
        } else {
            alert("Número de telefone inválido!");
        }
        // console.log(evt.target.value);



    }

});

const converter_imagem_b64 = (localDestino, arquivoimg) => {
    const obj = arquivoimg;
    const reader = new FileReader();
    reader.addEventListener("load", (evt) => {
        localDestino.src = reader.result;

    });
    if (obj) {
        reader.readAsDataURL(obj);
    }
}

f_foto.addEventListener("change", (evt) => {
    converter_imagem_b64(img_foto, evt.target.files[0]);


});

