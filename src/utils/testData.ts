import { Faker , en_US , en} from '@faker-js/faker';

const faker = new Faker({locale: [en_US, en]});
export let generatedEmail: string;


//generating random user with Faker
export function generateRandomUser()
{
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

//generate random email without using Faker
export function generateRandomEmail(): string 
{
	const timestamp = Date.now();
	const randomSuffix = Math.floor(Math.random() * 10000);
	const randomEmail = `user${timestamp}${randomSuffix}@example.com`;

	setGeneratedEmail(randomEmail);

	return randomEmail;
}

//------------------------------Get and Set functions---------------------------

export function setGeneratedEmail(generatedString: string)
{
	generatedEmail = generatedString;
}
export function getGeneratedEmail()
{
	return generatedEmail;
}

//-------------------------------User Data----------------------------------------

export interface User {
    firstName: string,
    lastName: string,
    company: string,
    address1: string,
    address2: string,
    state: string,
    city: string,
    zip: string,
    phone: string,
    country: string
}

export const IndiaUser: User = {
	firstName: 'Ishaan',
	lastName: 'Sharma',
	company: 'Best Sharma',
	address1: 'Gulshan Mahal, 24, Pedder Rd',
	address2: 'Cumballa Hill',
	state: 'Maharashtra',
	city: 'Mumbai',
	zip: '400026',
	phone: '206111222333',
	country: 'India'
}

export const USAUser: User = {
	firstName: 'Peter',
	lastName: 'Peterson',
	company: 'Peter&Sons',
	address1: '1801 Mountain Rd NW',
	address2: '2nd floor',
	state: 'New Mexico',
	city: 'Albuquerque',
	zip: 'NM 87104',
	phone: '312111222333',
	country: 'United States'
}

export const CanadaUser: User = {
	firstName: 'John',
	lastName: 'Johnson',
	company: 'Johnson Science',
	address1: '1455 Quebec St',
	address2: 'North Wing',
	state: 'New Mexico',
	city: 'Vancouver',
	zip: 'BC V6A 3Z7',
	phone: '204111222333',
	country: 'Canada'
}

export const AustraliaUser: User = {
	firstName: 'Samantha',
	lastName: 'Hendrickson',
	company: 'Kangaroo',
	address1: '1 William St, Darlinghurst',
	address2: 'First floor',
	state: 'New South Wales',
	city: 'Sidney',
	zip: 'NSW 2010',
	phone: '342111222333',
	country: 'Australia'
}

export const IsraelUser: User = {
	firstName: 'Ariel',
	lastName: 'Perez',
	company: 'PerezCompany',
	address1: 'Sderot Shaul HaMelech 27',
	address2: 'level 1',
	state: 'Tel Aviv-Yafo',
	city: 'Tel Aviv-Yafo',
	zip: '6329302',
	phone: '312111222333',
	country: 'Israel'
}

export const NewZealandUser: User = {
	firstName: 'Tepapa',
	lastName: 'Tongarewa',
	company: 'Te Papa',
	address1: '55 Cable Street',
	address2: 'Te Aro',
	state: 'North Island',
	city: 'Wellington',
	zip: '6011',
	phone: '344111222333',
	country: 'New Zealand'
}

export const SingaporeUser: User = {
	firstName: 'Singy',
	lastName: 'Poor',
	company: 'Ice Cream Factory',
	address1: '100 Loewen Rd',
	address2: '1st floor',
	state: 'Queenstown',
	city: 'Singapore',
	zip: '248837',
	phone: '344111222333',
	country: 'Singapore'
}