///<reference types="cypress"/> 


const payload_reserva = require("../fixtures/reserva.json")

describe("Cadastrar Reserva", () => {

    it("Cadastrar reserva com sucesso", () => {

        cy.cadastrarReserva(payload_reserva)
        .then((resposta) =>{ //validações
            expect(resposta.status).to.equal(200);
            expect(resposta.body.bookingid).not.NaN; //verifica se o retorno do Id é um número
            expect(resposta.body.bookingid).is.greaterThan(0);
            expect(resposta.body.booking.firstname).to.equal(payload_reserva.firstname);
            expect(resposta.body.booking.lastname).to.equal(payload_reserva.lastname);
            expect(resposta.body.booking.totalprice).to.equal(payload_reserva.totalprice);
        });

    });

    it("Cadastrar reserva aleatória com sucesso", () => {

        cy.cadastrarReservaAleatoria().then((resposta) =>{ //validações
            
            expect(resposta.status).to.equal(200);
            expect(resposta.body.bookingid).not.NaN; //verifica se o retorno do Id é um número
            expect(resposta.body.bookingid).is.greaterThan(0);
            expect(resposta.body.booking).to.have.property("firstname");
            expect(resposta.body.booking).to.have.property("lastname");
            expect(resposta.body.booking).to.have.property("totalprice");
            expect(resposta.body.booking).to.have.property("depositpaid");
            expect(resposta.body.booking).to.have.property("bookingdates");
            expect(resposta.body.booking.bookingdates).to.have.property("checkin");
            expect(resposta.body.booking.bookingdates).to.have.property("checkout");

        });

    });

});