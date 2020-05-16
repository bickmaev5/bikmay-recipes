import { Form, Field } from 'react-final-form'
import { useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { request } from 'graphql-request';
import Router from 'next-translate/Router';
import Link from 'next-translate/Link';

const API = "https://bikmay-recipes.herokuapp.com/v1/graphql";

const mutation = `
    mutation insert_single_recipe($object: recipes_insert_input!) {
        insert_recipes_one(object: $object) {
            imageUrl
            ingredients
            instruction
            name
            reciepeUrl
        }
    }
`;

function Add () {

    const onSubmit = useCallback( async (values: RecipeInterface) => {
        const variables = { object: values};
        await request(API, mutation, variables);
        Router.pushI18n('/');
    }, []);

    const { t } = useTranslation();

    return (
        <div>
            <Link href="/">
                <a>
                    {t('add:back')}
                </a>
            </Link>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>{t('add:name')}</label>
                            <Field name="name" component="input" placeholder={t('add:name')} />
                        </div>
                        <div>
                            <label>{t('add:ingredients')}</label>
                            <Field name="ingredients" component="textarea" placeholder={t('add:ingredients')} />
                        </div>
                        <div>
                            <label>{t('add:instruction')}</label>
                            <Field name="instruction" component="textarea" placeholder={t('add:instruction')} />
                        </div>
                        <div>
                            <label>{t('add:imageUrl')}</label>
                            <Field name="imageUrl" component="input" placeholder={t('add:imageUrl')} />
                        </div>
                        <div>
                            <label>{t('add:instructionUrl')}</label>
                            <Field name="reciepeUrl" component="input" placeholder={t('add:instructionUrl')} />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                )}
            />
        </div>
    )
};

export default Add;
