const SistemaDeVendas = require("./SistemaDeVendas");
const VendasRepository = require("./VendasRepository");
const NotificadorService = require("./NotificadorService");

function criarSistemaDeVendas() {
  return new SistemaDeVendas({
    repository: new VendasRepository(),
    notificador: new NotificadorService(),
  });
}

module.exports = criarSistemaDeVendas;
