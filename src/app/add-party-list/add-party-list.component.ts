import { DatePipe, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { partyDetails } from '../modal/interface';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-party-list',
  templateUrl: './add-party-list.component.html',
  styleUrls: ['./add-party-list.component.scss'],
  providers: [DatePipe],
})
export class AddPartyListComponent implements OnInit {
  showLoader = false;
  id: any = '';
  partyDetailForm!: FormGroup;
  addressesArray: any[] = [];
  banksArray: any[] = [];
  user: any;
  address: any;
  fileName: any = '';
  file: any = '';
  base64Image: string | null = null;
  getAddressArray: any[] = [];
  partyDetails: partyDetails = {
    name: '',
    company_name: '',
    credit_limit: '',
    date_of_birth: '',
    email: '',
    gstin: '',
    image: '',
    is_active: false,
    login_access: true,
    mobile_no: '',
    pan_no: '',
    remark: '',
    telephone_no: '',
    anniversary_date: '',
    apply_tds: false,
    address: [
      {
        address_line_1: '',
        address_line_2: '',
        city: '',
        country: '',
        pincode: '',
        state: '',
      },
    ],
    bank_id: [
      {
        account_holder_name: '',
        account_no: '',
        bank_ifsc_code: '',
        bank_name: '',
        branch_name: '',
      },
    ],
  };
  apply_tds: boolean = false;
  address_line_1!: string;
  address_line_2!: string;
  country!: string;
  state!: string;
  city!: string;
  pincode!: string;
  account_holder_name!: string;
  account_no!: string;
  bank_name!: string;
  branch_name!: string;
  bank_ifsc_code!: string;
  isEditMode!: boolean;

  constructor(
    private location: Location,
    private aroute: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    let paramsId = this.aroute.queryParamMap.subscribe((res: any) => {
      this.id = res?.params;
      this.isEditMode = !!this.id;
    });
    this.getPartyById();

    this.partyDetailForm = this.fb.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      email: ['', Validators.required],
      mobile_no: ['', Validators.required],
      credit_limit: ['', Validators.required],
      image: ['', Validators.required],
      telephone_no: ['', Validators.required],
      whatsapp_no: ['', Validators.required],
      remark: ['', Validators.required],
      pan_no: ['', Validators.required],
      gstin: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      anniversary_date: ['', Validators.required],
      apply_tds: [false, Validators.required],
    });

    this.addAddress();
    this.addBank();
    this.getPartyDetail(this.user);
  }

  addAddress() {
    if (!this.partyDetails.address) {
      this.partyDetails.address = [];
    }
    this.partyDetails.address.push({
      address_line_1: '',
      address_line_2: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
    });
  }

  addBank() {
    if (!this.partyDetails.bank_id) {
      this.partyDetails.bank_id = [];
    }
    this.partyDetails.bank_id.push({
      bank_ifsc_code: '',
      bank_name: '',
      branch_name: '',
      account_no: '',
      account_holder_name: '',
    });
  }

  onAddressDelete(index: any) {
    if (this.partyDetails.address.length > 0) {
      this.partyDetails.address.splice(index, 1);
    }
  }

  onBankDelete(index: any) {
    if (this.partyDetails.bank_id.length > 0) {
      this.partyDetails.bank_id.splice(index, 1);
    }
  }

  onBackClick() {
    this.location.back();
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;

      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {
    this.file = file;
    console.log('file type', this.file.type);
  }

  onSaveClick() {
    this.showLoader = true;
    const birthDateValue = this.partyDetailForm.get('date_of_birth')?.value;
    const birthDateFormat = this.datePipe.transform(
      birthDateValue,
      'YYYY-MM-dd'
    );
    const birthDate = birthDateFormat;

    const anniversaryDateValue =
      this.partyDetailForm.get('anniversary_date')?.value;
    const anniversaryhDateFormat = this.datePipe.transform(
      anniversaryDateValue,
      'YYYY-MM-dd'
    );
    const anniverayDate = anniversaryhDateFormat;

    const body = new FormData();
    body.append('name', this.partyDetailForm.value.name);
    body.append('company_name', this.partyDetailForm.value.company_name);
    body.append('mobile_no', this.partyDetailForm.value.mobile_no);
    body.append('telephone_no', this.partyDetailForm.value.telephone_no);
    body.append('whatsapp_no', this.partyDetailForm.value.whatsapp_no);
    body.append('email', this.partyDetailForm.value.email);
    body.append('credit_limit', this.partyDetailForm.value.credit_limit);
    body.append('file', this.file);
    body.append('remark', this.partyDetailForm.value.remark);
    body.append('pan_no', this.partyDetailForm.value.pan_no);
    body.append('date_of_birth', birthDate as string);
    body.append('anniversary_date', anniverayDate as string);
    body.append('apply_tds', JSON.stringify(this.apply_tds));
    body.append('gstin', this.partyDetailForm.value.gstin);

    const bankValue = this.partyDetails.bank_id;

    body.append('bank', JSON.stringify(bankValue));

    const addressValue = this.partyDetails.address;

    body.append('address', JSON.stringify(addressValue));

    console.log('body', body);
    if (this.id.id) {
      this.http
        .put(environment.baseurl + 'party/?id=' + this.id.id, body)
        .subscribe((res) => {
          console.log('res', res);
          this.showLoader = false;
        });
    } else {
      this.http.post(environment.baseurl + 'party/', body).subscribe(
        (res: any) => {
          console.log('res', res);
          this.showLoader = false;
        },
        (error) => {
          console.error('Error:', error);
          this.showLoader = false;
        }
      );
    }
  }

  getPartyById() {
    this.showLoader = true;
    this.http
      .get(environment.baseurl + 'party/?id=' + this.id.id)
      .subscribe((res: any) => {
        console.log('res', res);
        this.getPartyDetail(res);
        this.showLoader = false;
      });
    console.log('address', this.getAddressArray);
  }

  getPartyDetail(user: any) {
    this.showLoader = true;
    this.partyDetailForm.patchValue({
      name: user.name,
      company_name: user.company_name,
      email: user.email,
      mobile_no: user.mobile_no,
      credit_limit: user.credit_limit,
      image: user.image,
      telephone_no: user.telephone_no,
      whatsapp_no: user.whatsapp_no,
      remark: user.remark,
      pan_no: user.pan_no,
      gstin: user.gstin,
      date_of_birth: user.date_of_birth,
      anniversary_date: user.anniversary_date,
    });
    this.apply_tds = user.apply_tds;
    this.partyDetails.bank_id = user.bank_id;
    this.partyDetails.address = user.address;
    this.showLoader = false;
  }
}
