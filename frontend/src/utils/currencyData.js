const currencyData = [
  {
    title: "USD",
    value: "$",
  },
  {
    title: "CAD",
    value: "$",
  },
  {
    title: "EUR",
    value: "€",
  },
  {
    title: "AED",
    value: "د.إ.‏",
  },
  {
    title: "AFN",
    value: "؋",
  },
  {
    title: "ALL",
    value: "Lek",
  },
  {
    title: "AMD",
    value: "դր.",
  },
  {
    title: "ARS",
    value: "$",
  },
  {
    title: "AUD",
    value: "$",
  },
  {
    title: "AZN",
    value: "ман.",
  },
  {
    title: "BAM",
    value: "KM",
  },
  {
    title: "BDT",
    value: "৳",
  },
  {
    title: "BGN",
    value: "лв.",
  },
  {
    title: "BHD",
    value: "د.ب.‏",
  },
  {
    title: "BIF",
    value: "FBu",
  },
  {
    title: "BND",
    value: "$",
  },
  {
    title: "BOB",
    value: "Bs",
  },
  {
    title: "BRL",
    value: "R$",
  },
  {
    title: "BWP",
    value: "P",
  },
  {
    title: "BYN",
    value: "руб.",
  },
  {
    title: "BZD",
    value: "$",
  },
  {
    title: "CDF",
    value: "FrCD",
  },
  {
    title: "CHF",
    value: "CHF",
  },
  {
    title: "CLP",
    value: "$",
  },
  {
    title: "CNY",
    value: "CN¥",
  },
  {
    title: "COP",
    value: "$",
  },
  {
    title: "CRC",
    value: "₡",
  },
  {
    title: "CVE",
    value: "CV$",
  },
  {
    title: "CZK",
    value: "Kč",
  },
  {
    title: "DJF",
    value: "Fdj",
  },
  {
    title: "DKK",
    value: "kr",
  },
  {
    title: "DOP",
    value: "RD$",
  },
  {
    title: "DZD",
    value: "د.ج.‏",
  },
  {
    title: "EEK",
    value: "kr",
  },
  {
    title: "EGP",
    value: "ج.م.‏",
  },
  {
    title: "ERN",
    value: "Nfk",
  },
  {
    title: "ETB",
    value: "Br",
  },
  {
    title: "GBP",
    value: "£",
  },
  {
    title: "GEL",
    value: "GEL",
  },
  {
    title: "GHS",
    value: "GH₵",
  },
  {
    title: "GNF",
    value: "FG",
  },
  {
    title: "GTQ",
    value: "Q",
  },
  {
    title: "HKD",
    value: "$",
  },
  {
    title: "HNL",
    value: "L",
  },
  {
    title: "HRK",
    value: "kn",
  },
  {
    title: "HUF",
    value: "Ft",
  },
  {
    title: "IDR",
    value: "Rp",
  },
  {
    title: "ILS",
    value: "₪",
  },
  {
    title: "INR",
    value: "₹",
  },
  {
    title: "IQD",
    value: "د.ع.‏",
  },
  {
    title: "IRR",
    value: "﷼",
  },
  {
    title: "ISK",
    value: "kr",
  },
  {
    title: "JMD",
    value: "$",
  },
  {
    title: "JOD",
    value: "د.أ.‏",
  },
  {
    title: "JPY",
    value: "￥",
  },
  {
    title: "KES",
    value: "Ksh",
  },
  {
    title: "KHR",
    value: "៛",
  },
  {
    title: "KMF",
    value: "FC",
  },
  {
    title: "KRW",
    value: "₩",
  },
  {
    title: "KWD",
    value: "د.ك.‏",
  },
  {
    title: "KZT",
    value: "тңг.",
  },
  {
    title: "LBP",
    value: "ل.ل.‏",
  },
  {
    title: "LKR",
    value: "SL Re",
  },
  {
    title: "LTL",
    value: "Lt",
  },
  {
    title: "LVL",
    value: "Ls",
  },
  {
    title: "LYD",
    value: "د.ل.‏",
  },
  {
    title: "MAD",
    value: "د.م.‏",
  },
  {
    title: "MDL",
    value: "MDL",
  },
  {
    title: "MGA",
    value: "MGA",
  },
  {
    title: "MKD",
    value: "MKD",
  },
  {
    title: "MMK",
    value: "K",
  },
  {
    title: "MOP",
    value: "MOP$",
  },
  {
    title: "MUR",
    value: "MURs",
  },
  {
    title: "MXN",
    value: "$",
  },
  {
    title: "MYR",
    value: "RM",
  },
  {
    title: "MZN",
    value: "MTn",
  },
  {
    title: "NAD",
    value: "N$",
  },
  {
    title: "NGN",
    value: "₦",
  },
  {
    title: "NIO",
    value: "C$",
  },
  {
    title: "NOK",
    value: "kr",
  },
  {
    title: "NPR",
    value: "नेरू",
  },
  {
    title: "NZD",
    value: "$",
  },
  {
    title: "OMR",
    value: "ر.ع.‏",
  },
  {
    title: "PAB",
    value: "B/.",
  },
  {
    title: "PEN",
    value: "S/.",
  },
  {
    title: "PHP",
    value: "₱",
  },
  {
    title: "PKR",
    value: "₨",
  },
  {
    title: "PLN",
    value: "zł",
  },
  {
    title: "PYG",
    value: "₲",
  },
  {
    title: "QAR",
    value: "ر.ق.‏",
  },
  {
    title: "RON",
    value: "RON",
  },
  {
    title: "RSD",
    value: "дин.",
  },
  {
    title: "RUB",
    value: "₽.",
  },
  {
    title: "RWF",
    value: "FR",
  },
  {
    title: "SAR",
    value: "ر.س.‏",
  },
  {
    title: "SDG",
    value: "SDG",
  },
  {
    title: "SEK",
    value: "kr",
  },
  {
    title: "SGD",
    value: "$",
  },
  {
    title: "SOS",
    value: "Ssh",
  },
  {
    title: "SYP",
    value: "ل.س.‏",
  },
  {
    title: "THB",
    value: "฿",
  },
  {
    title: "TND",
    value: "د.ت.‏",
  },
  {
    title: "TOP",
    value: "T$",
  },
  {
    title: "TRY",
    value: "TL",
  },
  {
    title: "TTD",
    value: "$",
  },
  {
    title: "TWD",
    value: "NT$",
  },
  {
    title: "TZS",
    value: "TSh",
  },
  {
    title: "UAH",
    value: "₴",
  },
  {
    title: "UGX",
    value: "USh",
  },
  {
    title: "UYU",
    value: "$",
  },
  {
    title: "UZS",
    value: "UZS",
  },
  {
    title: "VEF",
    value: "Bs.F.",
  },
  {
    title: "VND",
    value: "₫",
  },
  {
    title: "XAF",
    value: "FCFA",
  },
  {
    title: "XOF",
    value: "CFA",
  },
  {
    title: "YER",
    value: "ر.ي.‏",
  },
  {
    title: "ZAR",
    value: "R",
  },
  {
    title: "ZMK",
    value: "ZK",
  },
  {
    title: "ZWL",
    value: "ZWL$",
  },
];
export default currencyData;
