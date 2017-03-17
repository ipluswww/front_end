export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
//   this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
//   this.namespace = 'api/v1';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  this.post('/token', () => {
    return {
      auth: {
        id: 1,
        email: 'demo@demo'
      }
    };
  });

  this.post('api/v1/login', () => {
    return {
      id: 1,
      sessionId: 'demo@demo',
      sessionName: 'some token'
    };
  });

  this.post('api/users/v1/users', () => {
    return {
      id: 1,
      email: 'demo@demo.com'
    };
  });

  this.put('api/users/v1/users/1', () => {
    return {
      id: 1,
      email: 'demo@demo.com',
      firstName: 'Demo',
      lastName: 'User',
      phoneNumber: '1231231231'
    };
  });

  this.post('api/users/v1/sessions', () => {
    return {
      "links": null,
      "data": {
        "type": "sessions",
        "id": "glS6XldJXqtCqQyXLYdRpw6VzIO06rvuuP3RHvlndDL8dkpKo5iZyhAFD3L8KqbqlGCBf9ImJUuGIBDgUBqAXRJXolWVxLYwODbKpoEm2GJxDGupS55yJWv5YuWzTREC",
        "attributes": {
          "created": "1461484065",
          "expires": "1462088865"
        },
        "relationships": {
          "users": {
            "type": "users",
            "id": "5717b850a275a800016d1833"
          }
        }
      }
    };
  });


  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
