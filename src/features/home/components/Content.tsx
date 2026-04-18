import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import TableJobCard from './TableJobCard';
import { useHome } from '../context/HomeProvider';
import { useEffect, useState } from 'react';
import { JobFilter } from '@/api/jobs/type';
import { composeMobileClass } from '@/utils';
import { useDevice } from '@/context/DeviceProvider';

const Content = () => {
  const { isMobile } = useDevice();
  const { setPage, educationOptions, salaryOptions, setJobFilter } = useHome();
  /**
   * 暫存搜尋條件，等點擊搜尋按鈕時，再更新 jobFilter
   * 透過 params 更新來觸發 refetch
   * 避免每次輸入文字就觸發 refetchJobList，導致每次搜尋都從第一頁開始
   */
  const [formFilter, setFormFilter] = useState<JobFilter>({});

  const handleChangeCompanyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFilter({ ...formFilter, company_name: e.target.value });
  };

  const handleChangeEducationLevel = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormFilter({
      ...formFilter,
      education_level: Number(e.target.value),
    });
  };

  const handleChangeSalaryLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFilter({
      ...formFilter,
      salary_level: Number(e.target.value),
    });
  };

  const handleSearch = () => {
    setPage(1);
    setJobFilter(formFilter);
  };

  useEffect(() => {
    if (!isMobile) return;
    setFormFilter({});
    setPage(1);
    setJobFilter({});
  }, [isMobile, setJobFilter, setPage]);

  return (
    <Box className={composeMobileClass('home-content', isMobile)}>
      <Stack spacing={isMobile ? 1.5 : 2.5} className="items-stretch">
        {/* 標題 */}
        <Stack direction="row" spacing={1.5} className="items-center">
          <Box className="home-content-title-icon" />
          <Box className={composeMobileClass('home-content-title', isMobile)}>
            適合前端工程師的好工作
          </Box>
        </Stack>
        {/* 篩選條件 */}
        {!isMobile && (
          <Stack direction="row" spacing={2.25} className="items-center">
            <TextField
              label="公司名稱"
              placeholder="請輸入公司名稱"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{ width: `${(647 / 1336) * 100}%` }}
              value={formFilter.company_name ?? ''}
              onChange={handleChangeCompanyName}
            />

            <TextField
              label="教育程度"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              select
              sx={{ width: `${(263.5 / 1336) * 100}%` }}
              defaultValue={0}
              value={formFilter.education_level ?? 0}
              onChange={handleChangeEducationLevel}
            >
              <MenuItem value={0}>不限</MenuItem>
              {educationOptions.map((education) => (
                <MenuItem key={education.id} value={education.id}>
                  {education.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="薪水範圍"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              select
              sx={{ width: `${(263.5 / 1336) * 100}%` }}
              defaultValue={0}
              value={formFilter.salary_level ?? 0}
              onChange={handleChangeSalaryLevel}
            >
              <MenuItem value={0}>不限</MenuItem>
              {salaryOptions.map((salary) => (
                <MenuItem key={salary.id} value={salary.id}>
                  {salary.label}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="contained"
              color="gray700"
              className="home-content-search-btn"
              sx={{
                width: `${(108 / 1336) * 100}%`,
              }}
              onClick={handleSearch}
            >
              條件搜尋
            </Button>
          </Stack>
        )}
        {/* 卡片 Table */}
        <TableJobCard />
      </Stack>
    </Box>
  );
};

export default Content;
