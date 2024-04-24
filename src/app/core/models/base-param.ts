import { Filter } from "./filter";

export class BaseParam {
  pageSize: number;
  pageIndex: number;
  sortField?: string;
  sortOrder?: string;
  filters: Filter[];

  constructor() {
    this.pageSize = 20;
    this.pageIndex = 1;
    this.filters = [];
  }
}
