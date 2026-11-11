const LIMITE_DESCONTO = 1000;
const FATOR_DESCONTO = 0.9;

class Pedido {
  constructor({ id, clienteEmail, itens }) {
    this.id = id;
    this.clienteEmail = clienteEmail;
    this.itens = itens;
  }

  validar() {
    if (!this.itens || this.itens.length === 0) {
      throw new Error("Pedido sem itens");
    }
  }

  calcularTotal() {
    const subtotal = this.itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
    return subtotal > LIMITE_DESCONTO ? subtotal * FATOR_DESCONTO : subtotal;
  }
}

module.exports = Pedido;
