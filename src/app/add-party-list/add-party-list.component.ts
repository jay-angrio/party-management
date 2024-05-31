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
  id: any;
  name!: string;
  company_name!: string;
  mobile_no!: number;
  email!: string;
  apply_tds: boolean = true;
  credit_limit!: number;
  image!: any;
  address_line_1!: string;
  address_line_2!: string;
  country!: string;
  state!: string;
  city!: string;
  pincode!: number;
  bank_ifsc_code!: string;
  bank_name!: string;
  branch_name!: string;
  account_no!: string;
  account_holder_name!: string;
  telephone_no!: number;
  whatsapp_no!: number;
  date_of_birth!: number;
  anniversary_date!: number;
  remark!: string;
  pan_no!: string;
  gstin!: number;
  partyDetailForm!: FormGroup;
  addressesArray: any[] = [];
  banksArray: any[] = [];

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
    });
    this.getParyById();

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
      apply_tds: [Boolean, Validators.required],

      addresses: this.fb.array([]), // Initialize empty form array
      banks: this.fb.array([]),
    });

    this.addAddress();
    this.addBank();
  }

  addAddress() {
    this.addressesArray.push(this.createAddressFormGroup());
  }

  createAddressFormGroup(): FormGroup {
    return this.fb.group({
      address_line_1: [''],
      address_line_2: [''],
      country: [''],
      state: [''],
      city: [''],
      pincode: [''],
    });
  }

  getAddressesValues(): any[] {
    return this.addressesArray.map((addressGroup) => addressGroup.value);
  }

  addBank() {
    this.banksArray.push(this.createBankFormGroup());
  }

  createBankFormGroup(): FormGroup {
    return this.fb.group({
      name: [''],
      bank_ifsc_code: [''],
      bank_name: [''],
      branch_name: [''],
      account_no: [''],
      account_holder_name: [''],
    });
  }

  getBankValue(): any[] {
    return this.banksArray.map((bankGroup) => bankGroup.value);
  }

  onBackClick() {
    this.location.back();
  }

  onSaveClick() {
    console.log(
      'value',
      this.partyDetailForm.value,
      this.getAddressesValues(),
      this.getBankValue()
    );

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
      'yyyy-mm-dd'
    );
    const anniverayDate = anniversaryhDateFormat;

    console.log('date', anniverayDate);

    const body = new FormData();
    body.append('name', this.partyDetailForm.value.name);
    body.append('company_name', this.partyDetailForm.value.company_name);
    body.append('mobile_no', this.partyDetailForm.value.mobile_no);
    body.append('telephone_no', this.partyDetailForm.value.telephone_no);
    body.append('whatsapp_no', this.partyDetailForm.value.whatsapp_no);
    body.append('email', this.partyDetailForm.value.email);
    body.append('credit_limit', this.partyDetailForm.value.credit_limit);
    body.append('image', this.partyDetailForm.value.image);
    body.append('remark', this.partyDetailForm.value.remark);
    body.append('pan_no', this.partyDetailForm.value.pan_no);
    body.append('date_of_birth', JSON.stringify(birthDate) as string);
    body.append('anniversary_date', JSON.stringify(anniverayDate) as string);
    body.append('apply_tds', this.partyDetailForm.value.apply_tds);
    body.append('gstin', this.partyDetailForm.value.gstin);

    const bankValue = this.getBankValue();

    body.append('bank', JSON.stringify(bankValue));

    const addressValue = this.getAddressesValues();

    body.append('address', JSON.stringify(addressValue));

    console.log('body', body);

    this.http.post(environment.baseurl + 'party/', body).subscribe((res) => {
      console.log('res', res);
    });

    console.log('birthDate', birthDateFormat);
  }

  save() {
    console.log(this.getAddressesValues());
    console.log(this.getBankValue());
  }

  getParyById() {
    this.http
      .get(environment.baseurl + 'party/?id=' + this.id.id)
      .subscribe((res: any) => {
        console.log('res', res);
        this.getPartyDetail(res);
      });
  }

  getPartyDetail(user: any) {
    this.name = user.name;
  }
}
