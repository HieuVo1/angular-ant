import { Component, OnInit } from '@angular/core';
import { DistributorService } from '../../services/distributor.service';
import { finalize } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BaseParam } from 'src/app/core/models/base-param';
import { Router } from '@angular/router';
import { PermissionPage } from 'src/app/core/models/permission-page';
import { Buttons, Pages } from 'src/permissions/permission-schema';
import { read, utils, writeFile } from 'xlsx';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Distributor } from '../../models/distributor';

@Component({
  selector: 'app-distributor-list',
  templateUrl: './distributor-list.component.html',
  styleUrls: ['./distributor-list.component.css']
})
export class DistributorListComponent implements PermissionPage, OnInit {
  listData: Distributor[] = [];
  isLoading: boolean = false;
  total: number = 0;
  searchValue = '';
  visible: boolean = false;
  baseParam: BaseParam = new BaseParam();
  listOfFilter = [
    { text: 'True', value: 'True' },
    { text: 'False', value: 'False' }
  ];

  permissionSchema: any;

  editCache: { [key: string]: { edit: boolean; data: Distributor } } = {};
  uploading = false;
  uploadingFile: boolean = false;
  constructor(private distributorService: DistributorService,
    private router: Router,
    private readonly messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.initPermissionSchema();
  }

  initPermissionSchema() {
    this.permissionSchema = {
      all: Pages.All,
      delete: Buttons.Delete + Pages.Distributor,
      insert: Buttons.Delete + Pages.Distributor,
      modify: Buttons.Modify + Pages.Distributor,
      upload: Buttons.Upload + Pages.Distributor,
      download: Buttons.Download + Pages.Distributor
    }
  }

  addNew() {
    this.router.navigate(['/admin/distributor/card'])
  }

  onQueryParamsChange = (params: NzTableQueryParams) => {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);

    this.baseParam.pageIndex = pageIndex;
    this.baseParam.pageSize = pageSize;
    this.baseParam.sortOrder = (currentSort && currentSort.value) || undefined;
    this.baseParam.sortField = (currentSort && currentSort.key) || undefined;
    this.baseParam.filters = filter.filter(f => f.value.length > 0);


    if (this.searchValue !== '') {
      this.baseParam.filters.push({ key: "description", value: this.searchValue });
    }

    this.loadDataFromServer(this.baseParam);
  }

  cancelEdit(code: string): void {
    const index = this.listData.findIndex(item => item.code === code);
    this.editCache[code] = {
      data: { ...this.listData[index] },
      edit: false
    };
  }

  saveEdit(code: string): void {
    this.isLoading = true;
    this.distributorService.update(this.editCache[code].data).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.isSuccess) {
        const index = this.listData.findIndex(item => item.code === code);
        Object.assign(this.listData[index], res.data);
        this.editCache[code].edit = false;
      }
    });
  }

  updateEditCache(): void {
    this.listData.forEach(item => {
      this.editCache[item.code] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  loadDataFromServer(params: BaseParam): void {
    this.isLoading = true;
    this.distributorService.getAll(params).pipe(
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

  editProduct(code: string) {
    this.editCache[code].edit = true;
  }

  delete(code: string) {
    this.isLoading = true;
    this.distributorService.delete(code).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.isSuccess) {
        this.total--;
        this.listData = this.listData.filter(val => val.code !== code);

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
    writeFile(wb, 'Distributor.xlsx');
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.uploadingFile = true;

    const reader = new FileReader();
    reader.onload = (event: any) => {
      const wb = read(event.target.result);
      const sheets = wb.SheetNames;

      if (sheets.length) {

        const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]) as Distributor[];
        this.distributorService.import(rows).pipe(
          finalize(() => this.uploadingFile = false)
        ).subscribe((response) => {
          if (response.isSuccess) {
            this.listData = response.data.data;
            this.total = response.data.count;
            this.baseParam.pageIndex = 1;
            this.updateEditCache();
            this.messageService.create('success', 'Update data successfully!');
          }
          else {
            this.messageService.create('error', response.errorMessage);
          }
        })
      }
    }
    reader.readAsArrayBuffer(file as any);
    return false;
  };
}
