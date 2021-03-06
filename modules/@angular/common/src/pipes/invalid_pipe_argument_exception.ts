import {Type, stringify} from '../../src/facade/lang';
import {BaseException} from '../../src/facade/exceptions';

export class InvalidPipeArgumentException extends BaseException {
  constructor(type: Type, value: Object) {
    super(`Invalid argument '${value}' for pipe '${stringify(type)}'`);
  }
}
