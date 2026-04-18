import { useQuery } from '@tanstack/react-query';
import { client } from '@/api';
import { END_POINT } from '@/api/END_POINT';
import { SalaryLevelListRes } from './type';

export const getSalaryLevelList = async (): Promise<SalaryLevelListRes> => {
  const { data } = await client.get(END_POINT.SALARY_LEVEL_LIST);
  return data;
};

export const useGetSalaryLevelListQuery = () => {
  return useQuery({
    queryKey: [END_POINT.SALARY_LEVEL_LIST],
    queryFn: () => getSalaryLevelList(),
  });
};
