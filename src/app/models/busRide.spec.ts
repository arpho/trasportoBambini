import { BusRide } from "./busRide"

describe("BusRide should be instantiated correctly",()=>{
  it("instantiate without arguments",()=>{
    const test = new BusRide()
    expect(test).toBeDefined()
  })
})