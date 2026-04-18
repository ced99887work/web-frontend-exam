import { useReducer } from 'react';
import { Box, Stack } from '@mui/material';
import { Job } from '@/api/jobs/type';
import { useHome } from '../context/HomeProvider';
import { useDevice } from '@/context/DeviceProvider';
import { composeMobileClass } from '@/utils';
import DetailDialog from './DetailDialog';

type Props = {
  job: Job;
};
const JobCard = ({ job }: Props) => {
  const { isMobile } = useDevice();
  const { educationOptions, salaryOptions } = useHome();
  const [isOpened, trigger] = useReducer((state: boolean) => !state, false);

  const handleDetail = () => {
    trigger();
  };

  return (
    <Box className={composeMobileClass('custom-card', isMobile)}>
      <Stack spacing={1.25}>
        {/* 標題 */}
        <Box className={composeMobileClass('custom-card-title', isMobile)}>
          {job.companyName}
        </Box>
        <Stack spacing={1}>
          {/* 職位 */}
          <Stack direction="row" spacing={0.75} className="items-center">
            <Box className="custom-card-icon person-outline" />
            <Box className="custom-card-description">{job.jobTitle}</Box>
          </Stack>
          {/* 學歷 */}
          <Stack direction="row" spacing={0.75} className="items-center">
            <Box className="custom-card-icon book-outline" />
            <Box className="custom-card-description">
              {educationOptions.find(
                (education) => education.id === job.educationId.toString(),
              )?.label ?? '-'}
            </Box>
          </Stack>
          {/* 薪水範圍 */}
          <Stack direction="row" spacing={0.75} className="items-center">
            <Box className="custom-card-icon bitcoin-outline" />
            <Box className="custom-card-description">
              {salaryOptions.find(
                (salary) => salary.id === job.salaryId.toString(),
              )?.label ?? '-'}
            </Box>
          </Stack>
        </Stack>
        {/* 內容 */}
        <Box className="custom-card-content">{job.preview}</Box>
        {/* 查看細節 */}
        <Box className="custom-card-detail-wrap">
          <Box className="custom-card-detail" onClick={handleDetail}>
            查看細節
          </Box>
        </Box>
      </Stack>

      <DetailDialog open={isOpened} onClose={trigger} jobId={job.id} />
    </Box>
  );
};

export default JobCard;
