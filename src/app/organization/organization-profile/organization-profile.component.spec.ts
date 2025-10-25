import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganizationProfileComponent} from './organization-profile.component';
import {MdModule} from '../../core/containers/md/md.module';
import {MaterialModule} from '../../app.module';

describe('OrganizationProfileComponent', () => {
    let component: OrganizationProfileComponent;
    let fixture: ComponentFixture<OrganizationProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MdModule,
                MaterialModule
            ],
            declarations: [OrganizationProfileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrganizationProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
