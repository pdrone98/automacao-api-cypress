///<reference types="cypress"/> 


const payload_reserva = require("../fixtures/reserva.json");
const reserva_alterada = require("../fixtures/reserva-alterada.json");


//FUNCIONALIDADE
describe("Alterar Reserva", () => {

    var tokenAut;
    var id_reserva_criada;

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

    //CENÁRIO
    it("Alterar reserva com sucesso", () => {
        cy.alterarReserva(id_reserva_criada, tokenAut, reserva_alterada)
            .then((respostaAlterada) => {
                //VALIDAR SE OS CAMPOS FORAM ALTERADOS 
                expect(respostaAlterada.status).to.equal(200);
                expect(respostaAlterada.body.firstname).to.equal(reserva_alterada.firstname);
                expect(respostaAlterada.body.lastname).to.equal(reserva_alterada.lastname);
                expect(respostaAlterada.body.totalprice).to.equal(reserva_alterada.totalprice);
                expect(respostaAlterada.body.totalprice).to.equal(reserva_alterada.totalprice);
                expect(respostaAlterada.body.depositpaid).to.equal(reserva_alterada.depositpaid);
                expect(respostaAlterada.body.bookingdates.checkin).to.equal(reserva_alterada.bookingdates.checkin);
                expect(respostaAlterada.body.bookingdates.checkout).to.equal(reserva_alterada.bookingdates.checkout);
                expect(respostaAlterada.body.additionalneeds).to.equal(reserva_alterada.additionalneeds);
            });

    });

});