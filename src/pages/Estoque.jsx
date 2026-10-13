export default function Estoque({ produtos, listaEspera = [] }) {
  const ordenados = produtos.slice().sort((a, b) => a.estoque - b.estoque)

  const esperasPorProduto = listaEspera.reduce((acumulador, item) => {
    const produto = produtos.find((produtoAtual) => produtoAtual.id === item.produtoId)
    const chave = produto ? produto.title : item.produtoId

    if (!acumulador[chave]) {
      acumulador[chave] = []
    }

    acumulador[chave].push({ nome: item.nome, email: item.email })
    return acumulador
  }, {})

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{produto.category}</td>
                <td>{produto.estoque}</td>
                <td>
                  {produto.estoque === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                  {produto.estoque > 0 && produto.estoque < 5 && (
                    <span className="selo selo-alerta">Repor</span>
                  )}
                  {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Lista de espera</h2>
        {listaEspera.length === 0 ? (
          <p className="aviso">Nenhum cliente aguardando retorno.</p>
        ) : (
          <div className="tabela-moldura">
            <table className="tabela">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(esperasPorProduto).flatMap(([produtoNome, clientes]) =>
                  clientes.map((cliente, index) => (
                    <tr key={`${produtoNome}-${cliente.email}-${index}`}>
                      <td>{produtoNome}</td>
                      <td>{cliente.nome}</td>
                      <td>{cliente.email}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
