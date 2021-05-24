import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './types'

export const schema = makeSchema({
  types,
  shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  contextType: {
    module: join(process.cwd(), 'apollo', 'context.ts'),
    export: 'Context',
  },
})
