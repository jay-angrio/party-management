export interface partyDetails {
  name: String;
  company_name: String;
  credit_limit: String;
  date_of_birth: String;
  email: String;
  gstin: String;
  image: any;
  is_active: Boolean;
  login_access: Boolean;
  mobile_no: String;
  pan_no: String;
  remark: String;
  telephone_no: String;
  anniversary_date: String;
  apply_tds: Boolean;
  address: addressData[];
  bank_id: bankData[];
}

export interface addressData {
  address_line_1: String;
  address_line_2: String;
  city: String;
  country: String;
  pincode: String;
  state: String;
}

export interface bankData {
  account_holder_name: String;
  account_no: String;
  bank_ifsc_code: String;
  bank_name: String;
  branch_name: String;
}
