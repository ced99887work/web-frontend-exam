import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  Stack,
  Box,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { useGetJobQuery } from '@/api/jobs';
import { useDevice } from '@/context/DeviceProvider';
import { composeMobileClass } from '@/utils';

type Props = {
  open: boolean;
  onClose: () => void;
  jobId: string;
};
const DetailDialog = ({ open, onClose, jobId }: Props) => {
  const { isMobile } = useDevice();
  const { data, isFetching } = useGetJobQuery(jobId, { enabled: open });

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog maxWidth="md" fullWidth open={open}>
      <DialogTitle className={composeMobileClass('dialog-title', isMobile)}>
        詳細資訊
      </DialogTitle>

      <Divider />

      <DialogContent className="dialog-content">
        {isFetching && (
          <Box className="flex items-center justify-center">
            <CircularProgress aria-label="Loading…" />
          </Box>
        )}
        {!isFetching && (
          <Stack spacing={isMobile ? 1.5 : 2.25}>
            {/* 內容標題 */}
            <Stack
              direction={isMobile ? 'column' : 'row'}
              spacing={isMobile ? 0.5 : 1}
              className={isMobile ? 'items-start' : 'items-center'}
            >
              <Box className={composeMobileClass('title', isMobile)}>
                {data?.companyName}
              </Box>
              <Box className={composeMobileClass('sub-title', isMobile)}>
                {data?.jobTitle}
              </Box>
            </Stack>
            {/* 輪播圖 */}
            <Swiper
              className="custom-card-swiper"
              modules={[Pagination, Autoplay]}
              spaceBetween={8} // 圖片間距
              slidesPerView="auto"
              centeredSlides={false} // 讓當前圖片居中
              loop={true} // 循環播放
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                bulletClass: 'custom-swiper-bullet',
                bulletActiveClass: 'custom-swiper-bullet-active',
              }}
            >
              {data?.companyPhoto.map((photo, index) => (
                <SwiperSlide key={index} className="w-fit!">
                  <img src={photo} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* 內容 */}
            <Stack spacing={1}>
              <Box className={composeMobileClass('content-title', isMobile)}>
                工作內容
              </Box>
              <Box
                className={composeMobileClass('content', isMobile)}
                dangerouslySetInnerHTML={{ __html: data?.description ?? '' }}
              />
            </Stack>
          </Stack>
        )}
      </DialogContent>

      <Divider />

      <DialogActions>
        <Box className="dialog-actions" onClick={handleClose}>
          關閉
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DetailDialog;
