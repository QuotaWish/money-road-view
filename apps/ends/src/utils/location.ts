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

/**
 * @description: 获取客户端真实 IP
 * @param {Request} req
 */
export const getRealIp = (req: Request): string => {
  const result = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress || req.ip;
  return Array.isArray(result) ? result[0] : result;
};