export enum TransactionStatusEnum {
  COMPLETED = "COMPLETED",
  UNDERPROCESSED = "UNDERPROCESSED",
  REFUNDED = "REFUNDED",
  DECLINED = "DECLINED",
}

export enum PaymentmethodEnum {
  UPI = "UPI",
  DC = "DEBITCARD",
  CC = "CREDITCARD",
  WALLET = "WALLET",
  NB = "NETBANKING",
  EMI = "EMI",
  BNPL = "BNPL",
  NEFTRTGS = "NEFTRTGS",
  QR = "QR",
}

export enum CardTypeEnum {
  VISA = "VISA",
  MAST = "Mastercard",
  AMEX = "AMEX",
  SMAE = "SBI Maestro",
  MAES = "Maestro",
  DINR = "Diners",
  JCB = "JCB",
  RUPAY = "Rupay",
  RUPAYCC = "Rupay Credit Card",
}

export enum UPIBanksEnum {
  "Amazon Pay" = "Amazon Pay",
  BHIM = "BHIM",
  "BHIM BOI UPI" = "BHIM BOI UPI",
  "BHIM Canara" = "BHIM Canara",
  "BHIM DLB UPI" = "BHIM DLB UPI",
  "BHIM Indus Pay" = "BHIM Indus Pay",
  "BHIM PNB" = "BHIM PNB",
  "BHIM SBI Pay" = "BHIM SBI Pay",
  "DBS Digibank App" = "DBS Digibank App",
  Fampay = "Fampay",
  "Google Pay" = "Google Pay",
  Groww = "Groww",
  "ICICI iMobile" = "ICICI iMobile",
  Jupiter = "Jupiter",
  Mobikwik = "Mobikwik",
  "MyJio UPI" = "MyJio UPI",
  OkCredit = "OkCredit",
  Paytm = "Paytm",
  PayZapp = "PayZapp",
  PhonePe = "PhonePe",
  Slash = "Slash",
  Slice = "Slice",
  TataNeu = "TataNeu",
  Zomoto = "Zomoto",
}

export enum WalletBankEnum {
  PAYTM = "PayTM",
  FREC = "Freecharge",
  AMZPAY = "Amazon Pay",
  AMON = "Airtel Money",
  OXYCASH = "Oxigen",
  OLAM = "Ola Money",
  JIOM = "Jio Money",
  ITZC = "ItzCash",
  PAYZP = "HDFC PayZapp",
  YESW = "Yes Bank",
  mobikwik = "MobiKwik",
  PHONEPE = "PhonePe",
}

export enum NetBankingNamesEnum {
  AIRNB = "Airtel Payments Bank",
  AUSFNB = "AU Small Finance Bank",
  AUSFCNB = "AU Small Finance Bank - Corporate",
  AXIB = "AXIS Bank",
  AXISCNB = "Axis Corporate Netbanking",
  BBRB = "Bank of Baroda",
  BOIB = "Bank of India",
  BOMB = "Bank of Maharashtra",
  CABB = "Canara Bank",
  SYNDB = "Canara Bank (Erstwhile - Syndicate Bank)",
  CSFBC = "Capital Small Finance Bank Corporate",
  CSFBR = "Capital Small Finance Bank Retail",
  CSBN = "Catholic Syrian Bank",
  CBIB = "Central Bank Of India",
  CUBB = "City Union Bank",
  CSMSNB = "Cosmos Bank",
  DCBB = "DCB Bank",
  DSHB = "Deutsche Bank",
  DLNBCORP = "Dhanlaxmi Bank - Corporate",
  DLSB = "Dhanlaxmi Bank - Retail",
  FEDB = "Federal Bank",
  FEDCORP = "Federal Bank Corporate",
  HDFB = "HDFC Bank",
  HDFCCONB = "HDFC Bank - Corporate Banking",
  ICIB = "ICICI Bank",
  ICICICNB = "ICICI Corporate Netbanking",
  IDBB = "IDBI Bank",
  IDBICORP = "IDBI Corp Netbanking",
  IDFCNB = "IDFC FIRST Bank",
  INDB = "Indian Bank",
  ALLB = "Indian Bank (Erstwhile Allahabad Bank)",
  INOB = "Indian Overseas Bank",
  INIB = "IndusInd Bank",
  JAKB = "Jammu & Kashmir Bank",
  JANANB = "Jana Small Finance Bank",
  JSBNB = "Janata Sahakari Bank Pune",
  KRKB = "Karnataka Bank",
  KRVBC = "Karur Vysya - Corporate Banking",
  KRVB = "Karur Vysya Bank",
  "162B" = "Kotak Mahindra Bank",
  KTKBCORP = "Kotak Mahindra Bank - Corp Net Banking",
  KVBNBTPV = "KVB NB TPV",
  PAYTMNB = "Paytm Payments Bank",
  OBCB = "PNB (Erstwhile -Oriental Bank of Commerce)",
  UNIB = "PNB (Erstwhile-United Bank of India)",
  INDPOST = "Post Office Savings Bank (POSB)",
  PMEC = "Prime Co Op Bank Ltd",
  PSBNB = "Punjab & Sind Bank",
  PNBB = "Punjab National Bank",
  CPNB = "Punjab National Bank - Corporate Banking",
  RBLNB = "RBL Bank",
  RBLCNB = "RBL Corporate Netbanking",
  SRSWT = "Saraswat Bank",
  SHIVANB = "Shivalik Small Finance Bank",
  SOIB = "South Indian Bank",
  SCBNB = "Standard Chartered Bank",
  SBIB = "State Bank of India",
  SBNCORP = "State Bank of India (Corporate)",
  SVCNB = "SVC Co-operative Bank Ltd.",
  TMBB = "Tamilnad Mercantile Bank",
  UCOB = "UCO Bank",
  UCOCNB = "UCO Corporate",
  UBIB = "Union Bank of India",
  ADBB = "Union Bank of India (Erstwhile Andhra Bank)",
  CRPB = "Union Bank of India (Erstwhile Corporation Bank)",
  UBIBC = "Union Bank OLT - Corporate Banking",
  YESB = "Yes Bank",
}

