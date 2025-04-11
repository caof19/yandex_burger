import type {} from 'cypress'

const INGREDIENT = '[data-ingredient]';
const ASSEMBLY_ZONE = '[data-assambler]';
const CLOSE_MODAL_BTN = '[data-close-modal]';
const ORDER_BTN = '[data-order-btn]';

describe('Тестирование конструктора', () => {
    beforeEach(() => {

        cy.intercept('GET', '/api/ingredients', {fixture: 'ingredients.json'}).as('setIngredients');
        window.localStorage.setItem('accessToken', 'token');

        cy.visit('http://localhost:5173/')
    })

    it('Должен отображать главную страницу', () => {
        cy.contains('Булки').should('exist');
    })

    it('Должен добавить ингредиенты в конструктор', () => {
        cy.get(INGREDIENT).first().trigger('dragstart').as('bun');
        cy.get(ASSEMBLY_ZONE).trigger('drop').trigger('dragend').as('assembly_zone');

        cy.get('@bun').contains('1').should('exist');
        cy.get('@assembly_zone').contains('Краторная булка N-200i').should('exist');
    })

    it('Должен отобразить модальное окно ингредиента и закрыть его', () => {
        cy.get(INGREDIENT).first().click();

        cy.contains('Детали ингредиента').should('exist');

        cy.get(CLOSE_MODAL_BTN).click();

        cy.contains('Детали ингредиента').should('not.exist');
    })

    it('Должен создаться заказ и закрыться модальное окно', () => {
        cy.intercept('POST', '/api/orders', {fixture: 'suceesOrder.json'});
        cy.get(INGREDIENT).first().trigger('dragstart').as('bun');
        cy.get(ASSEMBLY_ZONE).trigger('drop').trigger('dragend').as('assembly_zone');

        cy.get(INGREDIENT).eq(3).trigger('dragstart').as('bun');
        cy.get(ASSEMBLY_ZONE).trigger('drop').trigger('dragend').as('assembly_zone');

        cy.get(ORDER_BTN).click();
        cy.contains('Ваш заказ начали готовить').should('exist');

        cy.get(CLOSE_MODAL_BTN).click();
        cy.contains('Ваш заказ начали готовить').should('not.exist');
    })
})