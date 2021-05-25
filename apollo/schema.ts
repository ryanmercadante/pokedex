import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './types'

export const schema = makeSchema({
  types,
  contextType: {
    module: join(process.cwd(), 'apollo', 'context.ts'),
    export: 'Context',
  },
})
