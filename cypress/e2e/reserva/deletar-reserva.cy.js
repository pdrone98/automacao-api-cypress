import { gerarReservaAleatoria } from '../../support/utils/reserva-funcoes.js';
///<reference types="cypress"/> 

describe("Deletar Reserva", () => {
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

    it("Deletar reserva com sucesso", () => {
        cy.deletarReserva(idReserva, token).then((resposta) => {
            expect(resposta.status).to.equal(201);
            expect(resposta.statusText).to.equal("Created");
        });
    });

    it("Deletar reserva inexistente", () => {
        cy.deletarReserva(99999, token).then((resposta) => {
            expect(resposta.status).to.equal(405);
            expect(resposta.statusText).to.equal("Method Not Allowed");
        });
    });
});