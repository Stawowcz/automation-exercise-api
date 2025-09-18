export const CommonData = {
  SEARCH_EXAMPLE_NAME: "Blue Top",
} as const;

// export const RegisterData = {
//   name: "Jakub",
//   email: "jakub.test+" + Date.now() + "@example.com", // uniknięcie duplikatów
//   password: "123456",
//   title: "Mr",
//   birth_date: "1",
//   birth_month: "January",
//   birth_year: "1990",
//   firstname: "Jakub",
//   lastname: "Stawowczyk",
//   company: "Softwgoods",
//   address1: "Main Street 123",
//   address2: "Suite 4",
//   country: "Canada",
//   zipcode: "12345",
//   state: "Ontario",
//   city: "Toronto",
//   mobile_number: "1234567890",
// } as const;

// export const UpdatedData = {
//   name: "JakubUp",
//   password: "12345678",
//   title: "Mrs",
//   birth_date: "14",
//   birth_month: "February",
//   birth_year: "1991",
//   firstname: "Kuba",
//   lastname: "Staw",
//   company: "Softwgoods 123",
//   address1: "Main Street 12345",
//   address2: "Suite 5",
//   country: "Usa",
//   zipcode: "1234567",
//   state: "New York",
//   city: "New York",
//   mobile_number: "0987654321",
// } as const;

// src/data/register-data.ts
import { faker } from "@faker-js/faker";

export const RegisterData = {
  name: faker.person.firstName(),
  email: `jakub.test+${Date.now()}@example.com`, // unikalny
  password: faker.internet.password({ length: 10 }),
  title: faker.person.sex() === "male" ? "Mr" : "Mrs",
  birth_date: faker.number.int({ min: 1, max: 28 }).toString(),
  birth_month: faker.date.month(),
  birth_year: faker.number.int({ min: 1970, max: 2005 }).toString(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  company: faker.company.name(),
  address1: faker.location.streetAddress(),
  address2: faker.location.secondaryAddress(),
  country: faker.location.country(),
  zipcode: faker.location.zipCode(),
  state: faker.location.state(),
  city: faker.location.city(),
  mobile_number: faker.string.numeric(10),
};

export const UpdatedData = {
  name: faker.person.firstName() + "Updated",
  password: faker.internet.password({ length: 12 }),
  title: "Mrs",
  birth_date: "14",
  birth_month: "February",
  birth_year: "1991",
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  company: faker.company.name() + " Updated",
  address1: faker.location.streetAddress(),
  address2: faker.location.secondaryAddress(),
  country: faker.location.country(),
  zipcode: faker.location.zipCode(),
  state: faker.location.state(),
  city: faker.location.city(),
  mobile_number: faker.string.numeric(10),
};
