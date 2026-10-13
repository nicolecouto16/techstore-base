export function produtoDisponivel(produto) {
  if (!produto) return false

  const preco = Number(produto.price)
  const estoque = Number(produto.estoque)

  return Number.isFinite(preco) && preco >= 0 && Number.isFinite(estoque) && estoque > 0
}

export function calcularTotal(carrinho) {
  return carrinho.reduce((total, produto) => {
    if (!produtoDisponivel(produto)) {
      return total
    }

    return total + Number(produto.price)
  }, 0)
}

export function agruparItens(carrinho) {
  const itens = []
  carrinho
    .filter((produto) => produtoDisponivel(produto))
    .forEach((produto) => {
      const existente = itens.find((item) => item.produto.id === produto.id)
      if (existente) {
        existente.quantidade += 1
      } else {
        itens.push({ produto, quantidade: 1 })
      }
    })
  return itens
}
