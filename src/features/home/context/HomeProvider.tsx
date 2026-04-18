import { useGetEducationLevelListQuery } from '@/api/educationLevelList';
import { EducationLevel } from '@/api/educationLevelList/type';
import { useGetJobListQuery } from '@/api/jobs';
import { Job, JobFilter } from '@/api/jobs/type';
import { useGetSalaryLevelListQuery } from '@/api/salaryLevelList';
import { SalaryLevel } from '@/api/salaryLevelList/type';
import { useDevice } from '@/context/DeviceProvider';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const PER_PAGE = 6;
const PER_PAGE_MOBILE = 4;

type HomeContextValue = {
  page: number;
  setPage: (page: number) => void;
  perPage: number;
  jobFilter: JobFilter;
  setJobFilter: (jobFilter: JobFilter) => void;
  totalPage: number;
  jobList: Job[];
  isFetchingJobList: boolean;
  refetchJobList: () => void;
  educationOptions: EducationLevel[];
  salaryOptions: SalaryLevel[];
};

const HomeContext = createContext<HomeContextValue | null>(null);

type HomeProviderProps = {
  children: ReactNode;
};

export function HomeProvider({ children }: HomeProviderProps) {
  const { isMobile } = useDevice();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const perPage = useMemo(
    () => (isMobile ? PER_PAGE_MOBILE : PER_PAGE),
    [isMobile],
  );
  const [jobFilter, setJobFilter] = useState<JobFilter>({});
  const {
    data: dataJobList,
    isFetching: isFetchingJobList,
    refetch: refetchJobList,
  } = useGetJobListQuery({
    pre_page: perPage,
    page,
    ...jobFilter,
  });
  const { data: dataEducationLevelList } = useGetEducationLevelListQuery();
  const { data: dataSalaryLevelList } = useGetSalaryLevelListQuery();

  /**
   * 預處理 filter 參數
   */
  const formatJobFilter = (jobFilter: JobFilter) => {
    const { company_name, education_level, salary_level } = jobFilter;
    const newFilter: JobFilter = {
      ...(company_name && company_name !== '' ? { company_name } : {}),
      ...(typeof education_level === 'number' && education_level !== 0
        ? { education_level }
        : {}),
      ...(typeof salary_level === 'number' && salary_level !== 0
        ? { salary_level }
        : {}),
    };
    setJobFilter(newFilter);
  };

  useEffect(() => {
    if (typeof dataJobList?.total === 'number') {
      setTotalPage(Math.ceil(dataJobList.total / perPage));
    }
  }, [dataJobList?.total, perPage]);

  return (
    <HomeContext.Provider
      value={{
        page,
        setPage,
        perPage,
        jobFilter,
        setJobFilter: formatJobFilter,
        totalPage,
        jobList: dataJobList?.data ?? [],
        isFetchingJobList,
        refetchJobList,
        educationOptions: dataEducationLevelList ?? [],
        salaryOptions: dataSalaryLevelList ?? [],
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export function useHome() {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error('useHome must be used within HomeProvider');
  }

  return context;
}
