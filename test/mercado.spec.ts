import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';

describe('Mercado API', () => {
  const p = pactum;
  const baseUrl = 'https://api-desafio-qa.onrender.com/docs/#';
  p.request.setDefaultTimeout(30000);

  const idMercado = 1;
  const iDFruta = 2;
  const docesID = 3;
  const idOleo = 4;
  const idLimpeza = 5;

  it('Retornar todos os Mercados', async () => {
    await p.spec().get(`${baseUrl}/mercado`);
  });

  it('Adiciona um Mercado', async () => {
    await p
      .spec()
      .post(`${baseUrl}/mercado`)
      .withJson({
        nome: 'Naum',
        cnpj: '11122239000000',
        endereco: 'Avenida principal'
      })
      .expectStatus(StatusCodes.OK);
  });

  it('Busca um mercado pelo ID', async () => {
    await p.spec().get(`${baseUrl}/mercado/${idMercado}`);
  });

  it('Atualiza um mercado existente pelo ID', async () => {
    await pactum.spec().put(`${baseUrl}/mercado/${idMercado}`).withJson({
      nome: 'Marcos',
      cnpj: '11122239000000',
      endereco: 'Bairro Estação'
    });
  });

  it('Remove um mercado Existente pelo ID', async () => {
    await p
      .spec()
      .delete(`${baseUrl}/mercado/${idMercado}`)
      .expectStatus(StatusCodes.OK);
  });

  it('Adiciona uma fruta a um Mercado', async () => {
    await p
      .spec()
      .post(`${baseUrl}/mercado/${idMercado}/produtos/hortifruit/legumes`)
      .withJson({
        nome: 'Maçã',
        valor: 3
      })
      .expectStatus(StatusCodes.OK);
  });

  it('GET nos legumes', async () => {
    await p
      .spec()
      .get(`${baseUrl}/mercado/${idMercado}/produtos/hortifruit/legumes`);
  });

  it('Remove uma Fruta de um Mercado', async () => {
    await p
      .spec()
      .delete(
        `${baseUrl}/mercado/${idMercado}/produtos/hortifruit/legumes/${iDFruta}`
      )
      .expectStatus(StatusCodes.OK);
  });

  it('Adiciona um Doce', async () => {
    await p
      .spec()
      .post(`${baseUrl}/mercado/${iDFruta}/produtos/padaria/doces`)
      .withJson({
        nome: 'Brigadeiro',
        valor: 10
      })
      .expectStatus(StatusCodes.OK);
  });

  it('Deleta um doce por ID', async () => {
    await p
      .spec()
      .delete(
        `${baseUrl}/mercado/${idMercado}/produtos/padaria/doces/${docesID}`
      )
      .expectStatus(StatusCodes.OK);
  });

  it('Retorna à lista de Doces', async () => {
    await p
      .spec()
      .get(`${baseUrl}/mercado/${idMercado}/produtos/padaria/doces`);
  });

  it('GET nos suinos', async () => {
    await p
      .spec()
      .get(`${baseUrl}/mercado/${idMercado}/produtos/acougue/suinos`);
  });

  it('Adiciona um Oleo', async () => {
    await p
      .spec()
      .post(`${baseUrl}/mercado/${idOleo}/produtos/mercearia/oleos`)
      .withJson({
        nome: 'Oleo verde',
        valor: 10
      })
      .expectStatus(StatusCodes.OK);
  });

  it('GET nos Oleos', async () => {
    await p
      .spec()
      .get(`${baseUrl}/mercado/${idMercado}/produtos/mercearia/oleos`);
  });

  it('Deleta um Oleo por ID', async () => {
    await p
      .spec()
      .delete(
        `${baseUrl}/mercado/${idMercado}/produtos/mercearia/oleos/${idOleo}`
      )
      .expectStatus(StatusCodes.OK);
  });
});
