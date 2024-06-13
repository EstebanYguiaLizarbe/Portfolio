const nav = document.querySelector("#navar")
const icono = document.querySelector("#menu-icon")
const seccion = document.querySelector("section")

icono.addEventListener("click", () =>{
    if(!nav.classList.contains("active")){
        return nav.classList.add("active")
    }
    if(nav.classList.contains("active")){
        return nav.classList.remove("active")
    }
    
    
})

seccion.addEventListener("click", () =>{
    console.log("hola")
})

console.log(window.onscroll, "windw")