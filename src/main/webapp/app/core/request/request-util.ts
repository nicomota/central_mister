import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();

  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort') {
        options = options.set(key, req[key]);
      }
    });

    if (req.sort) {
      req.sort.forEach((val: string) => {
        options = options.append('sort', val);
      });
    }
  }

  return options;
};

export const createFormDataOption = (formData: FormData, req?: any): void => {
  if (req) {
    Object.keys(req).forEach(key => {
      if (typeof req[key] !== 'object') {
        formData.append(key, req[key]);
      } else {
        createFormDataOption(formData, req[key]);
      }
    });
  }
};
