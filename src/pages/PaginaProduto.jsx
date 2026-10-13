import { useState } from 'react'
import { Link, useParams } from 'react-router'
import ProdutoCard from '../components/ProdutoCard'
import { produtoDisponivel } from '../utils/carrinho'
import { formatarPreco } from '../utils/formatarPreco'

export default function PaginaProduto({ produtos, onAdicionar, onRegistrarEspera }) {
  const { id } = useParams()
  const produto = produtos.find((item) => item.id === id)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagemEspera, setMensagemEspera] = useState('')

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const esgotado = produto.estoque === 0
  const preco = Number(produto.price)
  const disponivel = produtoDisponivel(produto)

  const relacionados = produtos
    .filter(
      (item) =>
        item.category === produto.category &&
        item.id !== produto.id &&
        produtoDisponivel(item)
    )
    .slice(0, 4)

  function registrarInteresse(evento) {
    evento.preventDefault()

    const nomeTrim = nome.trim()
    const emailTrim = email.trim()

    if (!nomeTrim || !emailTrim) {
      return
    }

    onRegistrarEspera(produto.id, nomeTrim, emailTrim)
    setNome('')
    setEmail('')
    setMensagemEspera('Você entrou na lista de espera. Vamos avisar quando ele voltar!')
  }

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <p className="card-avaliacao">
            ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
          </p>
          <p className="detalhe-preco">
            {Number.isFinite(preco) ? formatarPreco(preco) : 'Preço indisponível'}
          </p>
          <p className="detalhe-descricao">{produto.description}</p>
          <p className="detalhe-estoque">
            {esgotado ? 'Esgotado no momento' : `${produto.estoque} unidades disponíveis`}
          </p>

          {!esgotado && (
            <button
              className="botao botao-grande"
              onClick={() => onAdicionar(produto)}
              disabled={!disponivel}
            >
              {disponivel ? 'Adicionar ao carrinho' : 'Indisponível'}
            </button>
          )}

          {esgotado && (
            <form onSubmit={registrarInteresse} className="cupom" style={{ marginTop: '1rem' }}>
              <label htmlFor="nome-espera" className="rotulo">
                Avise-me quando voltar
              </label>
              <input
                id="nome-espera"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder="Seu nome"
                style={{ marginBottom: '0.5rem' }}
              />
              <input
                type="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                placeholder="Seu e-mail"
                style={{ marginBottom: '0.5rem' }}
              />
              <button type="submit" className="botao botao-grande">
                Me avisem
              </button>
              {mensagemEspera && <p className="mensagem-cupom">{mensagemEspera}</p>}
            </form>
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      <h2>Produtos relacionados</h2>
      <div className="grade">
        {relacionados.map((item) => (
          <ProdutoCard key={item.id} produto={item} onAdicionar={onAdicionar} />
        ))}
      </div>
    </section>
  )
}
