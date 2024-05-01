import { TestBed } from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { ApiService } from './api.service'

describe('ApiService', () => {
  let service: ApiService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    })
    service = TestBed.inject(ApiService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should add an item', () => {
    const itemData = { name: 'Test Item' }
    service.addItem(itemData).subscribe(response => {
      expect(response).toBeTruthy()
      // Add additional assertions for the response if needed
    })

    const req = httpMock.expectOne('/api/items')
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual(itemData)
    req.flush({}) // Mock response data
  })

  it('should update an item', () => {
    const itemId = 1
    const itemData = { name: 'Updated Item' }
    service.updateItem(itemId, itemData).subscribe(response => {
      expect(response).toBeTruthy()
      // Add additional assertions for the response if needed
    })

    const req = httpMock.expectOne(`/api/items/${itemId}`)
    expect(req.request.method).toBe('PUT')
    expect(req.request.body).toEqual(itemData)
    req.flush({}) // Mock response data
  })

  it('should get the item list', () => {
    service.getItemList().subscribe(response => {
      expect(response).toBeTruthy()
      // Add additional assertions for the response if needed
    })

    const req = httpMock.expectOne('/api/items')
    expect(req.request.method).toBe('GET')
    req.flush({}) // Mock response data
  })

  it('should delete an item', () => {
    const itemId = 1
    service.deleteItem(itemId).subscribe(response => {
      expect(response).toBeTruthy()
      // Add additional assertions for the response if needed
    })

    const req = httpMock.expectOne(`/api/items/${itemId}`)
    expect(req.request.method).toBe('DELETE')
    req.flush({}) // Mock response data
  })
})
