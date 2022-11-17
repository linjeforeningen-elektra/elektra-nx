import { Component, Input, OnInit } from '@angular/core';
import { JobModel } from '@elektra-nx/shared/models';

@Component({
  selector: 'elektra-nx-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],
})
export class JobItemComponent implements OnInit {
  constructor() {}

  @Input() job?: JobModel;

  ngOnInit(): void {}
}
