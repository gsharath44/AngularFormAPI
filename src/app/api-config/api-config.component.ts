import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup, FormArray } from "@angular/forms";
import { AppService } from "../app.service";
import { Router } from "@angular/router";
import {
  IOperations,
  IAPIConfig,
  IRequestDetails,
  IResponseHeaders,
  IResponseDetails,
  IApiImplicitParams
} from "../model/apiConfig";

@Component({
  selector: "app-api-config",
  templateUrl: "./api-config.component.html",
  styleUrls: ["./api-config.component.css"]
})
export class ApiConfigComponent implements OnInit {
  apiForm: FormGroup;
  responseHeaderItems: any = [];
  responseDetailsItems: any = [];
  apiImplicitParamsItems: any = [];

  constructor(
    private _fb: FormBuilder,
    public appSvc: AppService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    // const op = this.appSvc.apiConfigObj.operations;
    this.apiForm = this._fb.group({
      api_path: [this.appSvc.apiConfigObj.api_path, Validators.required],
      api_description: [this.appSvc.apiConfigObj.api_description],
      op_description: [this.appSvc.apiConfigObj.api_operations[0].description],
      op_notes: [this.appSvc.apiConfigObj.api_operations[0].notes],
      op_api_method_name: [
        this.appSvc.apiConfigObj.api_operations[0].api_method_name
      ],
      op_response: [this.appSvc.apiConfigObj.api_operations[0].response],
      op_response_container: [
        this.appSvc.apiConfigObj.api_operations[0].response_container
      ],
      op_produces: [this.appSvc.apiConfigObj.api_operations[0].produces],
      op_path: [this.appSvc.apiConfigObj.api_operations[0].path],
      op_http_method: [this.appSvc.apiConfigObj.api_operations[0].http_method],
      op_rd_type: [
        this.appSvc.apiConfigObj.api_operations[0].request_details.type
      ],
      op_rd_body: [
        this.appSvc.apiConfigObj.api_operations[0].request_details.body
      ],
      op_responseHeadersFormArr: this._fb.array([]),
      op_responseDetailsFormArr: this._fb.array([]),
      op_apiImplicitParamsFormArr: this._fb.array([]),

    });

    this.appSvc.apiConfigObj.api_operations[0].response_headers.forEach(
      resHeadItem => {
        this.responseHeaderItems = this.apiForm.get(
          "op_responseHeadersFormArr"
        ) as FormArray;
        this.responseHeaderItems.push(this.addWithResHeadValues(resHeadItem));
      }
    );

    this.appSvc.apiConfigObj.api_operations[0].response_details.forEach(
      resDetailItem => {
        this.responseDetailsItems = this.apiForm.get(
          "op_responseDetailsFormArr"
        ) as FormArray;
        this.responseDetailsItems.push(this.addWithResDetailValues(resDetailItem));
      }
    );

    this.appSvc.apiConfigObj.api_operations[0].api_implicit_params.forEach(
      apiImpParamsItem => {
        this.apiImplicitParamsItems = this.apiForm.get(
          "op_apiImplicitParamsFormArr"
        ) as FormArray;
        this.apiImplicitParamsItems.push(this.addWithapiImplicitParamsValues(apiImpParamsItem));
      }
    );
  }

  addWithResHeadValues(resHeadItem: IResponseHeaders) {
    return this._fb.group({
      resh_name: [resHeadItem.name],
      resh_description: [resHeadItem.description],
      resh_type: [resHeadItem.type]
    });
  }
  addWithResDetailValues(resDetailItem: IResponseDetails) {
    return this._fb.group({
      resd_body: [resDetailItem.body],
      resd_code: [resDetailItem.code],
      resd_message: [resDetailItem.message]
    });
  }
  addWithapiImplicitParamsValues(apiImpParamsItem: IApiImplicitParams) {
    return this._fb.group({
      IP_name: [apiImpParamsItem.name],
      IP_value: [apiImpParamsItem.value],
      IP_required: [apiImpParamsItem.required],
      IP_dataType: [apiImpParamsItem.dataType],
      IP_paramType: [apiImpParamsItem.paramType]
    });
  }

  // *****
  addEmptyLineResHead() {
    this.responseHeaderItems = this.respnseHeadersCtrl;
    const emptyLine = {} as IResponseHeaders;
    this.appSvc.apiConfigObj.api_operations[0].response_headers.push(emptyLine);
    this.responseHeaderItems.push(this.addWithResHeadValues(emptyLine));
  }

  // Remove  Item
  removeResHeaders(i) {
    // Do nothing if this is first line item
    if (i < 1) {
      return;
    } else {
      this.responseHeaderItems = this.respnseHeadersCtrl;
      this.responseHeaderItems.removeAt(i);
      this.appSvc.apiConfigObj.api_operations[0].response_headers.splice(i, 1);
    }
  }

