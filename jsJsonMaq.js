const jsonProducts = () => {
    const response = fetch('/produtosMaq.json')
    response.then((data) =>{
        const promessa = data.json()
        promessa.then((corpo) => {
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
                 <button class="btn-licar" id="ameiadd"><i class="fa-solid fa-heart"></i></button>
                 <button class="btn-licar" id="cartadd"><i class="fa-solid fa-cart-shopping"></i></button>
              </div>
             <p> R$ <span>${item.price.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span></p>
             <button class="btn-add"><p>Adicionar</p></button>
         `   

         const addCarrinhoBtnEl = cardDiv.querySelector('.btn-add')
         addCarrinhoBtnEl.addEventListener('click', () => {
            addcarrinho(item)
         })
         const addCart  = cardDiv.querySelector('#cartadd')
         addCart.addEventListener('click', () => {
             addcarrinho(item)
         })
         const addameiEl = cardDiv.querySelector('#ameiadd')
         addameiEl.addEventListener('click' , () => {
             addamei(item)
         })
         sectEl.appendChild(cardDiv)
     })
     return sectEl 
 }
 jsonProducts()
 