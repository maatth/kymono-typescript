// const config = require('./config/config.json')
import { MikroORM } from 'mikro-orm'
import { Post } from './entities/Post'

module.exports = () => {
  return MikroORM.init({
    entities: [Post],
    dbName: 'kymono',
    type: 'mysql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'snoopy15',
    debug: true, //uncomment for debugging
    baseDir: __dirname, // defaults to `process.cwd()`
  })
}