  addEmptyLineResDetails() {
    this.responseDetailsItems = this.respnseDetailsCtrl;
    const emptyLine = {} as IResponseDetails;
    this.appSvc.apiConfigObj.api_operations[0].response_details.push(emptyLine);
    this.responseDetailsItems.push(this.addWithResDetailValues(emptyLine));
  }

  // Remove  Item
  removeResDetails(i) {
    // Do nothing if this is first line item
    if (i < 1) {
      return;
    } else {
      this.responseDetailsItems = this.respnseDetailsCtrl;
      this.responseDetailsItems.removeAt(i);
      this.appSvc.apiConfigObj.api_operations[0].response_details.splice(i, 1);
    }
  }

  addEmptyLineapiImplicitParams() {
    this.apiImplicitParamsItems = this.apiImplicitParamsCtrl;
    const emptyLine = {} as IApiImplicitParams;
    this.appSvc.apiConfigObj.api_operations[0].api_implicit_params.push(emptyLine);
    this.apiImplicitParamsItems.push(this.addWithapiImplicitParamsValues(emptyLine));
  }

  // Remove  Item
  removeapiImplicitParams(i) {
    // Do nothing if this is first line item
    if (i < 1) {
      return;
    } else {
      this.apiImplicitParamsItems = this.apiImplicitParamsCtrl;
      this.apiImplicitParamsItems.removeAt(i);
      this.appSvc.apiConfigObj.api_operations[0].api_implicit_params.splice(i, 1);
    }
  }

  /**
   * New getter method to obtain
   * Form Array for ngfor binding with strict typecasting
   */
  get respnseHeadersCtrl() {
    return <FormArray>this.apiForm.get("op_responseHeadersFormArr");
  }
  get respnseDetailsCtrl() {
    return <FormArray>this.apiForm.get("op_responseDetailsFormArr");
  }
  get apiImplicitParamsCtrl() {
    return <FormArray>this.apiForm.get("op_apiImplicitParamsFormArr");
  }

  submitForm() {
    const ctrl = this.apiForm.controls;
    console.log(ctrl);
    if (this.apiForm.valid) {
      const rd: IRequestDetails = {
        type: ctrl.op_rd_type.value,
        body: ctrl.op_rd_body.value
      };

      const reshArr: IResponseHeaders[] = [];
      Object.values(ctrl.op_responseHeadersFormArr['controls']).forEach((fGroup: FormGroup) => {
        const resh = {
          name: fGroup.controls.resh_name.value,
          description: fGroup.controls.resh_description.value,
          type: fGroup.controls.resh_type.value
        } as IResponseHeaders;
        reshArr.push(resh);
      });

      const resdArr: IResponseDetails[] = [];
      Object.values(ctrl.op_responseDetailsFormArr['controls']).forEach((fGroup: FormGroup) => {
        const resd = {
          body: fGroup.controls.resd_body.value,
          code: fGroup.controls.resd_code.value,
          message: fGroup.controls.resd_message.value
        } as IResponseDetails;
        resdArr.push(resd);
      });

      const apiImpArr: IApiImplicitParams[] = [];
      Object.values(ctrl.op_apiImplicitParamsFormArr['controls']).forEach((fGroup: FormGroup) => {
        const apiIP = {
          name: fGroup.controls.IP_name.value,
          value: fGroup.controls.IP_value.value,
          required: fGroup.controls.IP_required.value,
          dataType: fGroup.controls.IP_dataType.value,
          paramType: fGroup.controls.IP_paramType.value
        } as IApiImplicitParams;
        apiImpArr.push(apiIP);
      });

      const op: IOperations[] = [
        {
          description: ctrl.op_description.value,
          notes: ctrl.op_notes.value,
          api_method_name: ctrl.op_api_method_name.value,
          response: ctrl.op_response.value,
          response_container: ctrl.op_response_container.value,
          produces: ctrl.op_produces.value,
          path: ctrl.op_path.value,
          http_method: ctrl.op_http_method.value,
          request_details: rd,
          response_headers: reshArr,
          response_details: resdArr,
          api_implicit_params: apiImpArr
        }
      ];

      this.appSvc.apiConfigObj.api_path = ctrl.api_path.value;
      this.appSvc.apiConfigObj.api_description = ctrl.api_description.value;
      this.appSvc.apiConfigObj.api_operations = op;

      console.log(this.appSvc.apiConfigObj);

      this.router.navigate(["review"]);
    }
  }

  addAttachments(event) {
    const fileArray = Array.from(event.target.files);
    fileArray.forEach((element: File) => {
      this.appSvc.apiConfigObj.api_operations[0].request_details.body = element;
    });
  }
}
