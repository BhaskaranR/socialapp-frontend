import { FormControl } from '@angular/forms';

export class ZipcodeValidator {

  static validZipCode(fc: FormControl){
    const postalCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if( postalCodeRegex.test(fc.value)) {
       return null
    } else {
        return {isValidPostalCode: true}
    }
  }
}
