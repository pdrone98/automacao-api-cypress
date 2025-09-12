import { gerarReservaAleatoria } from '../../support/utils/reserva-funcoes.js';
///<reference types="cypress"/>

describe("Buscar Reserva", () => {
    let idReserva;
    let token;

    //ANTES DE CADA TESTE: FAZER O LOGIN, ARMAZENAR O TOKEN e CRIAR UMA RESERVA
    beforeEach(() => {
        cy.login().then((login) => {
            token = login.body.token;
        });
        const reserva = gerarReservaAleatoria();
        cy.cadastrarReserva(reserva).then((resposta) => {
            idReserva = resposta.body.bookingid;
        });
    });

    //CENÁRIOS
    it("Buscar uma reserva com sucesso", () => {
        cy.buscarReserva(idReserva).then((resposta) => {
            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('firstname');
            expect(resposta.body).to.have.property('lastname');
            expect(resposta.body).to.have.property('bookingdates');
        });
    });

    it("Buscar reserva inexistente", () => {
        cy.buscarReserva(99999, { failOnStatusCode: false }).then((resposta) => {
            expect(resposta.status).to.equal(404);
        });
    });
});
