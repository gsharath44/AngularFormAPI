
export class IAPIConfig {
  api_path: string;
  api_description: string;
  api_operations: IOperations[];
}

export interface IOperations {
  description?: string;
  notes?: string;
  api_method_name?: string;
  response?: string;
  request_details?: IRequestDetails;
  response_container?: string;
  produces?: string;
  path?: string;
  http_method?: string;
  response_headers?: IResponseHeaders[];
  response_details?: IResponseDetails[];
  api_implicit_params?: IApiImplicitParams[];
}

export interface IResponseHeaders {
  name?: string;
  description?: string;
  type?: string;
}

export interface IResponseDetails {
  body?:string;
  code?: number;
  message?: string;
}

export interface IApiImplicitParams {
  name?: string;
  value?: string;
  required?: string;
  dataType?: string;
  paramType?: string;
}

export interface IRequestDetails {
  type?: string;
  body?: File;
}
