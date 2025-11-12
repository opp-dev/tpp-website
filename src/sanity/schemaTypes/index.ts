import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {nowBlockContentType} from './nowBlockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {nowType} from './nowType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, nowBlockContentType, categoryType, postType, nowType, authorType],
}
