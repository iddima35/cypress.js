import * as data from "../helpers/pok_data.json"
describe('Покупка аватара', function () {                                // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
         cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
         cy.get('input[type="email"]').type(data.login);                   // вводим логин
         cy.get('input[type="password"]').type(data.password);               // вводим пароль
         cy.get('button[type="submit"]').click();                        // нажимаем кнопку Войти
         cy.wait(2000);
         cy.get('.header__container > .header__id').click({ force: true }); // Клик в шапке на аву тренера
         cy.wait(4000);
         cy.get('[href="/shop"]').click();                               // нажимаем кнопку Смена аватара
         cy.wait(2000);
         cy.get('.available > button').first().click({ force: true });   // кликаем Купить у первого доступного аватара
         cy.wait(1000);
         cy.get('.credit').type('5555555544444442');                     // вводим номер карты
         cy.get('.k_input_ccv').type('125');                             // вводим CVV карты
         cy.get('.k_input_date').type('1226');                           // вводим срок действия карты
         cy.get('.k_input_name').type('Dmitry');                           // вводим имя владельца действия карты
         cy.get('.pay-btn').click();                                     // нажимаем кнопку Оплатить
         cy.wait(1000);
         cy.get('#cardnumber').type('56456');                            // вводим код подтверждения СМС
         cy.get('.payment__submit-button').click();                      // нажимаем кнопку Отправить
         cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения о успешной покупке
     });
 });