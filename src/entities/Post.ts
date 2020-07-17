import { PrimaryKey, Entity, Property } from 'mikro-orm'

@Entity()
export class Post {
  @PrimaryKey()
  id!: number

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date()

  @Property()
  title!: string

  @Property()
  content!: string

  constructor(title: string, content: string) {
    this.title = title
    this.content = content
  }
}
