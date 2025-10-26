import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrganizationEventsService} from '../../services/organization-events.service';
import {Store} from '@ngrx/store';
import * as fromOrgEvents from '../../reducers';
import * as EventActions from '../../actions/organization-events.actions';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {EventFormComponent} from '../../components/event-form/event-form.component';

@Component({
  selector: 'app-event-creation-page',
  templateUrl: './event-creation-page.component.html',
  styleUrls: ['./event-creation-page.component.scss'],
  standalone: true,
  imports: [CommonModule, EventFormComponent]
})
export class EventCreationPageComponent implements OnInit {

  constructor(private organizationEventsService: OrganizationEventsService,
              private store: Store<fromOrgEvents.State>,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
  }

  createEvent($event) {
    console.log('Creating event', $event);
    this.organizationEventsService.createEvent($event)
        .subscribe(
            (resp) => {
                this.store.dispatch(new EventActions.EventCreated(resp));
                this.toastr.success(`Event ${$event.name} created`, 'Create success')
                this.router.navigate([`/events/list`])
            },
            (err) => {
              console.error('problem creating event', err)
                this.toastr.error(`Event ${$event.name} failed to create: ${JSON.stringify(err)}`, 'Create failure')
            }
        )
  }

}
