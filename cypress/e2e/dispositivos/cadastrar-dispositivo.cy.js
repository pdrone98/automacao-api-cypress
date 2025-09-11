///<reference types="cypress"/> 

describe("Cadastrar dispositivo", () => {

    it("Cadastrar dispositivo com sucesso", () => {

        cy.request({
            method: "POST",
            url: "https://api.restful-api.dev/objects",
            body:{
                "name": "Pc Gabriel",
                "data": {
                    "year": 2025,
                    "price": 8999.99,
                    "CPU model": "Intel Core i7",
                    "Hard disk size": "2 TB"
                }
            }
        }).then((resultado) => {

            //espera que o status seja 200
            expect(resultado.status).to.eq(200);

            //espera que o body da resposta tenha as propriedades... (TESTE DE CONTRATO)
            expect(resultado.body).to.have.property("id");
            expect(resultado.body).to.have.property("name");
            expect(resultado.body).to.have.property("data");
            expect(resultado.body).to.have.property("createdAt");
            expect(resultado.body.data).to.have.property("year");
            expect(resultado.body.data).to.have.property("price");
            expect(resultado.body.data).to.have.property("CPU model");
            expect(resultado.body.data).to.have.property("Hard disk size");

        });

    });

});