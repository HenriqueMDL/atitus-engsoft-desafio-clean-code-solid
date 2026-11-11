function encontrarProdutosComuns(listaA, listaB) {
  const conjuntoB = new Set(listaB);
  return listaA.filter((produto) => conjuntoB.has(produto));
}

module.exports = encontrarProdutosComuns;
