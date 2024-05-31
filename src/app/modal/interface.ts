export interface partyDetails {
  name: String;
  company_name: String;
  credit_limit: Number;
  date_of_birth: Number;
  email: String;
  gstin: Number;
  image: any;
  is_active: Boolean;
  login_access: Boolean;
  mobile_no: Number;
  pan_no: String;
  remark: String;
  telephone_no: Number;
  anniversary_date: Number;
  apply_tds: Boolean;
  address: addressData[];
  bank_id: bankData[];
}

export interface addressData {
  address_line_1: String;
  address_line_2: String;
  city: String;
  country: String;
  id: Number;
  pincode: Number;
  state: String;
}

export interface bankData {
  account_holder_name: String;
  account_no: Number;
  bank_ifsc_code: String;
  bank_name: String;
  branch_name: String;
}
