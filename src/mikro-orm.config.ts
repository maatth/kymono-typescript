//@TODO : add proper logger
import { Options } from 'mikro-orm'
import { Post } from './entities/Post'

const config = {
  entities: [Post],
  entitiesDirsTs: ['src/entities'],
  dbName: 'kymono',
  type: 'mysql',
  host: 'localhost',
  user: 'root',
  password: 'snoopy15',
  port: 3306,
  debug: true,
  logger: console.log.bind(console),
} as Options

export default config
