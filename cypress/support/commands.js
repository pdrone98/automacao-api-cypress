// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
    cy.request({
        method: "POST",
        url: "/auth",
        body: {
            username: "admin",
            password: "password123"
        }
    });
});

Cypress.Commands.add('alterarReserva', (id_reserva_criada, tokenAut, reserva_alterada, options = {}) => {
    cy.request({
        method: "PUT",
        url: `/booking/${id_reserva_criada}`,
        headers: {
            Cookie: `token=${tokenAut}`
        },
        body: reserva_alterada,
        ...options    /// O spread operator torna o comando flexível e reutilizável,
    });               /// permitindo passar opções adicionais para a requisição PUT conforme necessário.
});

Cypress.Commands.add('cadastrarReserva', (payload_reserva) => {
    cy.request({
        method: "POST",
        url: "/booking",
        body: payload_reserva
    });
});

Cypress.Commands.add('deletarReserva', (idReserva, tokenAut) => {
    cy.request({
        method: "DELETE",
        url: `/booking/${idReserva}`,
        headers: {
            Cookie: `token=${tokenAut}`
        },
        failOnStatusCode: false
    });
});

Cypress.Commands.add('buscarReserva', (idReserva, options = {}) => {
    cy.request({
        method: "GET",
        url: `/booking/${idReserva}`,
        ...options     /// O spread operator torna o comando flexível e reutilizável, 
    });                /// permitindo passar opções adicionais para a requisição GET conforme necessário.
});