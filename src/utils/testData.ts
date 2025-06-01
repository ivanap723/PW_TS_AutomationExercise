import { Faker , en_US , en} from '@faker-js/faker';

const faker = new Faker({locale: [en_US, en]});

export function generateRandomUser(){
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({firstName: firstName });
    const password = faker.internet.password();
    const company = faker.company.name();
    const address1 = faker.location.streetAddress(false);
    const address2 = faker.location.buildingNumber();
    const state = faker.location.state();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode();
    const phone = faker.phone.number({ style: 'national' });


    return {
        firstName,
        lastName,
        email,
        password,
        company,
        address1,
        address2,
        state,
        city,
        zipCode,
        phone
    };
}