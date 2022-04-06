declare type CountryType = {
  name: string;
  flag: string;
  format: string;
  phone?: string;
  phoneCode: string;
  code: string;
  dialCode: string;
};

declare type PlainObjectType = {
  [key: string]: any
}