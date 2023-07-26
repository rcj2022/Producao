const btn_menuPrincipal=document.querySelector("#btn_menuPrincipal");
const menuPrincipal=document.querySelector("#menuPrincipal");
const todosmenusPrincipais=[...document.querySelectorAll(".btn_menuItem")];
const endpoint_Config=`../config.txt`;
fetch(endpoint_Config)
.then(res=>res.json())
.then(res=>{

    console.log(res);
 
    sessionStorage.setItem("servidor_nodered",res.servidor_nodered);
    sessionStorage.setItem("versão",res.versão);

})

btn_menuPrincipal.addEventListener("click",(evt)=>{

    menuPrincipal.classList.toggle("ocultar");

});

todosmenusPrincipais.forEach(e=>{
e.addEventListener("click",(evt)=>{
    menuPrincipal.classList.add("ocultar");

});
})
// console.log(todosmenusPrincipais)