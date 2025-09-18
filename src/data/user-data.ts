export const CommonData = {
  SEARCH_EXAMPLE_NAME: "Blue Top",
} as const;

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
