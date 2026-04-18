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

type Props = {
  open: boolean;
  onClose: () => void;
  jobId: string;
};
const DetailDialog = ({ open, onClose, jobId }: Props) => {
  const { data, isFetching } = useGetJobQuery(jobId, { enabled: open });

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog maxWidth="md" fullWidth open={open}>
      <DialogTitle>詳細資訊</DialogTitle>

      <Divider />

      <DialogContent className="dialog-content">
        {isFetching && (
          <Box className="flex items-center justify-center">
            <CircularProgress aria-label="Loading…" />
          </Box>
        )}
        {!isFetching && (
          <Stack spacing={1}>
            {/* 內容標題 */}
            <Stack direction="row" spacing={1} className="items-center">
              <Box className="title">{data?.companyName}</Box>
              <Box className="sub-title">{data?.jobTitle}</Box>
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
              <Box className="content-title">工作內容</Box>
              <Box
                className="content"
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
