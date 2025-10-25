import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventCreationForm} from '../../models/OrganizationEvent';
import moment from 'moment';
import {MyErrorStateMatcher} from '../../../core/components/advanced-search/MyErrorStateMatcher';

declare var $: any;

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

    initEvent: EventCreationForm = this.getEmptyEvent();
    @Output()
    onChange = new EventEmitter<EventCreationForm>();
    @Output()
    onClear = new EventEmitter<any>();

    momentPattern = 'MM/DD/YYYY hh:mm A'
    now = moment().format(this.momentPattern).toLocaleLowerCase()

    eventForm: FormGroup
    matcher = new MyErrorStateMatcher();

    eventNameControl = new FormControl('', [Validators.required])
    descriptionControl = new FormControl('', [Validators.required])
    startTimeControl = new FormControl('', [Validators.required])
    endTimeControl = new FormControl('', [Validators.required])

    validEventName = false;
    validDescription = false;
    validStartTime = false;
    validEndTime = false;

    namePattern = /^[a-zA-Z0-9\s_.-]*$/;
    timestampPattern = /^(((0[13578]|1[02])[\/\.-](0[1-9]|[12]\d|3[01])[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((0[13456789]|1[012])[\/\.-](0[1-9]|[12]\d|30)[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((02)[\/\.-](0[1-9]|1\d|2[0-8])[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((02)[\/\.-](29)[\/\.-]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm)))$/;

    constructor(private location: Location,
                private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.initializeForm(this.formBuilder)
        $(function() {
            $('#datetimepicker1').datetimepicker();
        });
        $(function() {
            $('#datetimepicker2').datetimepicker();
        });
    }

    back() {
        this.location.back();
    }

    clearForm() {
        this.initEvent = this.getEmptyEvent();
        this.initializeForm(this.formBuilder);
        this.onClear.emit({});
    }

    emitFormValue() {
        this.onChange.emit(this.convertTimestamps(this.eventForm.value));
    }

    convertTimestamps(formData) {
        return {
            name: formData.eventName,
            description: formData.description,
            startTime: moment(formData.startTime, this.momentPattern).parseZone().format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment(formData.endTime, this.momentPattern).parseZone().format('YYYY-MM-DD HH:mm:ss')
        }
    }

    getEmptyEvent(): EventCreationForm {
        return {
            name: '',
            description: '',
            startTime: this.now,
            endTime: this.now
        }
    }

    initializeForm(formBuilder: FormBuilder) {
        if (this.initEvent === null) {
            this.initEvent = this.getEmptyEvent()
        }
        this.eventForm = formBuilder.group({
            eventName: [this.initEvent.name, [Validators.required, Validators.pattern(this.namePattern)]],
            description: [this.initEvent.description, [Validators.required, Validators.pattern(this.namePattern)]],
            startTime: [this.initEvent.startTime, [Validators.required]],
            endTime: [this.initEvent.startTime, [Validators.required]]
        })
    }

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    eventNameValidation(e) {
        this.validEventName = this.namePattern.test(String(e))
    }

    descriptionValidation(e) {
        this.validDescription = this.namePattern.test(String(e));
    }

    startTimeValidation(e) {
        this.validStartTime = moment(e, this.momentPattern).isValid()
    }

    endTimeValidation(e) {
        this.validEndTime = moment(e, this.momentPattern).isValid()
    }

}