interface paymentDetailsDto {
  email: string;
  refundedAmount: string;
  paymentMode: string;
  transactionId: string;
  upiId: string;
  cardNumber: string;
  cardCategory: string;
  walletName: string;
  bankCode: string;
  bank: string;
  refundDate: string;
  refundTime: string;
  referenceNumber: string;
  firstname: string;
  lastname: string;
}

export const getRefundDetails = (paymentDetails: paymentDetailsDto) => {
  const initialPayment: { [key: string]: string } = {
    PG_TYPE:
      paymentDetails.paymentMode === "CC" || paymentDetails.paymentMode === "DC"
        ? `${paymentDetails.paymentMode}-DG`
        : paymentDetails.paymentMode,
    addedon: `${paymentDetails.refundDate} ${paymentDetails.refundTime}:00`, // YYYY-MM-DD HH:MM:SS
    address1: "",
    address2: "",
    amount: paymentDetails.refundedAmount,
    bank_ref_num: paymentDetails.referenceNumber,
    city: "",
    country: "IN",
    discount: "0.00",
    email: paymentDetails.email,
    error: "E000",
    error_Message: "No Error",
    field1: "713447452475713900",
    field2: "245850",
    field3: paymentDetails.refundedAmount,
    field4: "",
    field5: "00",
    field6: "05",
    field7: "AUTHPOSITIVE",
    field8: "AUTHORIZED",
    field9: "Transaction is Successful",
    firstname: paymentDetails.firstname,
    // hash: "d0c76ad59245eee1fb7316e84cacf1552158235b4b35c88bdd45df0f449bc48c817a316e41ab4fefaa5661eb00a140f209daff445f13fad13f6f73098e7011f1",
    // key: "ARqsBX",
    lastname: paymentDetails.lastname,
    mode: paymentDetails.paymentMode,
    net_amount_debit: paymentDetails.refundedAmount,
    pa_name: "PayU",
    payment_source: "payu",
    phone: "",
    productinfo: "Product",
    state: "",
    status: "success",
    txnid: paymentDetails.transactionId,
    udf1: "",
    udf2: "",
    udf3: "",
    udf4: "",
    udf5: "",
    udf6: "",
    udf7: "",
    udf8: "",
    udf9: "",
    udf10: "",
    undefinedmihpayid: paymentDetails.referenceNumber,
    unmappedstatus: "captured",
    zipcode: "",
  };
  if (initialPayment["mode"] === "DC" || initialPayment["mode"] === "CC") {
    initialPayment["bankcode"] = paymentDetails.cardCategory;
    initialPayment["cardCategory"] = "domestic";
    initialPayment["cardnum"] = paymentDetails.cardNumber;
  } else if (initialPayment["mode"] === "UPI") {
    initialPayment["vpa"] = paymentDetails.upiId;
  } else if (initialPayment["mode"] === "WALLET") {
    initialPayment["bankcode"] = paymentDetails.walletName;
  } else if (initialPayment["mode"] === "NB") {
    initialPayment["bankcode"] = paymentDetails.bankCode;
  }
  return initialPayment;
};
