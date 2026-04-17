import { Factory, Model, Server } from 'miragejs';
import educationList from '../constants/educationList';
import jobList from '../constants/jobList';
import salaryList from '../constants/salaryList';

type JobItem = {
  id: string;
  companyName: string;
  jobTitle: string;
  educationId: number;
  salaryId: number;
  preview: string;
  companyPhoto: string[];
  description: string;
};

const filterFormat = (
  data: JobItem[],
  companyName?: string,
  educationLevel?: number,
  salaryLevel?: number,
) => {
  let result = data;

  if (companyName) {
    result = result.filter((item) => item.companyName.includes(companyName));
  }
  if (educationLevel) {
    result = result.filter((item) => item.educationId === educationLevel);
  }
  if (salaryLevel) {
    result = result.filter((item) => item.salaryId === salaryLevel);
  }

  return result;
};

export const initMockServer = () =>
  new Server({
    models: {
      jobList: Model,
      educationList: Model,
      salaryList: Model,
    },
    factories: {
      jobList: Factory.extend({
        companyName(i: number) {
          return jobList[i].companyName;
        },
        jobTitle(i: number) {
          return jobList[i].jobTitle;
        },
        educationId(i: number) {
          return jobList[i].educationId;
        },
        salaryId(i: number) {
          return jobList[i].salaryId;
        },
        preview(i: number) {
          return jobList[i].preview;
        },
        companyPhoto(i: number) {
          return jobList[i].companyPhoto;
        },
        description(i: number) {
          return jobList[i].description;
        },
      }),
      educationList: Factory.extend({
        id(i: number) {
          return educationList[i].id;
        },
        label(i: number) {
          return educationList[i].label;
        },
      }),
      salaryList: Factory.extend({
        id(i: number) {
          return salaryList[i].id;
        },
        label(i: number) {
          return salaryList[i].label;
        },
      }),
    },
    seeds(server: any) {
      server.createList('jobList', jobList.length);
      server.createList('educationList', educationList.length);
      server.createList('salaryList', salaryList.length);
    },
    routes() {
      this.namespace = 'api/v1';

      this.get('/jobs', (schema: any, request: any) => {
        const companyName = request.queryParams.company_name;
        const educationLevel = Number(request.queryParams.education_level);
        const salaryLevel = Number(request.queryParams.salary_level);

        const prePage = Number(request.queryParams.pre_page);
        const page = Number(request.queryParams.page);

        const data = (schema as any).jobLists
          .all()
          .models.map(
            ({ attrs: { companyPhoto, description, ...rest } }: any) => rest,
          );

        if (!Number.isNaN(prePage) && !Number.isNaN(page)) {
          const startIndex = (page - 1) * prePage;
          const endIndex = startIndex + prePage;
          const filterData = filterFormat(
            data,
            companyName,
            educationLevel,
            salaryLevel,
          );
          const resultData = filterData.slice(startIndex, endIndex);
          return {
            data: resultData,
            total: filterData.length,
          };
        }

        const result = filterFormat(
          data,
          companyName,
          educationLevel,
          salaryLevel,
        );
        return {
          data: result,
          total: result.length,
        };
      });

      this.get('/educationLevelList', (schema: any) => {
        return (schema as any).educationLists
          .all()
          .models.map((item: any) => item.attrs);
      });

      this.get('/salaryLevelList', (schema: any) => {
        return (schema as any).salaryLists
          .all()
          .models.map((item: any) => item.attrs);
      });

      this.get('/jobs/:id', (schema: any, request: any) => {
        const { id } = request.params;
        const data = (schema as any).jobLists
          .all()
          .models.find((item: any) => item.id === id);

        if (data) {
          const { preview, educationId, salaryId, ...rest } = data.attrs;
          return rest;
        }

        return [];
      });
    },
  });
