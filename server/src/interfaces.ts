export interface PhoneNumber {
  type: string;
  value: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  phoneNumbers: PhoneNumber[] | null;
}
