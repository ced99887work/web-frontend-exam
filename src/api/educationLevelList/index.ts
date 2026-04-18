import { useQuery } from '@tanstack/react-query';
import { client } from '@/api';
import { END_POINT } from '@/api/END_POINT';
import { EducationLevelListRes } from './type';

export const getEducationLevelList =
  async (): Promise<EducationLevelListRes> => {
    const { data } = await client.get(END_POINT.EDUCATION_LEVEL_LIST);
    return data;
  };

export const useGetEducationLevelListQuery = () => {
  return useQuery({
    queryKey: [END_POINT.EDUCATION_LEVEL_LIST],
    queryFn: () => getEducationLevelList(),
  });
};
