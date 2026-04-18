import { useQuery } from '@tanstack/react-query';
import { client } from '@/api';
import { END_POINT } from '@/api/END_POINT';
import { JobDetail, JobListReq, JobListRes } from './type';

export const getJobList = async (params: JobListReq): Promise<JobListRes> => {
  const { data } = await client.get(END_POINT.JOBS, { params });
  return data;
};

export const useGetJobListQuery = (params: JobListReq) => {
  return useQuery({
    queryKey: [END_POINT.JOBS, 'list', params],
    queryFn: () => getJobList(params),
  });
};

export const getJob = async (id: string): Promise<JobDetail> => {
  const { data } = await client.get(`${END_POINT.JOBS}/${id}`);
  return data;
};
export const useGetJobQuery = (id: string, options: { enabled: boolean }) => {
  return useQuery({
    queryKey: [END_POINT.JOBS, id],
    queryFn: () => getJob(id),
    ...options,
  });
};
