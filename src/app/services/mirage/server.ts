import { Factory, Model, createServer } from 'miragejs'

import { users } from '../../../../data.json'

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
    },

    factories: {
      user: Factory.extend({
        id(i) {
          return users[i].id
        },
        name(i) {
          return users[i].name
        },
      }),
    },

    seeds(server) {
      server.createList('user', users.length)
    },

    routes() {
      this.namespace = 'api'

      this.get('/users', (schema) => {
        return schema.all('user')
      })
    },
  })

  return server
}
