import {TestBed} from '@angular/core/testing';

import {GlobalCoreService} from './global-core.service';

describe('GlobalCoreService', () => {
    let service: GlobalCoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GlobalCoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
