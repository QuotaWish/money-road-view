import IP2Region from 'ip2region';
import { UAParser } from 'ua-parser-js';

export function getUserAgentInfo(userAgent: string) {
  return UAParser(userAgent)
}

export class GaLocation {
  private _location: IP2Region;

  constructor() {
    this._location = new IP2Region()
  }

  getLocation() {
    return this._location
  }
}

export const gaLocation = new GaLocation();