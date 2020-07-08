import React from 'react';
import { Card, Skeleton } from 'antd';
import Link from 'next-translate/Link';

import {
    StyledImage,
} from './styles';

interface RecipeCardProps {
    isLoading: boolean,
    item: RecipeInterface
}

const RecipeCard: React.FunctionComponent<RecipeCardProps> = ({ isLoading, item }) => {

    return (
        <Link href="/recipe/[id]" as={`/recipe/${item.id}`}>
            <a>
                <Card
                    key={item.id}
                    cover={!isLoading ? (<StyledImage src={item.imageUrl} />)
                        : <div style={{width: '100%', height: '200px', backgroundColor: '#d8d8d8'}}></div>}
                    hoverable
                >
                    <Skeleton
                        loading={isLoading}
                        active
                        paragraph={false}
                    >
                        <Card.Meta title={item.name} />
                    </Skeleton>
                </Card>
            </a>
        </Link>
    )
}

export default RecipeCard;
