
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
// Carrinho 
let productscart =  []
const saveProducts = localStorage.getItem('productscart')
if(saveProducts){
    productscart = JSON.parse(saveProducts)
}
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
    uptadeCart(true)
}
const removeCartItens = id => {
    productscart = productscart.filter((product) => {
        if (product.id === id){
            return false
        }
        return true 
    })
    uptadeCart(true)
}
const upQtyInput = (id, newqty1) => {
    const NewQtyFalse = parseInt(newqty1)
    if(isNaN(NewQtyFalse)) {
        return
    }
        if(NewQtyFalse > 0){
        const productIndex = productscart.findIndex((product) => {
            if(product.id === id) {
                return true
            }
            return false
        })
        productscart[productIndex].qty = parseInt(newqty1)
        uptadeCart(false)
        }else {
            removeCartItens(id)
        }
}

const cartvazio = document.querySelector('#apagarvaziocart')
const CitemCart = document.querySelector('#apagarcart')
const UlCitemCart = CitemCart ?.querySelector('ul')
const uptadeCart = (renderItens) => {
    // salva carrinho local store 
    const prodctString = JSON.stringify(productscart)
    localStorage.setItem('productscart', prodctString)
    if (productscart.length > 0) {
        let total = 0
        let totalPrice = 0
        productscart.forEach(product => {
            total = total + product.qty
            totalPrice = totalPrice + product.price * product.qty
        })
        const valores = document.querySelector('#valores p:last-child')
        valores.textContent = totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    //   aparecer carrinho com item
        CitemCart.classList.add('apareceritens')
        cartvazio.classList.remove('apareceritens')
            if(renderItens) {
            UlCitemCart.innerHTML = ``
            // exibir produto
            productscart.forEach((product) => {
            const liItens = document.createElement('li')
            liItens.innerHTML = `
                <div id="Citem">
                    <img src="${product.image}" alt="${product.name}">
                    <div >
                        <p> ${product.name}</p>
                        <p> ${product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </p>
                    </div>
                    <input type="number" value="${product.qty}"/>
                    <button class="excluir">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                </div> 
            `
            const BtnRemove = liItens.querySelector('button')
            BtnRemove.addEventListener('click', () => {
                removeCartItens(product.id)
            })
            const InputQty = liItens.querySelector('input')
            InputQty.addEventListener('keyup', (event) => {
                upQtyInput(product.id , event.target.value)
            })
            InputQty.addEventListener('keydow', (event) => {
            if (event.key === '-'|| event.key === '.' || event.key === ',' ) {
                event.preventDefault()
            }
            })
            InputQty.addEventListener('change', (event) => {
                upQtyInput(product.id , event.target.value)
            })
            UlCitemCart.appendChild(liItens)
            })
        }
        }else {
            // aparece carrinho vazio
            cartvazio.classList.add ('apareceritens')
            CitemCart.classList.remove('apareceritens')
        }
}

if (UlCitemCart){
uptadeCart(true)
}

const formGrups = document.querySelector('.form-check')
formGrups?.addEventListener('submit', (event) => {
    event.preventDefault()
    if (productscart.length == 0) {
        alert('Nenhum produto no carrinho.')
        return
      }
      let text = 'Confira o pedido abaixo:\n---------------------------------------\n\n'
      let total = 0
      productscart.forEach(product => {
        text += `*${product.qty}x ${product.name}* - ${product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}\n`
        total += product.price * product.qty
      })
      text += '\n*Taxa de entrega:* A combinar\n'
      text += `*Total: ${total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}*`
      text += '\n---------------------------------------\n\n'
      text += `*${formGrups.elements['input-name'].value}*\n`
      text += `${formGrups.elements['input-phone'].value}\n\n`
      text += `${formGrups.elements['input-address'].value}, ${formGrups.elements['input-number'].value}`
      const complement = formGrups.elements['input-complement'].value
      if (complement) {
        text+= ` - ${complement}`
      }
      text += `\n${formGrups.elements['input-neighborhood'].value}, ${formGrups.elements['input-city'].value}\n`
      text += formGrups.elements['input-cep'].value
      const subdomain = window.innerWidth > 768 ? 'web' : 'api'
      window.open(`https://${subdomain}.whatsapp.com/send?phone=5531983082389&text=${encodeURI(text)}`, '_blank')
    })
    if (typeof IMask !== 'undefined') {
        const inPhone = document.querySelector('#input-phone')
        IMask(inPhone, {
          mask: '(00) 00000-0000'
        })
        const inCep = document.querySelector('#input-cep')
        IMask(inCep, {
          mask: '00000-000'
        })
      }

// eu amei

let productsAmei = []
const saveProductsamei = localStorage.getItem('productsAmei')
if(saveProductsamei){
    productsAmei = JSON.parse(saveProductsamei)
}
const addamei = (newitem) => {
    const buscadora = (product) =>{
        if (product.id === newitem.id) {
        return true
        }
        return false
    }
    const resultadoIndexAmei = productsAmei.findIndex(buscadora)
        if(resultadoIndexAmei === -1) {
            productsAmei.push ({
                id: newitem.id,
                name: newitem.name,
                image: newitem.image,
                price: newitem.price,
                qty: 1
            })
        }
    console.log(resultadoIndexAmei ,"resultado")
    upDateAmei()
}
const removeamei = id => {
    productsAmei = productsAmei.filter((product) => {
        if (product.id === id){
            return false
        }
        return true 
    })
    upDateAmei()
}
// const carrinhoamei = id => {
//     productsAmei = productsAmei.filter((product) => {
//         return product.id === id
//     })
    
//     console.log(productsAmei)
// }
const upDateAmei = () => {
    const prodctString = JSON.stringify(productsAmei)
    localStorage.setItem('productsAmei', prodctString)
    const ameiitens = document.querySelector('#apagaritens')
    const ameiSemItens = document.querySelector('#apagarvazioamei')
    const AmeiItensUl = ameiitens.querySelector('ul')
    if (productsAmei.length > 0){
        AmeiItensUl.innerHTML = ``
        ameiSemItens.classList.remove('apareceritens')
        ameiitens.classList.add('apareceritens')  
        productsAmei.forEach((product)=> {
        const LiAmeiItens = document.createElement('li')
        LiAmeiItens.innerHTML = `
        <div id="Citem">
             <img src="${product.image}" alt="${product.name}">
            <div>
                <p> ${product.name}</p>
                <p> ${product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}  </p>
            </div>
            <button class="excluiramei">
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
        </div>
        `
        const BtnRemove = LiAmeiItens.querySelector('button')
        BtnRemove.addEventListener('click', () => {
            removeamei(product.id)
        })
        // const BtnAddCarinhoAmei = ameiitens.querySelector('.final')
        // BtnAddCarinhoAmei.addEventListener('click',() => {
        //     carrinhoamei()
        //     // console.log(carrinhoamei)
        // })
        AmeiItensUl.appendChild(LiAmeiItens)
    })
        } else {
        ameiitens.classList.remove('apareceritens')
        ameiSemItens.classList.add('apareceritens')
    }
}
upDateAmei()