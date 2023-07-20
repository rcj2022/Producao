const btn_menuPrincipal=document.querySelector("#btn_menuPrincipal");
const menuPrincipal=document.querySelector("#menuPrincipal");
const todosmenusPrincipais=[...document.querySelectorAll(".btn_menuItem")];

btn_menuPrincipal.addEventListener("click",(evt)=>{

    menuPrincipal.classList.toggle("ocultar");

});

todosmenusPrincipais.forEach(e=>{
e.addEventListener("click",(evt)=>{
    menuPrincipal.classList.add("ocultar");

});
})
// console.log(todosmenusPrincipais)