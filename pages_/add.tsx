import { useCallback, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { request } from 'graphql-request';
import Router from 'next-translate/Router';
import { Layout } from 'antd';
import { Form, Input, Button, PageHeader } from 'antd';

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

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const Add: React.FunctionComponent = () => {

    const [isLoading, setLoading] = useState<boolean>(false);

    const onSubmit = useCallback( async (values: RecipeInterface) => {
        setLoading(true);
        const variables = { object: values};
        await request(API, mutation, variables);
        setLoading(false);
        Router.pushI18n('/');
    }, []);

    const { t } = useTranslation();

    return (
        <Layout>
            <PageHeader
                onBack={() => Router.pushI18n('/')}
                title={t('add:title')}
            />
            <Layout.Content style={{padding: "0 20px 50px"}}>
                <Form
                    {...layout}
                    name="add"
                    onFinish={onSubmit}
                >
                    <Form.Item
                        label={t('add:name')}
                        name="name"
                        rules={[{ required: true, message: t('add:field-required') }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={t('add:ingredients')}
                        name="ingredients"
                        rules={[{ required: true, message: t('add:field-required') }]}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item
                        label={t('add:instruction')}
                        name="instruction"
                        rules={[{ required: true, message: t('add:field-required') }]}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item
                        label={t('add:imageUrl')}
                        name="imageUrl"
                        rules={[{ required: true, message: t('add:field-required') }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={t('add:instructionUrl')}
                        name="reciepeUrl"
                        rules={[{ required: true, message: t('add:field-required') }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button loading={isLoading} type="primary" htmlType="submit" size="large">
                            {t('add:title')}
                        </Button>
                    </Form.Item>
                </Form>
            </Layout.Content>
        </Layout>
    )
};

export default Add;
