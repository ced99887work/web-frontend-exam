import { useMemo } from 'react';
import { Box, Grid, Pagination, Skeleton, Stack } from '@mui/material';
import { useHome } from '../context/HomeProvider';
import JobCard from './JobCard';
import { useDevice } from '@/context/DeviceProvider';

const TableJobCard = () => {
  const { isMobile } = useDevice();
  const { page, setPage, totalPage, jobList, isFetchingJobList, perPage } =
    useHome();

  const gridSize = useMemo(() => {
    if (isMobile) {
      return {
        xs: 12,
      };
    }

    return {
      xs: 12,
      sm: 6,
      md: 4,
    };
  }, [isMobile]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (!isFetchingJobList && jobList.length === 0) {
    return <Box>沒有資料，請重設搜尋條件。</Box>;
  }

  return (
    <Stack spacing={isMobile ? 1.25 : 1.5}>
      {/* 卡片列表 */}
      <Grid container spacing={isMobile ? 1.25 : 2.25}>
        {!isFetchingJobList &&
          jobList.map((job) => (
            <Grid size={gridSize} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))}
        {isFetchingJobList &&
          Array.from({ length: perPage }).map((_, index) => (
            <Grid size={gridSize} key={index}>
              <Box className="custom-card-skeleton">
                <Stack spacing={1.25}>
                  <Skeleton variant="rectangular" height="30px" />
                  <Skeleton variant="text" width="30%" />
                  <Skeleton variant="text" width="30%" />
                  <Skeleton variant="text" width="50%" />
                  <Skeleton variant="rectangular" height="35px" />
                </Stack>
              </Box>
            </Grid>
          ))}
      </Grid>
      {/* 分頁 */}
      {totalPage > 0 && (
        <Box className="flex justify-center">
          <Pagination
            count={totalPage}
            page={page}
            onChange={handleChange}
            disabled={isFetchingJobList}
            siblingCount={3}
          />
        </Box>
      )}
    </Stack>
  );
};

export default TableJobCard;
