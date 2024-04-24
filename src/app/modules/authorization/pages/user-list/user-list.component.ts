import { Component } from '@angular/core';
import { User } from '../../models/user';
import { BaseParam } from 'src/app/core/models/base-param';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  listData: User[] = [];
  isLoading: boolean = false;
  total: number = 0;
  searchValue = '';
  visible: boolean = false;
  baseParam: BaseParam = new BaseParam();

  selectedData!: User;
  isShowModal: boolean = false;
  modalTitle!: string;
  isEditMode: boolean = false;
  constructor(private userService: UserService, private router: Router) {

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

    this.loadDataFromServer(this.baseParam);
  }

  loadDataFromServer(baseParam: BaseParam): void {
    this.isLoading = true;
    this.userService.getAll().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(response => {
      console.log(response);

      this.listData = response.data;
      this.total = response.data.length;
    });
  }

  search() {

  }
  reset() {

  }

  showModal() {
    this.modalTitle = 'ADD USER';
    this.isShowModal = true;
    this.isEditMode = false;
  }

  editUser(data: User) {
    this.modalTitle = 'EDIT USER';
    this.selectedData = { ...data };
    this.isShowModal = true;
    this.isEditMode = true;
  }

  closeModal() {
    this.isShowModal = false;
    this.isEditMode
  }

  insertUserSuccess(data: User) {
    this.listData = this.listData = [
      ...this.listData,
      data
    ];
    this.total++;
    this.isShowModal = false;
  }

  updateUserSuccess(data: User) {
    const index = this.listData.findIndex(r => r.userId === data.userId);
    Object.assign(this.listData[index], data);
    this.isShowModal = false;
  }

  deleteUser(userId: number) {
    this.isLoading = true;
    this.userService.delete(userId).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.isSuccess) {
        this.total--;
        this.listData = this.listData.filter(val => val.userId !== userId);
      }
    });
  }
}
