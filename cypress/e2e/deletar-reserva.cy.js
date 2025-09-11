///<reference types="cypress"/> 


const payload_reserva = require("../fixtures/reserva.json")


describe("Deletar Reserva", () => {
    
    var id_inexistente = 99999;
    var id_reserva_criada;
    var tokenAut;

    //ANTES DE CADA TESTE: FAZER O LOGIN E ARMAZENAR O TOKEN
    beforeEach(() => {
        cy.login()
            .then((login) => {
                tokenAut = login.body.token;
            });
    });

    //ANTES DE CADA TESTE: CRIAR UMA RESERVA
    beforeEach(() => {
        cy.cadastrarReservaAleatoria().then((resposta) => {
            expect(resposta.status).to.equal(200);
            id_reserva_criada = resposta.body.bookingid;
        })
    });


    it("Deletar reserva com sucesso", () => {

        cy.deletarReserva(id_reserva_criada, tokenAut)
            .then((resposta) => { //validações
                expect(resposta.status).to.equal(201);
                expect(resposta.statusText).to.equal("Created");
            });

    });


    it("Deletar reserva inexistente", () => {

        cy.request({
            method: "DELETE",
            url: `/booking/${id_inexistente}`,
            headers: {
                Cookie: `token=${tokenAut}`
            },
            failOnStatusCode: false
        }).then((resposta) => { //validações
            expect(resposta.status).to.equal(405);
            expect(resposta.statusText).to.equal("Method Not Allowed");
        });

    });

});