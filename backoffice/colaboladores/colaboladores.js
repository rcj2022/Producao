const dadosgrid = document.querySelector("#dadosgrid");
const endpoint_todoscolaboradores = `http://127.0.0.1:1880/todosUsuarios`;
fetch(endpoint_todoscolaboradores)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        dadosgrid.innerHTML="";
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




            dadosgrid.appendChild(divlinha);

        });

    })