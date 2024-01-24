export const mockUserProductDetails = {
  clientDetail: {
    id: "1",
    addresses: [
      {
        principal: true,
        street: "test",
        buildingNumber: "test",
        building: "test",
        district: "test",
        town: "test",
      },
    ],
    userJCE: {
      firstName: "kevin",
      lastName1: "test-lastname",
      lastName2: "test-lastname2",
      sex: "M",
      bornDate: "2023-06-05",
    },
    status: true,
    email: "email@test.com",
  },
  accountList: [
    {
      account: { reference: "123456789" },
      balanceAccount: {
        availableFunds: 123124,
        availableBalance: 123456,
        standardAccountNumber: 0,
        onlineActualBalance: 123456,
      },
    },
  ],
};
export const mockHttpResponse = {
  status: 200,
  statusText: "OK",
  data: mockUserProductDetails,
  headers: {},
  config: {},
};
export const mockNationalId = "12345";

export const userData: any = {
  addresses: [
    {
      principal: true,
      street: "123 Main St",
      buildingNumber: "1A",
      building: "Building A",
      district: "District 1",
      town: "City A",
    },
    {
      principal: false,
      street: "456 Second St",
      buildingNumber: "2B",
      building: "Building B",
      district: "District 2",
      town: "City B",
    },
  ],
  userJCE: {
    firstName: "John",
    lastName1: "Doe",
    lastName2: "Smith",
    sex: "Male",
    bornDate: "1990-01-01",
  },
  status: "Active",
  email: "john.doe@example.com",
};

export const expectedUserData = {
  customerFullName: "John Doe Smith",
  address: "123 Main St 1A Building A District 1",
  status: "Active",
  city: "City A",
  segment: "",
  officerCode: "",
  officerName: "",
  email: "john.doe@example.com",
  gender: "Male",
  dateOfBirth: "1990-01-01",
};

export const accountList: any = [
  {
    account: { reference: "1234567890" },
    balanceAccount: { availableFunds: 1000, availableBalance: 900 },
  },
  {
    account: { reference: "0987654321" },
    balanceAccount: { availableFunds: 2000, availableBalance: 1800 },
  },
];

export const expectedMappedAccounts = [
  {
    bankId: "1129",
    bankName: "QIK",
    number: "1234567890",
    alias: "",
    type: "SAV",
    currency: "DOP",
    status: "",
    relation: "",
    balance: 1000,
    availableBalance: 900,
  },
  {
    bankId: "1129",
    bankName: "QIK",
    number: "0987654321",
    alias: "",
    type: "SAV",
    currency: "DOP",
    status: "",
    relation: "",
    balance: 2000,
    availableBalance: 1800,
  },
];
