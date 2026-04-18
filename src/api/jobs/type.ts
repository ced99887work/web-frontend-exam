export type Job = {
  id: string;
  /** 公司名稱 */
  companyName: string;
  /** 職稱 */
  jobTitle: string;
  /** 教育程度 id */
  educationId: number;
  /** 薪資範圍 id */
  salaryId: number;
  /** 簡介 */
  preview: string;
};

export type JobFilter = {
  /** 公司名稱 */
  company_name?: string;
  /** 教育程度 id */
  education_level?: number;
  /** 薪資範圍 id */
  salary_level?: number;
};

export type JobListReq = {
  /** 每頁顯示筆數 */
  pre_page: number;
  /** 指定頁面頁數 */
  page: number;
} & JobFilter;

export type JobListRes = {
  data: Job[];
  /** 總筆數 */
  total: number;
};

export type JobDetail = {
  id: string;
  description: string;
  companyPhoto: string[];
  jobTitle: string;
  companyName: string;
};
