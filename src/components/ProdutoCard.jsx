import { Link } from 'react-router'
import { produtoDisponivel } from '../utils/carrinho'
import { formatarPreco } from '../utils/formatarPreco'

export default function ProdutoCard({ produto, onAdicionar }) {
  const indisponivel = !produtoDisponivel(produto)
  const esgotado = produto.estoque === 0
  const valorDoProduto = Number(produto.price)
  const freteGratisNoProduto = Number.isFinite(valorDoProduto) && valorDoProduto >= 200

  return (
    <article className="card">
      <Link to={`/produto/${produto.id}`} className="card-link">
        <div className="card-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="card-imagem" />
        </div>
        <h3 className="card-titulo">{produto.title}</h3>
      </Link>

      <p className="card-avaliacao">
        ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
      </p>

      <div className="card-precos">
        {produto.precoOriginal && (
          <span className="preco-original">{formatarPreco(produto.precoOriginal)}</span>
        )}
        <span className="preco">{formatarPreco(produto.price)}</span>
      </div>

      <div className="card-selos">
        {freteGratisNoProduto && <span className="selo selo-frete">Frete grátis</span>}
        {(esgotado || indisponivel) && <span className="selo selo-esgotado">Indisponível</span>}
      </div>

      <button className="botao" onClick={() => onAdicionar(produto)} disabled={indisponivel}>
        {indisponivel ? 'Indisponível' : 'Adicionar ao carrinho'}
      </button>
    </article>
  )
}
