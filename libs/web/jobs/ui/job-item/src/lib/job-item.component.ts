import { Component, Input, OnInit } from '@angular/core';
import { Job } from '@elektra-nx/web/jobs/data-access';

@Component({
  selector: 'elektra-nx-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],
})
export class JobItemComponent implements OnInit {
  constructor() {}

  @Input() job?: Job;

  ngOnInit(): void {}
}
