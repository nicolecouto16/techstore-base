import { formatarPreco } from '../utils/formatarPreco'

const CATEGORIAS = ['roupas', 'eletronicos', 'acessorios', 'casa']

export default function PainelLojista({ produtos, listaEspera = [] }) {
  const porCategoria = CATEGORIAS.map((categoria) => {
    const itens = produtos.filter((produto) => produto.category === categoria)

    const valorEstoque = itens.reduce((total, produto) => {
      const preco = Number(produto.price)
      const estoque = Number(produto.estoque)

      if (!Number.isFinite(preco) || !Number.isFinite(estoque)) {
        return total
      }

      return total + preco * estoque
    }, 0)

    const produtosSemPreco = itens.filter((produto) => !Number.isFinite(Number(produto.price))).length
    const clientesEsperando = itens.reduce((total, produto) => {
      const interessados = listaEspera.filter((item) => item.produtoId === produto.id)
      return total + interessados.length
    }, 0)

    const lucroEstimado = itens.reduce((total, produto) => {
      const preco = Number(produto.price)
      const estoque = Number(produto.estoque)

      if (!Number.isFinite(preco) || !Number.isFinite(estoque)) {
        return total
      }

      return total + preco * estoque
    }, 0)

    return {
      categoria,
      valorEstoque,
      produtosSemPreco,
      clientesEsperando,
      lucroEstimado,
    }
  })

  const totalEstoque = porCategoria.reduce((total, item) => total + item.valorEstoque, 0)
  const totalEsperandoPreco = produtos.filter((produto) => !Number.isFinite(Number(produto.price))).length
  const totalListaEspera = listaEspera.length
  const lucroTotal = porCategoria.reduce((total, item) => total + item.lucroEstimado, 0)

  return (
    <section>
      <p className="sobretitulo">Lojista</p>
      <h1>Painel do lojista</h1>

      <div className="painel-resumo">
        <div className="metrica-card">
          <span className="metrica-titulo">Valor em estoque</span>
          <strong className="metrica-valor">{formatarPreco(totalEstoque)}</strong>
        </div>

        <div className="metrica-card">
          <span className="metrica-titulo">Esperando preço</span>
          <strong className="metrica-valor">{totalEsperandoPreco}</strong>
        </div>

        <div className="metrica-card">
          <span className="metrica-titulo">Clientes na fila</span>
          <strong className="metrica-valor">{totalListaEspera}</strong>
        </div>

        <div className="metrica-card">
          <span className="metrica-titulo">Lucro estimado</span>
          <strong className="metrica-valor">{formatarPreco(lucroTotal)}</strong>
        </div>
      </div>

      <div className="painel-categorias">
        {porCategoria.map((item) => (
          <article key={item.categoria} className="categoria-card">
            <h3>{item.categoria}</h3>
            <p>
              <span>Estoque</span>
              <strong>{formatarPreco(item.valorEstoque)}</strong>
            </p>
            <p>
              <span>Sem preço</span>
              <strong>{item.produtosSemPreco}</strong>
            </p>
            <p>
              <span>Na fila</span>
              <strong>{item.clientesEsperando}</strong>
            </p>
            <p>
              <span>Lucro</span>
              <strong>{formatarPreco(item.lucroEstimado)}</strong>
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
