import {isNumeric} from 'rxjs/internal/util/isNumeric';
import * as moment from 'moment';

export class ValidateHelper {

  public static validBoolean(_value: boolean, _resultNoValid = false): boolean {
    if (_value !== undefined && _value !== null) {
      return _value;
    }
    return _resultNoValid;
  }

  public static validString(_value: any, _case = '', _resultNoValid = ''): string {
    if (_value && _value.toString().trim()) {
      if (_case === 'upper') {
        return _value.toString().trim().toUpperCase();
      } else if (_case === 'lower') {
        return _value.toString().trim().toLowerCase();
      }
      return _value.toString().trim();
    }
    return _resultNoValid;
  }

  public static validDateToString(_value: any, _format = '', _resultNoValid = ''): string {
    if (_value && moment(_value).isValid()) {
      if (_format) {
        return moment(_value).format(_format);
      }
      return moment(_value).toISOString();
    }
    return _resultNoValid;
  }

  public static validDate(_value: any, _format = '', _resultNoValid = null): Date {
    if (_value && moment(_value, _format).isValid()) {
      return moment(_value, _format).toDate();
    }

    return _resultNoValid;
  }

  public static validArray(_value: any, _resultNoValid = []): Array<any> {
    if (_value && (_value instanceof Array)) {
      return _value;
    }
    return _resultNoValid;
  }

  public static validNumber(_value: any, _resultNoValid: number = null): number {
    if (_value !== undefined && _value !== null) {
      if (isNumeric(_value)) {
        return Number(_value);
      }
    }
    return _resultNoValid;
  }

  public static yesOrNoToBoolean(value: string): boolean {
    if (value) {
      return (value === 'S');
    }
    return false;
  }

  public static booleanToBinary(value: boolean): number {
    if (value) {
      return 1;
    }
    return 0;
  }

  public static RandomString(_length: number = 10) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ';
    const stringLength = _length;
    let randomstring = '';
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
  }

  public static padStart(value: number | string, size: number) {
    let resp = `${value}`;
    while (resp.length < size) {
      resp = '0' + resp;
    }
    return resp;
  }
}
