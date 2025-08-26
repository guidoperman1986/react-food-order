import { useMemo } from 'react';
import { useHttp } from '../hooks/useHttp';
import { MealItem } from './MealItem';
import { Error } from "./Error";

export const Meals = () => {
    const config = useMemo(() => ({
        method: 'GET'
    }), []);

    const { data: loadedMeals, error, isLoading, sendRequest } = useHttp('https://nest-food-order-backend.onrender.com/meals', config);

    if (isLoading) {
        return <p className='center'>Loading meals...</p>;
    }

    if (error) {
        return <Error title="Error loading meals" message={error} />;
    }

    return <ul id="meals">
        {loadedMeals.map(meal => (
            <MealItem key={meal.id} meal={meal} />
        ))}
    </ul>;

}
