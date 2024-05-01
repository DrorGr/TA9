import { MasterService } from './master.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { Item } from '../_models/item'
import { TestBed } from '@angular/core/testing' // Import the necessary module

describe('MasterService', () => {
  let service: MasterService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MasterService],
    })
    service = TestBed.inject(MasterService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should have access', () => {
    const result = service.haveaccess()
    expect(result).toBeTruthy()
  })
})
let httpMock: HttpTestingController

afterEach(() => {
  httpMock.verify()
})

let service: MasterService

beforeEach(() => {
  service = TestBed.inject(MasterService)
})

it('should be created', () => {
  expect(service).toBeTruthy()
})

it('should retrieve all items', () => {
  const mockItems: Item[] = [
    { id: 1, name: 'Item 1', color: 'red' },
    { id: 2, name: 'Item 2', color: 'blue' },
  ]

  service.Getallitems().subscribe(items => {
    expect(items).toEqual(mockItems)
  })

  const req = httpMock.expectOne('http://localhost:3000/items')
  expect(req.request.method).toBe('GET')
  req.flush(mockItems)
})

const newItem: Item = { id: 1, name: 'New Item', color: 'blue' }

service.CreateItem(newItem).subscribe(response => {
  expect(response).toBeTruthy()
})

const createReq = httpMock.expectOne('http://localhost:3000/items') // Rename the variable to 'createReq'
expect(createReq.request.method).toBe('POST')
expect(createReq.request.body).toEqual(newItem)
createReq.flush({})

const updatedItem: Item = { id: 1, name: 'Updated Item', color: 'blue' }

service.UpdateItem(updatedItem).subscribe(response => {
  expect(response).toBeTruthy()
})

const req = httpMock.expectOne('http://localhost:3000/items/1')
expect(req.request.method).toBe('PUT')
expect(req.request.body).toEqual(updatedItem)
req.flush({})

it('should delete an item', () => {
  const itemId = 1

  service.DeleteItem(itemId).subscribe(response => {
    expect(response).toBeTruthy()
  })

  const req = httpMock.expectOne('http://localhost:3000/items/1')
  expect(req.request.method).toBe('DELETE')
  req.flush({})
})

it('should have access', () => {
  const result = service.haveaccess()
  expect(result).toBeTrue()
})
