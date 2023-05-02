import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SalesService } from 'src/app/services/sales.service';

interface VendorDropDown {
  vendorCode: string;
  vendorName: string;
}

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss'],
})
export class SalesChartComponent implements OnInit {
  form!: FormGroup;
  vendorDropDownData: VendorDropDown[] = [];
  public chartOptions: any;

  constructor(private salesApi: SalesService, private fb: FormBuilder) {
    this.form = this.fb.group({
      vendorName: [''],
    });

    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 540,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  ngOnInit(): void {}
  loadData() {
    this.salesApi.getPendingSOListSO().subscribe((res) => {
      if (res.length) {
        const newMap = new Map();
        res
          .map((item: any) => {
            return {
              vendorName: item.vendorName,
              vendorCode: item.vendorCode,
            };
          })
          .forEach((item: VendorDropDown) => newMap.set(item.vendorCode, item));
        this.vendorDropDownData = [...newMap.values()];
      }
    });
  }
}
