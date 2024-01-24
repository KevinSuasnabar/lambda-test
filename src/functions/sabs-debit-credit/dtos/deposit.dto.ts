export class DepositDto {
  public readonly documentId: string;
  public readonly documentType: string;
  public readonly accountNumber: string;
  public readonly accountType: string;
  public readonly currency: string;
  public readonly amount: number;
  public readonly sequence: string;
  public readonly type: string;

  constructor({
    documentId,
    documentType,
    accountNumber,
    accountType,
    currency,
    amount,
    sequence,
    type,
  }: {
    documentId: string;
    documentType: string;
    accountNumber: string;
    accountType: string;
    currency: string;
    amount: number;
    sequence: string;
    type: string;
  }) {
    this.documentId = documentId;
    this.documentType = documentType;
    this.accountNumber = accountNumber;
    this.accountType = accountType;
    this.currency = currency;
    this.amount = amount;
    this.sequence = sequence;
    this.type = type;
  }
}
