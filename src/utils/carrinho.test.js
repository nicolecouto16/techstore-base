import test from 'node:test'
import assert from 'node:assert/strict'

import { calcularTotal, produtoDisponivel } from './carrinho.js'

test('calcularTotal ignora produtos sem preço válido', () => {
  const carrinho = [
    { id: 'p1', price: 120, estoque: 2 },
    { id: 'p2', price: undefined, estoque: 1 },
    { id: 'p3', price: 80, estoque: 0 },
    { id: 'p4', price: '39,90', estoque: 1 },
  ]

  assert.equal(calcularTotal(carrinho), 200)
})

test('produtoDisponivel bloqueia produtos esgotados ou sem preço', () => {
  assert.equal(produtoDisponivel({ id: 'p1', price: 79.9, estoque: 2 }), true)
  assert.equal(produtoDisponivel({ id: 'p2', price: undefined, estoque: 2 }), false)
  assert.equal(produtoDisponivel({ id: 'p3', price: 59.9, estoque: 0 }), false)
})
