import { useQuery } from '@tanstack/react-query';
import { globalAverage } from '../api/dashboard';

export const useGlobalAverage = () => {
    return useQuery({
        queryKey: ['global-average'],
        queryFn: globalAverage,
    });
};
