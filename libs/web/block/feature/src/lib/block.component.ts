import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'elektra-nx-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  @Input() id: string;

  ngOnInit(): void {}
}
