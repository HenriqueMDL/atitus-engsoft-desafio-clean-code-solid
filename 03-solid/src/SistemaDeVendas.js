const Pedido = require("./Pedido");

class SistemaDeVendas {
  constructor({ repository, notificador }) {
    this.repository = repository;
    this.notificador = notificador;
  }

  async processarVenda(dados) {
    const pedido = new Pedido(dados);
    pedido.validar();

    const vendaPaga = { ...dados, total: pedido.calcularTotal(), status: "pago" };

    await this.repository.salvar(vendaPaga);
    await this.notificador.notificarVendaPaga(vendaPaga);

    return vendaPaga;
  }
}

module.exports = SistemaDeVendas;
