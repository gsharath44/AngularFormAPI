import { Injectable } from "@angular/core";
import { IAPIConfig, IOperations, IResponseHeaders, IResponseDetails, IApiImplicitParams, IRequestDetails } from "./model/apiConfig";

@Injectable({
  providedIn: "root"
})
export class AppService {
  apiConfigObj: IAPIConfig;

  constructor() {

    this.initializeObj();

  }

  private initializeObj() {
    const responseHeader: IResponseHeaders[] = [];
    const responseDetails: IResponseDetails[] = [];
    const apiImplicitParams: IApiImplicitParams[] = [];
    const requestDetails = {} as IRequestDetails;
    const operations: IOperations[] = [];

    responseHeader.push({} as IResponseHeaders);
    responseDetails.push({} as IResponseDetails);
    apiImplicitParams.push({} as IApiImplicitParams);

    operations.push({
      request_details: requestDetails,
      response_headers: responseHeader,
      response_details: responseDetails,
      api_implicit_params: apiImplicitParams
    } as IOperations);

    this.apiConfigObj = {
      api_path: '',
      api_description: '',
      api_operations: operations
    } as IAPIConfig;

    console.log(this.apiConfigObj);
  }
}
