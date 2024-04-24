import { Item, emptyItem } from './../../models/item';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermissionPage } from 'src/app/core/models/permission-page';
import { BaseParam } from 'src/app/core/models/base-param';
import { ItemService } from '../../services/item.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Buttons, Pages } from 'src/permissions/permission-schema';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs';
import { read, utils, writeFile } from 'xlsx';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { DistributorService } from 'src/app/modules/distributor/services/distributor.service';
import { NzFilter } from 'src/app/core/models/nz-filter';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, PermissionPage {
  listData: Item[] = [];
  isLoading: boolean = false;
  total: number = 0;
  searchValue = '';
  visible: boolean = false;
  baseParam: BaseParam = new BaseParam();

  inputData!: string;

  trueFalseFilter: NzFilter[] = [
    { text: 'True', value: 'True' },
    { text: 'False', value: 'False' }
  ];

  distributorFilter: NzFilter[] = [];

  permissionSchema: any;

  editCache: { [key: string]: { edit: boolean; data: Item } } = {};
  uploading = false;
  uploadingFile: boolean = false;

  constructor(private itemService: ItemService,
    private distributorService: DistributorService,
    private router: Router,
    private readonly messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.initPermissionSchema();
    this.loadDistributors();
  }

  initPermissionSchema() {
    this.permissionSchema = {
      all: Pages.All,
      delete: Buttons.Delete + Pages.Item,
      insert: Buttons.Delete + Pages.Item,
      modify: Buttons.Modify + Pages.Item,
      upload: Buttons.Upload + Pages.Item,
      download: Buttons.Download + Pages.Item
    }
  }

  filterByDistributor($event: any) {
    console.log($event);
  }

  loadDistributors() {
    this.distributorService.getAll(this.baseParam).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(response => {
      this.distributorFilter = response.data.data.map(d => {
        return { text: d.code, value: d.code }
      });
    });
  }


  addNew() {
    this.router.navigate(['/admin/item/card'])
  }

  onQueryParamsChange = (params: NzTableQueryParams) => {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);

    this.baseParam.pageIndex = pageIndex;
    this.baseParam.pageSize = pageSize;
    this.baseParam.sortField = (currentSort && currentSort.key) || undefined;
    this.baseParam.sortOrder = (currentSort && currentSort.value) || undefined;
    this.baseParam.filters = filter.filter(f => f.value.length > 0);


    if (this.searchValue !== '') {
      this.baseParam.filters.push({ key: "description", value: this.searchValue });
    }

    if (this.distributorFilter.length > 0) {
      this.loadDataFromServer(this.baseParam);
    }
  }

  cancelEdit(no: string): void {
    const index = this.listData.findIndex(item => item.no === no);
    this.editCache[no] = {
      data: { ...this.listData[index] },
      edit: false
    };
  }

  saveEdit(no: string): void {
    this.isLoading = true;
    this.itemService.update(this.editCache[no].data).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.isSuccess) {
        const index = this.listData.findIndex(item => item.no === no);
        Object.assign(this.listData[index], res.data);
        this.editCache[no].edit = false;
      }
    });
  }

  updateEditCache(): void {
    this.listData.forEach(item => {
      this.editCache[item.no] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  loadDataFromServer(params: BaseParam): void {
    this.isLoading = true;
    this.itemService.getAll(params).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(response => {
      this.listData = response.data.data;
      this.total = response.data.count;
      this.updateEditCache();
    });
  }

  reset(): void {
    this.visible = false;
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.baseParam.filters = this.baseParam.filters.filter(f => f.key !== 'description');

    if (this.searchValue !== '') {
      this.baseParam.filters.push({ key: 'description', value: this.searchValue });
    }
    this.loadDataFromServer(this.baseParam);

  }

  editProduct(no: string) {
    this.editCache[no].edit = true;
  }

  delete(no: string) {
    this.isLoading = true;
    this.itemService.delete(no).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.isSuccess) {
        this.total--;
        this.listData = this.listData.filter(val => val.no !== no);

        // if (Math.floor(this.total / this.baseParam.pageSize) + 1 != this.baseParam.pageIndex) {
        //   this.listData.push(res.data);
        // }
      }
    });
  }

  handleExport() {
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    // utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, this.listData, { origin: 'A1', skipHeader: false });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Items.xlsx');
  }

  beforeUpload = (file: NzUploadFile): boolean => {

    const reader = new FileReader();
    reader.onload = (event: any) => {
      const wb = read(event.target.result);
      const sheets = wb.SheetNames;

      if (sheets.length) {
        const items = utils.sheet_to_json(wb.Sheets[sheets[0]]) as Item[];
        this.importToServer(items);
      }
    }
    reader.readAsArrayBuffer(file as any);
    return false;
  };

  pasteDataToTable(event: ClipboardEvent) {
    const pastedInput = event.clipboardData?.getData("text");
    if (pastedInput != undefined) {
      let rawRows = pastedInput.split("\r\n");

      if (rawRows[rawRows.length - 1] === '')
        rawRows.pop()

      let pastedItems: Item[] = [];
      let dataValid = true;
      const keys = Object.keys(emptyItem);
      const values = Object.values(emptyItem);

      rawRows.forEach((row, index) => {
        const fieldValues = row.split("\t");

        if (this.checkValidDataType(fieldValues, values)) {
          pastedItems.push(this.convertToObject(fieldValues, keys, values));
        }
        else {
          if (index !== 0 || fieldValues.length !== keys.length) {
            dataValid = false;
            this.messageService.create('error', 'Data invalid at row' + (index + 1))
          }
        }
      })

      if (dataValid)
        this.importToServer(pastedItems);
    }
  }

  checkValidDataType(fieldValues: string[], values: string[]) {

    if (values.length !== fieldValues.length) return false;
    for (let index = 0; index < values.length; index++) {
      let inValid = false;

      switch (typeof values[index]) {
        case 'number':
          if (!this.isNumber(fieldValues[index])) inValid = true;
          break;
        case 'boolean':
          if (!this.isBoolean(fieldValues[index])) inValid = true;
      }
      console.log(inValid, values[index]);

      if (inValid) return false;
    }
    return true;
  }

  convertToObject(fields: string[], keys: string[], values: string[]) {
    const entities = [];
    for (let index = 0; index < values.length; index++) {
      switch (typeof values[index]) {
        case 'number':
          entities.push([keys[index], parseInt(fields[index])]);
          break;
        case 'boolean':
          entities.push([keys[index], fields[index] == 'TRUE' ? true : false]);
          break;
        default:
          entities.push([keys[index], fields[index]]);
      }
    }
    return Object.fromEntries(entities);
  }

  isNumber(value: string): boolean {
    return !isNaN(parseInt(value));
  }

  isBoolean(value: string): boolean {
    return value == 'TRUE' || value == 'FALSE';
  }


  importToServer(items: Item[]) {
    this.isLoading = true;

    this.itemService.import(items).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe((response) => {
      if (response.isSuccess) {
        this.listData = response.data.data;
        this.total = response.data.count;
        this.baseParam.pageIndex = 1;
        this.updateEditCache();
        this.messageService.create('success', 'Update data successfully!');
        this.inputData = ''
      }
      else {
        this.messageService.create('error', response.errorMessage);
      }
    })
  }
}
