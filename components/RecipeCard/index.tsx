import { Card, Skeleton } from 'antd';

interface RecipeCardProps {
    isLoading: boolean,
    item: RecipeInterface
}

const RecipeCard: React.FunctionComponent<RecipeCardProps> = ({ isLoading, item }) => {

    return (
        <Card
            key={item.id}
            cover={!isLoading ? (<img style={{maxHeight: '200px', objectFit: 'cover'}} src={item.imageUrl} />)
                : <div style={{width: '100%', height: '200px', backgroundColor: '#d8d8d8'}}></div>}
            hoverable
        >
            <Skeleton
                loading={isLoading}
                active
            >
                <Card.Meta title={item.name} />
            </Skeleton>
        </Card>
    )
}

export default RecipeCard;
