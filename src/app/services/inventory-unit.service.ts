import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInventoryUnit } from '../modals/inventoryUnit';

@Injectable({
  providedIn: 'root'
})
export class InventoryUnitService {

  constructor(private http : HttpClient) { }
  postUnits(inventoryUnit : IInventoryUnit){
    return this.http.post("http://localhost:5057/api/InventoryUnits" , inventoryUnit);
  }
}
