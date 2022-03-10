
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

const productscart =  []
const addcarrinho = (newitem) => {
    const buscadora = (produto) => {
        if (produto.id === newitem.id) {
            return true
        }
        return false
    }
    const resultadoIndex = productscart.findIndex(buscadora)
    if (resultadoIndex === -1 ){
        productscart.push ({
            id: newitem.id,
            name: newitem.name,
            image: newitem.image,
            price: newitem.price,
            qty: 1
        })
    } else {
        productscart[resultadoIndex].qty = productscart[resultadoIndex].qty +1  
    }
    console.log(productscart)
}
const uptadeCart = () => {
    // adicionar itens dentro 
    // const carrinho = document
}