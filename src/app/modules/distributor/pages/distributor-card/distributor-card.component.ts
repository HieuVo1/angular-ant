import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Distributor } from '../../models/distributor';
import { DistributorService } from '../../services/distributor.service';
import { NzMessageService } from 'ng-zorro-antd/message';
interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
}
@Component({
  selector: 'app-distributor-card',
  templateUrl: './distributor-card.component.html',
  styleUrls: ['./distributor-card.component.css']
})
export class DistributorCardComponent {

  listOfOption: Array<{ label: string; value: string }> = [];
  distributorForm: FormGroup;
  isLoadingButtonSubmit: boolean = false;
  isLoadingProductEdit: boolean = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly distributorService: DistributorService,
    private readonly messageService: NzMessageService) {

    this.distributorForm = this.formBuilder.group({
      code: [null, Validators.required],
      description: [null, [Validators.required]],
      distributorH1Index1Code: [null],
      distributorH1Index2Code: [null],
      distributorH1Index3Code: [null],
      distributorH1Index4Code: [null],
      distributorH1Index5Code: [null],
      distributorH2Index1Code: [null],
      distributorH2Index2Code: [null],
      distributorH2Index3Code: [null],
      distributorH2Index4Code: [null],
      distributorH2Index5Code: [null],
      main: [false],
      active: [false]
    })

    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }

  submitForm() {
    this.isLoadingButtonSubmit = true;
    const distributor = this.distributorForm.value as Distributor;
    this.distributorService.create(distributor).subscribe(res => {
      if (res.isSuccess) {
        this.messageService.create('success', `Create distributor successfully!`);
        this.distributorForm.reset();
      }
      this.isLoadingButtonSubmit = false;
    });
  }
  listOfData: ItemData[] = [];
  i = 0;
  editId: string | null = null;

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Edward King ${this.i}`,
        age: '32',
        address: `London, Park Lane no. ${this.i}`
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  ngOnInit(): void {
    this.addRow();
    this.addRow();
  }
}
