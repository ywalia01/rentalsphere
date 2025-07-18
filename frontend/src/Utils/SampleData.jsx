export const openServiceRequestsData = [
  {
    id: 1,
    serviceTitle: "Plumbing Issue",
    tenant: {
      name: "John Doe",
      unit: "Unit 101",
    },
    serviceDescription: "There is a leak under the kitchen sink.",
    date: "2024-02-21",
  },
  {
    id: 2,
    serviceTitle: "Electrical Problem",
    tenant: {
      name: "Jane Smith",
      unit: "Unit 202",
    },
    serviceDescription: "The lights in the living room are flickering.",
    date: "2024-02-20",
  },
  {
    id: 3,
    serviceTitle: "Broken Window",
    tenant: {
      name: "Michael Johnson",
      unit: "Unit 303",
    },
    serviceDescription: "One of the windows in the bedroom is cracked.",
    date: "2024-02-19",
  },
  {
    id: 4,
    serviceTitle: "Appliance Repair",
    tenant: {
      name: "Emily Wilson",
      unit: "Unit 404",
    },
    serviceDescription: "The microwave in the kitchen is not working.",
    date: "2024-02-18",
  },
  {
    id: 5,
    serviceTitle: "HVAC Maintenance",
    tenant: {
      name: "Sarah Brown",
      unit: "Unit 505",
    },
    serviceDescription: "The heating system in the apartment needs servicing.",
    date: "2024-02-17",
  },
];

export const outstandingBalancesData = [
  { name: "Samuel Llyod", unit: "Unit 810", balance: 2540 },
  { name: "George Harrison", unit: "Unit 920", balance: 1400 },
  { name: "Emily Johnson", unit: "Unit 725", balance: 1850 },
  { name: "Michael Smith", unit: "Unit 615", balance: 3200 },
  { name: "Emma Davis", unit: "Unit 532", balance: 950 },
  // Add more data as needed
];

export const sidebarMenuItems = [
  { name: "Dashboard", path: "overview", icon: "FiHome" },
  { name: "Announcements", path: "announcements", icon: "TbSpeakerphone" },
  {
    name: "Tenant Approvals",
    path: "tenantapprovals",
    icon: "IoCheckboxOutline",
  },
  {
    name: "Rent Management",
    path: "rentmanagement",
    icon: "FaRegMoneyBillAlt",
  },
  {
    name: "Lease Management",
    path: "leasemanagement",
    icon: "IoDocumentOutline",
  },
  {
    name: "Violation Log",
    path: "violationlog",
    icon: "AiTwotoneFileExclamation",
  },
  { name: "Service Requests", path: "servicerequests", icon: "FiTool" },
];

export const sampleAnnouncements = [
  {
    id: 1,
    title: "Important Announcement 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2024-02-23",
  },
  {
    id: 2,
    title: "Important Announcement 2",
    content:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    date: "2024-02-22",
  },
  {
    id: 3,
    title: "Important Announcement 3",
    content:
      "Nulla facilisi. Integer fermentum elit in ipsum faucibus, eget scelerisque nulla fermentum.",
    date: "2024-02-21",
  },
];

export const tenantApprovalsData = [
  {
    tenantName: "John Doe",
    email: "john.doe@example.com",
    unit: "A101",
    moveInDate: "2024-03-01",
    duration: "12 months",
    reason: "Looking for a new rental home",
    date: "2024-02-24",
  },
  {
    tenantName: "Jane Smith",
    email: "jane.smith@example.com",
    unit: "B203",
    moveInDate: "2024-04-01",
    duration: "6 months",
    reason: "Relocating for work",
    date: "2024-02-23",
  },
  // Add more tenant request objects as needed
];

export const sampleTenantReqs = [
  {
    id: 1,
    name: "John Doe",
    details: "Request details for John Doe",
  },
  {
    id: 2,
    name: "Jane Smith",
    details: "Request details for Jane Smith",
  },
];

export const sampleListingsData = [
  {
    id:1,
    numBedrooms: "3",
    numBathrooms: "3",
    title: "Statue of Liberty",
    address: "New York, NY 10004, United States",
    listingType: "Condominium",
    furnishType: "Partly Furnished",
    area: "1,386 sq. ft.",
    rate: "$1.98/sq.ft",
    owner: "John Doe",
    price: "3,200",
    imageURL:
      "https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg",
  },
  {
    numBedrooms: "3",
    numBathrooms: "3",
    title: "Statue of Liberty",
    address: "New York, NY 10004, United States",
    listingType: "Condominium",
    furnishType: "Partly Furnished",
    area: "1,386 sq. ft.",
    rate: "$1.98/sq.ft",
    owner: "John Doe",
    price: "3,200",
    imageURL:
      "https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg",
  },
  {
    numBedrooms: "3",
    numBathrooms: "3",
    title: "Statue of Liberty",
    address: "New York, NY 10004, United States",
    listingType: "Condominium",
    furnishType: "Partly Furnished",
    area: "1,386 sq. ft.",
    rate: "$1.98/sq.ft",
    owner: "John Doe",
    price: "3,200",
    imageURL:
      "https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg",
  },
  {
    numBedrooms: "3",
    numBathrooms: "3",
    title: "Statue of Liberty",
    address: "New York, NY 10004, United States",
    listingType: "Condominium",
    furnishType: "Partly Furnished",
    area: "1,386 sq. ft.",
    rate: "$1.98/sq.ft",
    owner: "John Doe",
    price: "3,200",
    imageURL:
      "https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg",
  },
  
];

export const sampleRequestData = [
  {
    id: "d5e3",
    requestSubject: "New Req",
    requestType: "New Req type",
    requestMessage: "New Req type Message New Req type Message"
  },
  {
    id: "caee",
    requestSubject: "Test 1",
    requestType: "Test 1 type",
    requestMessage: "Test 1 message Test 1 messageTest 1 messageTest 1 message"
  },
  {
    id: "2fdd",
    requestSubject: "Testst",
    requestType: "Testst",
    requestMessage: "TeststTeststTeststTestst"
  }
]


export const sampleDocumentData = [
  {
    id: "1",
    documentName: "Document 1",
    documentLink: "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_PDF.pdf",
    createdDate: "22 Fab 2024"
  },
  {
    id: "2",
    documentName: "Document 2",
    documentLink: "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_PDF.pdf",
    createdDate: "22 Fab 2024"
  },
  {
    id: "3",
    documentName: "Document 3",
    documentLink: "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_PDF.pdf",
    createdDate: "22 Fab 2024"
  },
]


export const samplePaymentData = [
  {
    id: "1",
    invoiceNo:"dsf2313sdas",
    note: "Maintenance",
    amount: 45,
    paymentDate: "24 March 2024"
  },
  {
    id: "2",
    invoiceNo:"dsf2313sdas",
    note: "Maintenance",
    amount: 45,
    paymentDate: "24 March 2024"
  },
  {
    id: "3",
    invoiceNo:"dsf2313sdas",
    note: "Maintenance",
    amount: 45,
    paymentDate: "24 March 2024"
  },
]