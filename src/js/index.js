const lista = document.querySelector(".lista")

function listarProdutos(array, secao){
    lista.innerHTML = ""

    array.forEach(elemento => {
        let produto = elemento
        let card = criarCard(produto)
        secao.appendChild(card)
    });
}
listarProdutos(produtos, lista)

function criarCard(produto){
    
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