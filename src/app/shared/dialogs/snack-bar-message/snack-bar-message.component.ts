import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-message',
  templateUrl: './snack-bar-message.component.html',
  styleUrls: ['./snack-bar-message.component.scss']
})
export class SnackBarMessageComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
