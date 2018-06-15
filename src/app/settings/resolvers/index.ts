import * as merge from 'lodash.merge';

import * as settings from './settings';
export { schema } from './schema';

export const resolvers = merge({}, settings.resolvers);
export const defaults = merge({}, settings.defaults);
