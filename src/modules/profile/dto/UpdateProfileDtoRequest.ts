import type { IProfile } from '@interfaces/profile.interface';

export class UpdateProfileDtoRequest {
	userId: string;
	firstName?: string;
	lastName?: string;
	organization?: string;
	address?: string;
	state?: string;
	zip?: string;
	country?: string;
	language?: string;
	timezone?: string;
	currency?: string;
	constructor(model: Omit<IProfile, 'userId'> & { userId: string }) {
		this.userId = model.userId;
		this.firstName = model.firstName;
		this.lastName = model.lastName;
		this.organization = model.organization;
		this.address = model.address;
		this.state = model.state;
		this.zip = model.zip;
		this.country = model.country;
		this.language = model.language;
		this.timezone = model.timezone;
		this.currency = model.currency;
	}
}
