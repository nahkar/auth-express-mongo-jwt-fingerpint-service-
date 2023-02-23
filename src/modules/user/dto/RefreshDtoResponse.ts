export class RefreshDtoResponse {
	accessToken: string;
	constructor(model: { accessToken: string }) {
		this.accessToken = model.accessToken;
	}
}
