import { useRouter } from 'next/router'; 
import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';
import request from 'graphql-request';
import { Layout, PageHeader, Typography, Skeleton, Divider, Button } from 'antd';
import Router from 'next-translate/Router';

const API = "https://bikmay-recipes.herokuapp.com/v1/graphql";
const fetcher = (query, id): Promise<DataType> => request(API, query, id);

const queryQL = `
    query GetRecipe($id: uuid) {
        recipes(where: {id: {_eq: $id}}) {
            name
            instruction
            ingredients
            imageUrl
            id
            reciepeUrl
        }
    }
`;

const mockedRecipe: RecipeInterface = {
    id: '1',
    name: '1',
    ingredients: '',
    instruction: '',
    reciepeUrl: '',
    imageUrl: '',
    created_at: '',
}

type DataType = {
    recipes: RecipeInterface[]
}

const Recipe: React.FunctionComponent = () => {
    const { query } = useRouter();
    const { data , error } = useSWR<DataType>([queryQL, query], fetcher);
    const recipe: RecipeInterface = data && data.recipes ? data.recipes[0] : mockedRecipe;

    const { t } = useTranslation();

    const isLoading = !data && !error;
    return (
        <Layout>
            <PageHeader
                onBack={() => Router.pushI18n('/')}
                title={t("add:back")}
            />
            <Layout.Content>
            <div className="site-layout-content">
                <Skeleton
                    loading={isLoading}
                    active
                    paragraph={false}   
                >
                    <Typography.Title>
                        {recipe.name}    
                    </Typography.Title>
                </Skeleton>
                {!isLoading ? (<img style={{width: '100%', objectFit: 'cover'}} src={recipe.imageUrl} />)
                        : <div style={{width: '100%', height: '400px', backgroundColor: '#d8d8d8'}}></div>}
                <Skeleton
                    loading={isLoading}
                    active
                >
                    <Divider>{t('add:ingredients')}</Divider>
                    <Typography.Paragraph>
                        {recipe.ingredients}
                    </Typography.Paragraph>
                </Skeleton>
                <Skeleton
                    loading={isLoading}
                    active
                    >
                    <Divider>{t('add:instruction')}</Divider>
                    <Typography.Paragraph>
                        {recipe.instruction}
                    </Typography.Paragraph>
                </Skeleton>
                {isLoading ? (
                    <Skeleton.Button
                        active={isLoading}
                        shape="square"
                    />
                ) : (
                    <Button type="primary">
                        <a href={recipe.reciepeUrl} target="_blank">
                            {t('add:instructionUrl')}
                        </a>
                    </Button>
                )}
            </div>
            </Layout.Content>
            <style jsx>{`
                .site-layout-content {
                    background: #fff;
                    margin: 24px;
                    padding: 15px;
                    min-height: 280px;
                  }
            `}</style>
        </Layout>
    )
};


export default Recipe;
