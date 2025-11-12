/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = 'lq0g3vki'
const dataset = 'production'

export default defineCliConfig({  deployment: {
  appId: 'zcxlu6dye2wmb0d6k3eux4e8',
},api: { projectId, dataset } })
