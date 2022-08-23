const lista = document.querySelector(".lista")
const somaProdutos = document.querySelector(".priceContainer span")

function listaProdutos(array, secao){

    lista.innerHTML = ""

    array.forEach(element => {
        let produto = element
        let card = criaCard(produto)
        secao.appendChild(card)
    });
    
}
listaProdutos(produtos, lista)


function criaCard(produto){

    const cardProduto = document.createElement("li")
    const imagemProduto = document.createElement("img")
    const nomeProduto = document.createElement("h3")
    const secaoProduto = document.createElement("p")
    const nutrientesProduto = document.createElement("ol")
    const divComprar = document.createElement("div")
    const precoProduto = document.createElement("span")
    const botaoComprar = document.createElement("button")

    let nutrientes = produto.componentes

    const listar = nutrientes.forEach((element) => {
        const listaNutrientes = document.createElement("li")
        const nutrientes = document.createElement("p")
        nutrientes.innerHTML = element

        nutrientesProduto.appendChild(listaNutrientes)
        listaNutrientes.appendChild(nutrientes)
        divComprar.append(precoProduto, botaoComprar)
        cardProduto.append(imagemProduto, nomeProduto, secaoProduto, nutrientesProduto, divComprar)

        imagemProduto.src = produto.img
        imagemProduto.alt = produto.nome
        nomeProduto.innerText = produto.nome
        secaoProduto.innerText = produto.secao
        precoProduto.innerText = `R$ ${produto.preco}`
        botaoComprar.innerText = "Comprar"
        botaoComprar.id = produto.id
        botaoComprar.classList.add("botaoComprar")
    })

return cardProduto
}


const input = document.querySelector(".campoBuscaPorNome")

input.addEventListener("keyup", function(){

    let valorInput = input.value
    let resultado = buscar(valorInput)
})


function buscar(valorPesquisa){
    
    let newArray = []
    let busca = produtos.forEach((elemento) => {

        let pesquisa = valorPesquisa.toLowerCase()
        let nomeProduto = elemento.nome.toLowerCase()
        let sessaoProduto = elemento.secao.toLowerCase()
        let sessaoCategoria = elemento.categoria.toLowerCase()

        if(nomeProduto.includes(pesquisa) || sessaoProduto.includes(pesquisa) || sessaoCategoria.includes(pesquisa)){
            newArray.push(elemento)
            lista.innerHTML = ""
            listaProdutos(newArray, lista)
        } 
    })    
}

const buttonPesquisa = document.querySelector(".filtersContainer")
const carrinhoCompras = []

buttonPesquisa.addEventListener("click", pesquisaNav)

function pesquisaNav(event){

    let newArray = []

    let pesquisaBtn = event.target

    for(let i = 0; i < produtos.length; i++){
        
        if(pesquisaBtn.tagName == "BUTTON" && pesquisaBtn.innerText.includes(produtos[i].secao)){
            newArray.push(produtos[i])
            listaProdutos(newArray, lista)
            
        }
        else if(pesquisaBtn.tagName == "BUTTON" && pesquisaBtn.innerText == "Todos Produtos"){
            listaProdutos(produtos, lista)
            
        }
    }
}

const botaoComprar = document.querySelector(".containerVitrine")

lista.addEventListener("click", interceptaProduto)

function interceptaProduto(event){
    
    let btn = event.target

    if(btn.tagName == "BUTTON"){

        let idProduto = btn.id

        let produto = produtos.find(function(produto) {

            if(produto.id == idProduto){
                return produto
            }
        })
        adicionaAoCarrinho(produto)
        removerItem()
    }
}

function adicionaAoCarrinho(produto){
    if(produto !== undefined){
    carrinhoCompras.push(produto)
    listarCarrinho(carrinhoCompras)
    somaItens(carrinhoCompras)
    }
}

function criarCardCarrinho(produto){

    let cardCarrinho = document.createElement("li")
    let divCarrinho = document.createElement("div")
    let imagemCarrinho = document.createElement("img");
    let nomeCarrinho = document.createElement("h2")
    let precoCarrinho = document.createElement("h3")
    let sessaoProduto = document.createElement("p")
    let btnRetirarCarrinho = document.createElement("div")
    let imgLixeira = document.createElement("img")
    let divInfo = document.createElement("div")
    
    imagemCarrinho.src = produto.img
    imagemCarrinho.alt = produto.nome
    nomeCarrinho.innerText = produto.nome
    sessaoProduto.innerText = produto.secao
    precoCarrinho.innerText = `R$ ${produto.preco}`
    imgLixeira.src = "./src/img/trash.png"
    imgLixeira.id = produto.id

    cardCarrinho.append(divCarrinho, btnRetirarCarrinho)
    btnRetirarCarrinho.append(imgLixeira)
    divInfo.append(nomeCarrinho, sessaoProduto, precoCarrinho )
    divCarrinho.append(imagemCarrinho, divInfo)
    carrinho.append(cardCarrinho)
   
    btnRetirarCarrinho.classList.add("botaoRetirar")
    cardCarrinho.classList.add("listaDoCarrinho")
    imagemCarrinho.classList.add("imagemCarrinho")
    divCarrinho.classList.add("boxImgInfo")
    divInfo.classList.add("boxInfo")
}


const carrinho = document.querySelector(".listaCarrinho")
const sessaoCarrinho = document.querySelector(".totalCarrinho")


function listarCarrinho(array){

    carrinho.innerHTML = ""

    const produto = array.forEach((element) => {
       criarCardCarrinho(element)
    })
}


function removerItem(){

    const btn = document.getElementsByClassName("botaoRetirar")

    for(let i = 0; i < btn.length; i++){
        let posicao = btn[i]

        posicao.addEventListener("click", () => {
            carrinhoCompras.splice(i, 1)
            listarCarrinho(carrinhoCompras)
            removerItem()
            somaItens(carrinhoCompras)
        })
    }
}

const divQuantidade = document.createElement("div")
const divTotal = document.createElement("div")
const quantidade = document.createElement("span")
const total = document.createElement("span")
const valorQuantidade = document.createElement("span")
const totalValor = document.createElement("span")

sessaoCarrinho.append(quantidade, total)

function somaItens(array){

    let valorTotal = 0

    for(let i = 0; i < array.length; i++){
        let toNumber = parseInt(array[i].preco)
        valorTotal += toNumber
    }

    if(carrinhoCompras.length !== 0){
        quantidade.innerHTML = `Quantidade: `
        valorQuantidade.innerHTML = `${carrinhoCompras.length}`
        total.innerHTML = `Total: `
        totalValor.innerHTML = `${valorTotal},00`
        divQuantidade.append(quantidade, valorQuantidade)
        divTotal.append(total, totalValor)
        sessaoCarrinho.append(divQuantidade, divTotal)
    }
    else{
        valorQuantidade.innerHTML = `Total: 0`
        totalValor.innerHTML = `0,00`
    }

    return valorTotal 
}










