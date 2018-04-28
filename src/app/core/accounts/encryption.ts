import { HashAlgorithm } from '@accounts/common';
import * as CryptoJS from 'crypto-js';
import { isString } from 'lodash';

const mapHashConstant = {
  sha: 'SHA',
  sha1: 'SHA1',
  sha224: 'SHA224',
  sha256: 'SHA256',
  sha384: 'SHA384',
  sha512: 'SHA512',
  md5: 'MD5',
  ripemd160: 'RIPEMD160',
};

export const hashPassword = (
  password,
  algorithm: HashAlgorithm
) => {
  if (isString(password)) {
    const cryptoAlgoKey = mapHashConstant[algorithm];
    const cryptoFunction = CryptoJS[cryptoAlgoKey];
    return {
      digest: cryptoFunction(password).toString(),
      algorithm,
    };
  }

  // Prehashed password object
  return password;
};
