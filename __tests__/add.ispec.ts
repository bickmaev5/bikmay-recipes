import { querySelector } from '../test/selenium/helpers';
const {
    Builder,
} = require('selenium-webdriver');

type Field = {
    id: string,
    value: string
}

const basicAdd = async ({
    driver,
    fields,
}: { driver: any, fields: Field[]}) => {
    const addLink = await querySelector('[data-testid="to-add"]', driver);
    await addLink.click();

    fields.forEach(async (field: Field) => {
        const textBox = await querySelector(`#${field.id}`, driver, 1000);
        await textBox.click();
        await textBox.sendKeys(field.value);
        const value = await textBox.getAttribute("value");
        expect(value).toEqual(field.value);
    });

    const submitButton = await querySelector(
        'button[type="submit"]',
        driver
    );

    await driver.executeScript('arguments[0].click();', submitButton);
}
let driver;

beforeEach((done) => {
    driver = new Builder().forBrowser(process.env.REACT_APP_INTEGRATION_BROWSER).build();

    driver.get(process.env.REACT_APP_INTEGRATION_BASE_URL).then(done);

    driver.manage().window().maximize();
});

afterEach((done) => {
    driver.quit().then(done);
});

describe('Recipe Add tests', () => {
    it('should render required field error',
        async () => {
            const fields = [
                {
                    id: "add_name",
                    value: "New recipe"
                },
                {
                    id: "add_ingredients",
                    value: "Ingregients"
                },
                {
                    id: "add_instruction",
                    value: "instructions"
                }
            ]
            await basicAdd({
                driver,
                fields,
            });

            const alertText = await querySelector(
                '.ant-form-item-explain div',
                driver
            );

            const result = await alertText.getText();
            expect(result).toEqual("Поле обязательно к заполнению!");
        });
});
