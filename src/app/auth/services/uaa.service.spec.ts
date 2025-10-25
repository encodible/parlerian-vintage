import {inject, TestBed} from '@angular/core/testing';

import {UaaService} from './uaa.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('UaaService', () => {
    let httpTestingController: HttpTestingController;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UaaService]
        });
        httpTestingController = TestBed.get(HttpTestingController)
    });


    it('should be created', inject([UaaService], (service: UaaService) => {
        expect(service).toBeTruthy();
    }));
});
