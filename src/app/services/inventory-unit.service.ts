import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInventoryUnit } from '../modals/inventoryUnit';

@Injectable({
  providedIn: 'root'
})
export class InventoryUnitService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:5057/api/InventoryUnits"

  postUnits(inventoryUnit: IInventoryUnit) {
    return this.http.post(this.baseUrl, inventoryUnit);
  }
  getAvailableUnitsByBikeId(bikeId: string) {
    return this.http.get<IInventoryUnit[]>(`${this.baseUrl}?availability=true&bikeId=${bikeId}`);
  }
  getAllInventoryUnits() {
    return this.http.get<IInventoryUnit[]>(this.baseUrl);
  }
  deleteInventoryUnit(regNo : string){
    return this.http.delete(`${this.baseUrl}/${regNo}`)
  }
  getInventoryUnitByRegNo(regNo : string){
    return this.http.get(`${this.baseUrl}/${regNo}`)
  }
}
