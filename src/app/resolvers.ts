import { toIdValue } from 'apollo-utilities';
import * as merge from 'lodash.merge';

import * as settings from './settings/resolvers';

export const resolvers = merge(
  {},
  settings.resolvers,
);

export const defaults = merge(
  {},
  settings.defaults,
);

export const redirects = (cache: any) => ({
/*  Query: {
    book: (_, { id }) => toIdValue(`Book:${id}`),
  },
  */
});

export const schema = [  settings.schema];
