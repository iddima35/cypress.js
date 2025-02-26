import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as resilt_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {cy.visit('/'); // зайти на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // проверить цвет кнопки восст. пароль
    });

    afterEach('Конец теста', function () {
        cy.get(resilt_page.close).should('be.visible');// есть крестик и он виден пользователю
    });

    it('1.Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login); // ввести верный логин
         cy.get(main_page.password).type(data.password); // ввести верный пароль
         cy.get(main_page.login_button).click(); // нажать на кнопку войти

         cy.wait(1000); 

         cy.get(resilt_page.title).contains('Авторизация прошла успешно'); // проверить что после авторизации вижу текст
         cy.get(resilt_page.title).should('be.visible'); // текст виден пользователю
    })

    it('2.Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // нажать забыли пароль

        cy.wait(1000); 

        cy.get(recovery_password_page.email).type(data.login); // ввести любой имейл
        cy.get(recovery_password_page.send_button).click(); // нажать отправить код

        cy.get(resilt_page.title).contains('Успешно отправили пароль на e-mail'); // проверить что после отправки кода вижу текст
        cy.get(resilt_page.title).should('be.visible'); // текст виден пользователю
    })
       
    it('3.Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // ввести верный логин
        cy.get(main_page.password).type('iLoveqastudio11'); // ввести неверный пароль
        cy.get(main_page.login_button).click(); // нажать на кнопку войти

        cy.wait(1000); 

        cy.get(resilt_page.title).contains('Такого логина или пароля нет'); // проверить что после попытки авторизации вижу текст
        cy.get(resilt_page.title).should('be.visible'); // текст виден пользователю
    })

    it('4.Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('german@olnikov.ru'); // ввести неверный логин
        cy.get(main_page.password).type(data.password); // ввести верный пароль
        cy.get(main_page.login_button).click(); // нажать на кнопку войти

        cy.wait(1000); 

        cy.get(resilt_page.title).contains('Такого логина или пароля нет'); // проверить что после попытки авторизации вижу текст
        cy.get(resilt_page.title).should('be.visible'); // текст виден пользователю
    })

    it('5.Логин без @ и верный пароль', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // ввести логин без @
        cy.get(main_page.password).type(data.password); // ввести верный пароль
        cy.get(main_page.login_button).click(); // нажать на кнопку войти

        cy.wait(1000); 

        cy.get(resilt_page.title).contains('Нужно исправить проблему валидации'); // проверить что после попытки авторизации вижу текст с ошибкой
        cy.get(resilt_page.title).should('be.visible'); // текст виден пользователю
    })

    it('6.Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // ввести логин в разном регистре
        cy.get(main_page.password).type(data.password); // ввести верный пароль
        cy.get(main_page.login_button).click(); // нажать на кнопку войти

        cy.wait(1000); 

        cy.get(resilt_page.title).contains('Авторизация прошла успешно'); // проверить что после авторизации вижу текст
        cy.get(resilt_page.title).should('be.visible'); // текст виден пользователю
    })
})
