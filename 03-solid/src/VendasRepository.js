class VendasRepository {
  async salvar(pedido) {
    console.log(`Salvando pedido ${pedido.id}...`);
  }
}

module.exports = VendasRepository;
