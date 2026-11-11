const REGRAS_DESCONTO = new Map([
  ['premium', [
    { aplica: (cliente, valor) => valor > 1000 && cliente.anosCadastro > 5, taxa: 0.20 },
    { aplica: (_cliente, valor) => valor > 1000, taxa: 0.15 },
    { aplica: (_cliente, valor) => valor > 500, taxa: 0.10 },
    { aplica: () => true, taxa: 0.05 },
  ]],
  ['gold', [
    { aplica: (_cliente, valor) => valor > 1000, taxa: 0.10 },
    { aplica: () => true, taxa: 0.02 },
  ]],
]);

function calcularDesconto(cliente, valor) {
  const regras = REGRAS_DESCONTO.get(cliente.tipo) ?? [];
  const regra = regras.find((r) => r.aplica(cliente, valor));
  return regra ? valor * regra.taxa : 0;
}

module.exports = calcularDesconto;
