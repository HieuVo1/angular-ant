export interface Item {
  distributorCode: string;
  no: string;
  description: string;
  baseUnitOfMeasure: string;
  unitPrice: number;
  unitCost: number;
  blocked: boolean;
  itemTrackingCode: string;
  lotNo: string;
  pOSM: boolean;
  purchaseUOMCode: string;
  reportUOMCode: string;
  sellingUOMCode: string;
  defaultUOMCode: string;
  productIndex1Code: string;
  productIndex2Code: string;
  productIndex3Code: string;
  productIndex4Code: string;
  productIndex5Code: string;
  productIndex6Code: string;
  productIndex7Code: string;
  productIndex8Code: string;
  productIndex9Code: string;
  productIndex10Code: string;
  productIndex1Name: string;
  productIndex2Name: string;
  productIndex3Name: string;
  productIndex4Name: string;
  productIndex5Name: string;
  productIndex6Name: string;
  productIndex7Name: string;
  productIndex8Name: string;
  productIndex9Name: string;
  productIndex10Name: string;
  fromDistributor: boolean;
}

export const emptyItem: Item = {
  distributorCode: "",
  no: "",
  description: "",
  baseUnitOfMeasure: "",
  unitPrice: 0,
  unitCost: 0,
  blocked: false,
  itemTrackingCode: "",
  lotNo: "",
  pOSM: false,
  purchaseUOMCode: "",
  reportUOMCode: "",
  sellingUOMCode: "",
  defaultUOMCode: "",
  productIndex1Code: "",
  productIndex2Code: "",
  productIndex3Code: "",
  productIndex4Code: "",
  productIndex5Code: "",
  productIndex6Code: "",
  productIndex7Code: "",
  productIndex8Code: "",
  productIndex9Code: "",
  productIndex10Code: "",
  productIndex1Name: "",
  productIndex2Name: "",
  productIndex3Name: "",
  productIndex4Name: "",
  productIndex5Name: "",
  productIndex6Name: "",
  productIndex7Name: "",
  productIndex8Name: "",
  productIndex9Name: "",
  productIndex10Name: "",
  fromDistributor: false
}