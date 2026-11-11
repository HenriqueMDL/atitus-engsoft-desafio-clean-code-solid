const SistemaDeVendas = require("../src/SistemaDeVendas");
const criarSistemaDeVendas = require("../src/criarSistemaDeVendas");

describe("Desafio 3: SOLID", () => {
  let repository;
  let notificador;
  let sistema;

  beforeEach(() => {
    repository = { salvar: jest.fn().mockResolvedValue() };
    notificador = { notificarVendaPaga: jest.fn().mockResolvedValue() };
    sistema = new SistemaDeVendas({ repository, notificador });
  });

  test("Processa venda com total e desconto", async () => {
    const pedido = { id: 1, clienteEmail: "a@a.com", itens: [{ preco: 1200, quantidade: 1 }] };
    const res = await sistema.processarVenda(pedido);
    expect(res.total).toBe(1080);
    expect(res.status).toBe("pago");
  });

  test("Não aplica desconto em pedidos até 1000", async () => {
    const pedido = { id: 2, clienteEmail: "a@a.com", itens: [{ preco: 100, quantidade: 3 }] };
    const res = await sistema.processarVenda(pedido);
    expect(res.total).toBe(300);
  });

  test("Salva e notifica usando as dependências injetadas", async () => {
    const pedido = { id: 3, clienteEmail: "b@b.com", itens: [{ preco: 10, quantidade: 1 }] };
    await sistema.processarVenda(pedido);
    expect(repository.salvar).toHaveBeenCalledWith(expect.objectContaining({ id: 3, total: 10 }));
    expect(notificador.notificarVendaPaga).toHaveBeenCalledWith(expect.objectContaining({ clienteEmail: "b@b.com" }));
  });

  test("Rejeita pedido sem itens e não salva nem notifica", async () => {
    await expect(sistema.processarVenda({ id: 4, clienteEmail: "c@c.com", itens: [] }))
      .rejects.toThrow("Pedido sem itens");
    expect(repository.salvar).not.toHaveBeenCalled();
    expect(notificador.notificarVendaPaga).not.toHaveBeenCalled();
  });

  test("Composition root monta o sistema com implementações reais", async () => {
    const log = jest.spyOn(console, "log").mockImplementation(() => {});
    const res = await criarSistemaDeVendas().processarVenda(
      { id: 5, clienteEmail: "d@d.com", itens: [{ preco: 1200, quantidade: 1 }] }
    );
    expect(res.total).toBe(1080);
    log.mockRestore();
  });
});
