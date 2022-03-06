
function abrirmenu() {
    document.querySelector(`#menu`).style.display = "block";
}
function fecharmenu() {
    document.querySelector(`#menu`).style.display = "none";
}
function abrirmodal() {
    document.querySelector(`#modal-sombra`).style.display = "block"
}
function fecharmodal() {
    document.querySelector(`#modal-sombra`).style.display = "none"
}
// pesquisar//

document.getElementById("input-pesq").addEventListener("change", pesquisarInput )
function pesquisarInput(evento) {
    const btnPesq = evento.target.value
    if(btnPesq == "perfumaria" || btnPesq == "perfume"|| btnPesq == "Perfumaria" || btnPesq == "Perfume" ){
        return window.location.replace("Perfumaria.html")
    } else if(btnPesq == "maquiagem" || btnPesq == "maquiagens" || btnPesq == "make" || btnPesq == "Make"|| btnPesq == "Maquiagem" || btnPesq == "Maquiagens")  {
                return window.location.replace("Maquiagem.html")
    }else if (btnPesq == "cabelo" || btnPesq == "meu cabelo" || btnPesq == "cabeleira" || btnPesq == "Cabeleira" || btnPesq == "Cabelo" || btnPesq == "Meu cabelo" || btnPesq == "Meu Cabelo") {
                return window.location.replace("Meu-cabelo.html") 
 }  
document.getElementById("btn-pesq").addEventListener("click", pesquisarBtn )

 function pesquisarBtn() {
    pesquisarInput() }
 }
// abrir e fechar menu //

function opencart() {
    document.querySelector(".carrinho-compra").style.display = "block"
} 
function closecart() {
    document.querySelector(".carrinho-compra").style.display = "none"
}
function openlike() {
    document.querySelector(".eu-amei").style.display = "block"
}
function closelike() {
    document.querySelector(".eu-amei").style.display = "none"
}       


const jsonProducts = () => {
   const response = fetch('/produtosMaq.json')
   response.then((data) =>{
       const promessa = data.json()
       promessa.then((corpo) => {
        console.log('acabou', corpo)
        const gruposRoot = document.querySelector("#gruposroot")
        for (let contador = 0;contador < corpo.groups.length; contador++) {
            const sectitleEl = document.createElement('h2')
            sectitleEl.textContent = corpo.groups[contador].name
            gruposRoot.appendChild(sectitleEl)
            const chamadorOrg = orgSectel(corpo.groups[contador])
            gruposRoot.appendChild(chamadorOrg)
            
        }
       })
    .catch(() => {
        console.log("fedeu")
    })
   })
   
}
const orgSectel = (group) => {
        const sectEl = document.createElement('section')
        sectEl.classList.add ("coluns")
    group.products.forEach((item) => {
        const cardDiv = document.createElement("div")
        cardDiv.classList.add("card-img")
        cardDiv.innerHTML = `
            <div class="imgcard"><img src="${item.image}" alt="${item.name}"/></div>
            <h3 class="product-title"> ${item.name}</h3>
            <div class="btn-licar-geral">
                <button class="btn-licar"><i class="fa-solid fa-heart"></i></button>
                <button class="btn-licar"><i class="fa-solid fa-cart-shopping"></i></button>
             </div>
            <p> R$ <span>${item.price.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span></p>
            <button class="btn-add"><p>Adicionar</p></button>
        `   
        sectEl.appendChild(cardDiv)
    })
    return sectEl 
}

jsonProducts()