import React from 'react';
import useSWR from 'swr';
import { request } from 'graphql-request';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next-translate/Link';


const API = "https://bikmay-recipes.herokuapp.com/v1/graphql";
const fetcher = query => request(API, query);

type Data = {
    recipes: RecipeInterface[]
}

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

    return (
        <div>
            <p>{t('home:title')}</p>
            <Link href="/add" lang={lang}>{t('home:add')}</Link>
            <br/>
            <Link href="/" lang={lang === 'en' ? 'ru' : 'en'}>{lang !== 'en' ? 'Английский' : 'Russian'}</Link>
            <div>
                {!data ? (
                    <p>{t('common:loading')}</p>
                ) : (
                    <>
                        {data.recipes.map((recipe: RecipeInterface) => (
                            <>
                                <img src={recipe.imageUrl} />
                                <div>{recipe.name}</div>
                            </>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
};

export default Home;
