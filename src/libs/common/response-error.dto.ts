export class ResponseError {
  constructor(
    readonly responseCode: string,
    readonly description: string,
  ) {}
}
