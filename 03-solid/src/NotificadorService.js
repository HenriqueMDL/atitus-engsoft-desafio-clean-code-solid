class NotificadorService {
  async notificarVendaPaga(pedido) {
    console.log(`Enviando e-mail para ${pedido.clienteEmail}...`);
  }
}

module.exports = NotificadorService;
