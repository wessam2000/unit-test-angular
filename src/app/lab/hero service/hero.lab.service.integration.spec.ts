import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Hero } from '../../hero';
import { MessageService } from '../../services/message/message.service';
import { HeroService } from '../../services/hero service/hero.service';

describe("3-hero service (http) integration testing:", () => {
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let service: HeroService;
  let httpTesting: HttpTestingController;
  const heroesUrl = 'http://localhost:3000/heroes';

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MessageService, useValue: mockMessageService }
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  it("getHeroes function: send request and receive response successfully", () => {
    const mockHero = { id: 3, name: 'spider man', strength: 11 };
    service.getHero(3).subscribe({
      next: (hero) => {
        expect(hero.name).toBe('spider man');
      },
    });
    const testReq = httpTesting.expectOne(heroesUrl + '/3');
    expect(testReq.request.method).toBe('GET');
    testReq.flush(mockHero);
  });

  it("updateHero function: send request and receive response successfully", () => {
    const mockHero: Hero = { id: 4, name: 'super man', strength: 20 };
    service.addHero(mockHero).subscribe({
      next: (hero) => {
        expect(hero).toEqual(mockHero);
      },
    });
    const testReq = httpTesting.expectOne(heroesUrl);
    expect(testReq.request.method).toBe('POST');
    testReq.flush(mockHero);
  });

  afterAll(() => {
    httpTesting.verify();
  });
});
