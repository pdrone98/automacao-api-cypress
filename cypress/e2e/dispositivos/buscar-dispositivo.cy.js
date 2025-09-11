//pra poder usar o cy.
/// <reference types="cypress"/> 

// funcionalidade
describe("Buscar dispositivo", () => {

    //cenario de teste
    it("Buscar dispositivo existente", () => {

        //request
        cy.request({
            method: 'GET',
            url: "https://api.restful-api.dev/objects/3",
        }).then((resultado) => {
            //quando resultado acontecer
            
            //espera que o status seja 200
            expect(resultado.status).to.eq(200);

            //espera que o body tenha as propriedades (TESTE DE CONTRATO)
            expect(resultado.body).to.have.property("id");
            expect(resultado.body).to.have.property("name"); 
            expect(resultado.body).to.have.property("data");
            expect(resultado.body.data).to.have.property("color");
            expect(resultado.body.data).to.have.property("capacity GB");

            //espera que as propriedades sejam iguais ao resultado obtido
            expect(resultado.body.id).to.eq("3");
            expect(resultado.body.name).to.eq("Apple iPhone 12 Pro Max");
            expect(resultado.body.data.color).to.eq("Cloudy White");
            expect(resultado.body.data["capacity GB"]).to.eq(512); //necessário utilizar chaves pois a propriedade contém espaço no nome

        });
    });


    //cenario de teste
    it("Buscar dispositivo inexistente", () => {

        //request
        cy.request({
            method: 'GET',
            url: "https://api.restful-api.dev/objects/naoex",
            failOnStatusCode: false,
        }).then((resposta) => {
            //quando a resposta acontecer
            expect(resposta.status).to.eq(404); //espero que o status seja 404
            expect(resposta.body.error).to.eq("Oject with id=naoex was not found.");//pegar o resultado do body fazendo o request no postman
            
        });
    });

});
