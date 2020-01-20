import { TestBed } from '@angular/core/testing';

import { TipoClienteService } from './tipo-cliente.service';

describe('TipoClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoClienteService = TestBed.get(TipoClienteService);
    expect(service).toBeTruthy();
  });
});
