
// eslint-disable-next-line import/no-extraneous-dependencies
const { By, until } = require('selenium-webdriver');

const waitUntilTime = 20000;

/** Возвращает элементы по селектору
 *
 * @param {string} selector css-селектор
 * @param {WebDriver} driver Selenium Webdriver
 * @param {number} timeout время ожидания элемента
 *
 * @returns {(IThenable<T>|WebElementPromise)} promise
 */
export const querySelector = async (selector, driver, timeout?) => {
    const el = await driver.wait(
        until.elementLocated(By.css(selector)),
        timeout || waitUntilTime
    );
    return driver.wait(until.elementIsVisible(el), timeout || waitUntilTime);
};

/** Возвращает признак наличия элемнта
 *
 * @param {string} selector css-селектор
 * @param {WebDriver} driver Selenium Webdriver
 *
 * @returns {boolean} true если найден иначе false
 */
export const isElementExists = async (selector, driver) => {
    const result = await driver.findElements(By.css(selector));

    return !!result.length;
};
