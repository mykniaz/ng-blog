import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Subscription} from 'rxjs';
import {
  trigger,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({
              right: '3rem',
              bottom: '0',
              opacity: '0',
            }),
            animate('0.25s ease-out',
              style({
                right: '3rem',
                bottom: '3rem',
                opacity: 1
              }),
            ),
          ]
        ),
        transition(
          ':leave',
          [
            style({
              right: '3rem',
              bottom: '3rem',
              opacity: 1
            }),
            animate('0.25s ease-in',
              style({
                right: '3rem',
                bottom: '0',
                opacity: 0,
              }))
          ]
        )
      ]
    )
  ]
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 2000;

  text = '';
  type = 'success';
  timeout: number;

  alertSub: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;

      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        this.text = '';
        this.type = 'success';
      }, this.delay);
    });
  }

  close() {
    clearTimeout(this.timeout);
    this.text = '';
    this.type = 'success';
  }

  ngOnDestroy(): void {
    this.alertSub.unsubscribe();
  }

}
