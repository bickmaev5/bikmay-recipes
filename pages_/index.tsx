import React from 'react';
import useSWR from 'swr';
import { request } from 'graphql-request';
import useTranslation from 'next-translate/useTranslation';
import { Layout, Typography, List } from 'antd';

const { Content } = Layout;

import dynamic from 'next/dynamic';

// import Nav from 'components/Nav';

const Nav = dynamic(() => import('components/Nav'));
const RecipeCard = dynamic(() => import('components/RecipeCard'));



const API = "https://bikmay-recipes.herokuapp.com/v1/graphql";
const fetcher = query => request(API, query);

type Data = {
    recipes: RecipeInterface[]
}

const skeletonData = [
    {
        id: 1,
        name: 'name',
        imageUrl: 'imageUrl',
    },
    {
        id: 2,
        name: 'name',
        imageUrl: 'imageUrl',
    },
    {
        id: 3,
        name: 'name',
        imageUrl: 'imageUrl',
    },
]

function Home () {
    const { data, error } = useSWR<any>(`
        {
            recipes(order_by: {created_at: desc}) {
                id
                name
                imageUrl
            }
        }
    `, fetcher);

    const { t, lang } = useTranslation();

    const isLoading = !data && !error;

    return (
        <Layout className="layout">
            <Nav/>
            <Content style={{ padding: '0 50px 50px' }}>
                <Typography.Title style={{ textAlign: 'center'}}>
                    {t('home:title')}
                </Typography.Title>
                    <>
                        <List
                            itemLayout="vertical"
                            size="default"
                            dataSource={data && data.recipes ? data.recipes : skeletonData}
                            renderItem={(item: RecipeInterface) => (
                                <List.Item key={item.id}>
                                    <RecipeCard isLoading={isLoading} item={item} />
                                </List.Item>
                            )}
                        />
                    </>
            </Content>
        </Layout>
    )
};

export default Home;
