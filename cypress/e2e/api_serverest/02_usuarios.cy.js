import { response } from '../../support/responseElements'
const faker = require('faker-br')

describe('Usuários API Tests - SERVEREST', () => {
  context('Método GET - Listar Usuários Cadastrados', () => {
    it('Listar todos os usuários com sucesso', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios'
      }).then(res => {
        expect(res.status).to.eq(200)
        expect(res.body).to.property('quantidade')
        expect(res.body).to.property('usuarios')
        expect(res.body.usuarios[0]).to.property('nome')
        expect(res.body.usuarios[0]).to.property('email')
        expect(res.body.usuarios[0]).to.property('password')
        expect(res.body.usuarios[0]).to.property('administrador')
        expect(res.body.usuarios[0]).to.property('_id')
      })
    })
    it('Listar usuários com filtro por ID existente', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios'
      }).then(value => {
        cy.request({
          method: 'GET',
          url: '/usuarios',
          qs: {
            _id: value.body.usuarios[0]._id
          }
        }).then(res => {
          expect(res.status).to.eq(200)
          expect(res.body).to.property('quantidade').to.eq(1)
          expect(res.body.usuarios[0]).to.property('nome').to.eq(value.body.usuarios[0].nome)
          expect(res.body.usuarios[0]).to.property('email').to.eq(value.body.usuarios[0].email)
          expect(res.body.usuarios[0]).to.property('password').to.eq(value.body.usuarios[0].password)
          expect(res.body.usuarios[0]).to.property('administrador').to.eq(value.body.usuarios[0].administrador)
          expect(res.body.usuarios[0]).to.property('_id').to.eq(value.body.usuarios[0]._id)
        })
      })
    })
    it('Listar usuários com filtro por ID inexistente', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios',
        qs: {
          _id: 'afeg'
        }
      }).then(res => {
        expect(res.status).to.eq(200)
        expect(res.body).to.property('quantidade').to.eq(0)
        expect(res.body.usuarios).to.length(0)
      })
    })
    it('Listar usuários com filtro por NOME existente', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios'
      }).then(value => {
        cy.request({
          method: 'GET',
          url: '/usuarios',
          qs: {
            nome: value.body.usuarios[0].nome
          }
        }).then(res => {
          expect(res.status).to.eq(200)
          expect(res.body.usuarios[0]).to.property('nome').to.eq(value.body.usuarios[0].nome)
          expect(res.body.usuarios[0]).to.property('email').to.eq(value.body.usuarios[0].email)
          expect(res.body.usuarios[0]).to.property('password').to.eq(value.body.usuarios[0].password)
          expect(res.body.usuarios[0]).to.property('administrador').to.eq(value.body.usuarios[0].administrador)
          expect(res.body.usuarios[0]).to.property('_id').to.eq(value.body.usuarios[0]._id)
        })
      })
    })
    it('Listar usuários com filtro por NOME inexistente', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios',
        qs: {
          nome: 'afeg'
        }
      }).then(res => {
        expect(res.status).to.eq(200)
        expect(res.body).to.property('quantidade').to.eq(0)
        expect(res.body.usuarios).to.length(0)
      })
    })
    it('Listar usuários com filtro por EMAIL cadastrado', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios'
      }).then(value => {
        cy.request({
          method: 'GET',
          url: '/usuarios',
          qs: {
            email: value.body.usuarios[0].email
          }
        }).then(res => {
          expect(res.status).to.eq(200)
          expect(res.body.usuarios[0]).to.property('nome').to.eq(value.body.usuarios[0].nome)
          expect(res.body.usuarios[0]).to.property('email').to.eq(value.body.usuarios[0].email)
          expect(res.body.usuarios[0]).to.property('password').to.eq(value.body.usuarios[0].password)
          expect(res.body.usuarios[0]).to.property('administrador').to.eq(value.body.usuarios[0].administrador)
          expect(res.body.usuarios[0]).to.property('_id').to.eq(value.body.usuarios[0]._id)
        })
      })
    })
    it('Listar usuários com filtro por EMAIL inexistente', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios',
        qs: {
          email: `${faker.internet.exampleEmail()}`
        }
      }).then(res => {
        expect(res.status).to.eq(200)
        expect(res.body).to.property('quantidade').to.eq(0)
        expect(res.body.usuarios).to.length(0)
      })
    })
    it('Listar usuários com filtro por EMAIL com formato inválido', () => {
      cy.fixture('credentials').then(data => {
        cy.request({
          method: 'GET',
          url: '/usuarios',
          qs: {
            email: data.invalido.emailFormatoInvalido
          },
          failOnStatusCode: false
        }).then(res => {
          expect(res.status).to.eq(400)
          expect(res.body).to.property('email').to.eq(response.emailFormatoInvalido)
        })
      })
    })
    it('Listar usuários com filtro por administrador válido', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios',
        qs: {
          administrador: true
        },
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.usuarios[0]).to.property('administrador').to.eq('true')
      })
      cy.request({
        method: 'GET',
        url: '/usuarios',
        qs: {
          administrador: false
        },
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.usuarios[0]).to.property('administrador').to.eq('false')
      })
    })
    it('Listar usuários com filtro por administrador inválido', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios',
        qs: {
          administrador: 'abe'
        },
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.property('administrador').to.eq(response.administradorInvalido)
      })
    })
    it('Listar usuários com filtro por NOME e EMAIL existentes', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios'
      }).then(value => {
        cy.request({
          method: 'GET',
          url: '/usuarios',
          qs: {
            nome: value.body.usuarios[0].nome,
            email: value.body.usuarios[0].email
          }
        }).then(res => {
          expect(res.status).to.eq(200)
          expect(res.body.usuarios[0]).to.property('nome').to.eq(value.body.usuarios[0].nome)
          expect(res.body.usuarios[0]).to.property('email').to.eq(value.body.usuarios[0].email)
          expect(res.body.usuarios[0]).to.property('password').to.eq(value.body.usuarios[0].password)
          expect(res.body.usuarios[0]).to.property('administrador').to.eq(value.body.usuarios[0].administrador)
          expect(res.body.usuarios[0]).to.property('_id').to.eq(value.body.usuarios[0]._id)
        })
      })
    })
    it('Listar usuários com filtro por NOME e EMAIL inexistentes', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios',
        qs: {
          nome: 'nomeInexistente',
          email: 'emailinexistente@exemplo.com'
        }
      }).then(res => {
        expect(res.status).to.eq(200)
        expect(res.body).to.property('quantidade').to.eq(0)
        expect(res.body.usuarios).to.length(0)
      })
    })
    it('Listar usuários com filtro por NOME existente e EMAIL inexistente', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios'
      }).then(value => {
        cy.request({
          method: 'GET',
          url: '/usuarios',
          qs: {
            nome: value.body.usuarios[0].nome,
            email: 'emailinexistente@exemplo.com'
          }
        }).then(res => {
          expect(res.status).to.eq(200)
          expect(res.body).to.property('quantidade').to.eq(0)
          expect(res.body.usuarios).to.length(0)
        })
      })
    })
    it('Listar usuários com filtro por ADMINISTRADOR válido e NOME existente', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios'
      }).then(value => {
        cy.request({
          method: 'GET',
          url: '/usuarios',
          qs: {
            administrador: value.body.usuarios[0].administrador,
            nome: value.body.usuarios[0].nome
          }
        }).then(res => {
          expect(res.status).to.eq(200)
          expect(res.body.usuarios[0]).to.property('nome').to.eq(value.body.usuarios[0].nome)
          expect(res.body.usuarios[0]).to.property('email').to.eq(value.body.usuarios[0].email)
          expect(res.body.usuarios[0]).to.property('password').to.eq(value.body.usuarios[0].password)
          expect(res.body.usuarios[0]).to.property('administrador').to.eq(value.body.usuarios[0].administrador)
          expect(res.body.usuarios[0]).to.property('_id').to.eq(value.body.usuarios[0]._id)
        })
      })
    })
    it('Listar usuários com filtro por ADMINISTRADOR inválido e EMAIL existente', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios'
      }).then(value => {
        cy.request({
          method: 'GET',
          url: '/usuarios',
          qs: {
            administrador: 'invalid',
            email: value.body.usuarios[0].email
          },
          failOnStatusCode: false
        }).then(res => {
          expect(res.status).to.eq(400)
          expect(res.body).to.property('administrador').to.eq(response.administradorInvalido)
        })
      })
    })
  })
  context('Método POST - Cadastrar Usuário', () => {
    it('Cadastrar usuário com sucesso', () => {
      const newUser = {
        nome: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'true'
      }
      cy.request('POST', '/usuarios', newUser).then(res => {
        expect(res.status).to.eq(201)
        expect(res.body).to.property('message', response.cadastroRealizado)
        expect(res.body).to.property('_id')
      })
    })
    it('Cadastrar usuário sem nome', () => {
      const newUser = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'true'
      }
      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: newUser,
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.have.property('nome', response.nomeRequired)
      })
    })
    it('Cadastrar usuário sem email', () => {
      const newUser = {
        nome: faker.name.findName(),
        password: faker.internet.password(),
        administrador: 'true'
      }

      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: newUser,
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.have.property('email', response.emailRequired)
      })
    })
    it('Cadastrar usuário sem senha', () => {
      const newUser = {
        nome: faker.name.findName(),
        email: faker.internet.email(),
        administrador: 'true'
      }

      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: newUser,
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.have.property('password', response.passwordRequired)
      })
    })
    it('Cadastrar usuário com email já cadastrado', () => {
      cy.request('GET', '/usuarios').then(value => {
        const existingUser = {
          nome: faker.name.findName(),
          email: value.body.usuarios[0].email,
          password: faker.internet.password(),
          administrador: 'true'
        }
        cy.request({
          method: 'POST',
          url: '/usuarios',
          body: existingUser,
          failOnStatusCode: false
        }).then(res => {
          expect(res.status).to.eq(400)
          expect(res.body).to.have.property('message', response.emailExistente)
        })
      })
    })
    it('Cadastrar usuário com email inválido', () => {
      const newUser = {
        nome: faker.name.findName(),
        email: 'invalid-email',
        password: faker.internet.password(),
        administrador: 'true'
      }

      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: newUser,
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.have.property('email', response.emailFormatoInvalido)
      })
    })
    it('Cadastrar usuário sem indicar se é administrador', () => {
      const newUser = {
        nome: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }

      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: newUser,
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.have.property('administrador', response.administradorRequired)
      })
    })
    it('Cadastrar usuário com administrador inválido', () => {
      const newUser = {
        nome: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'invalid'
      }

      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: newUser,
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.have.property('administrador', response.administradorInvalido)
      })
    })
    it('Cadastrar usuário com nome em branco', () => {
      const newUser = {
        nome: '',
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'true'
      }
      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: newUser,
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.have.property('nome', response.nomeEmBranco)
      })
    })
    it('Cadastrar usuário com email em branco', () => {
      const newUser = {
        nome: faker.name.findName(),
        email: '',
        password: faker.internet.password(),
        administrador: 'true'
      }
      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: newUser,
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.have.property('email', response.emailEmBranco)
      })
    })
    it('Cadastrar usuário com senha em branco', () => {
      const newUser = {
        nome: faker.name.findName(),
        email: faker.internet.email(),
        password: '',
        administrador: 'true'
      }
      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: newUser,
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.have.property('password', response.passwordEmBranco)
      })
    })
    it('Cadastrar usuário com administrador em branco', () => {
      const newUser = {
        nome: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: ''
      }
      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: newUser,
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.have.property('administrador', response.administradorEmBranco)
      })
    })
    it('Cadastrar usuário com dados extras', () => {
      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: {
          nome: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          administrador: 'true',
          emanuel: 'teste'
        },
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.have.property('emanuel', 'emanuel não é permitido')
      })
    })
  })
  context('Método GET - Buscar Usuário por ID', () => {
    it('Listar usuário por ID válido', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios'
      }).then(res => {
        const userId = res.body.usuarios[0]._id
        cy.request({
          method: 'GET',
          url: `/usuarios/${userId}`
        }).then(userRes => {
          expect(userRes.status).to.eq(200)
          expect(userRes.body).to.property('nome').to.eq(res.body.usuarios[0].nome)
          expect(userRes.body).to.property('email').to.eq(res.body.usuarios[0].email)
          expect(userRes.body).to.property('password').to.eq(res.body.usuarios[0].password)
          expect(userRes.body).to.property('administrador').to.eq(res.body.usuarios[0].administrador)
          expect(userRes.body).to.property('_id').to.eq(userId)
        })
      })
    })
    it('Listar usuário por ID inexistente', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios/605c72efc9d8b91450e6f7c9',
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.property('message').to.eq(response.usuarioNaoEncontrado)
      })
    })
    it('Listar usuário por ID com formato inválido', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios/invalid-id',
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.property('message').to.eq(response.usuarioNaoEncontrado)
      })
    })
    it('Listar usuário sem fornecer ID', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios/'
      }).then(res => {
        expect(res.status).to.eq(200)
        expect(res.body).to.property('quantidade')
        expect(res.body).to.property('usuarios')
        expect(res.body.usuarios[0]).to.property('nome')
        expect(res.body.usuarios[0]).to.property('email')
        expect(res.body.usuarios[0]).to.property('password')
        expect(res.body.usuarios[0]).to.property('administrador')
        expect(res.body.usuarios[0]).to.property('_id')
      })
    })
    it('Listar usuário com ID de outro tipo de dado (número)', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios/12345',
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.property('message').to.eq(response.usuarioNaoEncontrado)
      })
    })
    it('Listar usuário com ID contendo caracteres especiais', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios/!@#$%',
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.property('message').to.eq(response.usuarioNaoEncontrado)
      })
    })
  })
  context('Método PUT - Editar Usuário', () => {
    it('Atualizar usuário com sucesso', () => {
      cy.request('GET', '/usuarios').then(res => {
        const userId = res.body.usuarios[0]._id
        cy.request('PUT', `/usuarios/${userId}`, {
          nome: 'Novo Nome',
          email: 'novoemail@example.com',
          password: 'novasenha',
          administrador: 'true'
        }).then(updateRes => {
          expect(updateRes.status).to.eq(200)
          expect(updateRes.body).to.property('message', response.registroAlterado)
        })
      })
    })
    it('Atualizar usuário sem nome', () => {
      cy.request('GET', '/usuarios').then(res => {
        const userId = res.body.usuarios[0]._id
        cy.request({
          method: 'PUT',
          url: `/usuarios/${userId}`,
          body: {
            email: 'novoemail@example.com',
            password: 'novasenha',
            administrador: 'true'
          },
          failOnStatusCode: false
        }).then(updateRes => {
          expect(updateRes.status).to.eq(400)
          expect(updateRes.body).to.property('nome', response.nomeRequired)
        })
      })
    })
    it('Atualizar usuário sem email', () => {
      cy.request('GET', '/usuarios').then(res => {
        const userId = res.body.usuarios[0]._id
        cy.request({
          method: 'PUT',
          url: `/usuarios/${userId}`,
          body: {
            nome: 'Novo Nome',
            password: 'novasenha',
            administrador: 'true'
          },
          failOnStatusCode: false
        }).then(updateRes => {
          expect(updateRes.status).to.eq(400)
          expect(updateRes.body).to.property('email', response.emailRequired)
        })
      })
    })
    it('Atualizar usuário sem senha', () => {
      cy.request('GET', '/usuarios').then(res => {
        const userId = res.body.usuarios[0]._id
        cy.request({
          method: 'PUT',
          url: `/usuarios/${userId}`,
          body: {
            nome: 'Novo Nome',
            email: 'novoemail@example.com',
            administrador: 'true'
          },
          failOnStatusCode: false
        }).then(updateRes => {
          expect(updateRes.status).to.eq(400)
          expect(updateRes.body).to.property('password', response.passwordRequired)
        })
      })
    })
    it('Atualizar usuário com email já cadastrado', () => {
      cy.request('GET', '/usuarios').then(res => {
        const userId = res.body.usuarios[0]._id
        const email = res.body.usuarios[1].email
        cy.request({
          method: 'PUT',
          url: `/usuarios/${userId}`,
          body: {
            nome: 'Novo Nome',
            email,
            password: 'novasenha',
            administrador: 'true'
          },
          failOnStatusCode: false
        }).then(updateRes => {
          expect(updateRes.status).to.eq(400)
          expect(updateRes.body).to.property('message', response.emailExistente)
        })
      })
    })
    it('Atualizar usuário com email inválido', () => {
      cy.request('GET', '/usuarios').then(res => {
        const userId = res.body.usuarios[0]._id
        cy.request({
          method: 'PUT',
          url: `/usuarios/${userId}`,
          body: {
            nome: 'Novo Nome',
            email: 'email-invalido',
            password: 'novasenha',
            administrador: 'true'
          },
          failOnStatusCode: false
        }).then(updateRes => {
          expect(updateRes.status).to.eq(400)
          expect(updateRes.body).to.property('email', response.emailFormatoInvalido)
        })
      })
    })
    it('Atualizar usuário sem indicar se é administrador', () => {
      cy.request('GET', '/usuarios').then(res => {
        const userId = res.body.usuarios[0]._id
        cy.request({
          method: 'PUT',
          url: `/usuarios/${userId}`,
          body: {
            nome: 'Novo Nome',
            email: 'novoemail@example.com',
            password: 'novasenha'
          },
          failOnStatusCode: false
        }).then(updateRes => {
          expect(updateRes.status).to.eq(400)
          expect(updateRes.body).to.property('administrador', response.administradorRequired)
        })
      })
    })
    it('Atualizar usuário com administrador inválido', () => {
      cy.request('GET', '/usuarios').then(res => {
        const userId = res.body.usuarios[0]._id
        cy.request({
          method: 'PUT',
          url: `/usuarios/${userId}`,
          body: {
            nome: 'Novo Nome',
            email: 'novoemail@example.com',
            password: 'novasenha',
            administrador: 'invalid'
          },
          failOnStatusCode: false
        }).then(updateRes => {
          expect(updateRes.status).to.eq(400)
          expect(updateRes.body).to.property('administrador', response.administradorInvalido)
        })
      })
    })
    it('Atualizar usuário com ID inexistente', () => {
      cy.request('GET', '/usuarios').then(res => {
        const userId = res.body.usuarios[0]._id
        cy.request({
          method: 'PUT',
          url: `/usuarios/${userId}${userId}`,
          body: {
            nome: 'Novo Nome',
            email: `${faker.lorem.word(1)}@example.com`,
            password: 'novasenha',
            administrador: 'true'
          },
          failOnStatusCode: false
        }).then(updateRes => {
          expect(updateRes.status).to.eq(201)
          expect(updateRes.body).to.property('message', response.cadastroRealizado)
          expect(updateRes.body).to.property('_id')
        })
      })
    })
    it('Atualizar usuário sem fornecer ID', () => {
      cy.request({
        method: 'PUT',
        url: '/usuarios',
        body: {
          nome: 'Novo Nome',
          email: `${faker.internet.exampleEmail()}`,
          password: 'novasenha',
          administrador: 'true'
        },
        failOnStatusCode: false
      }).then(updateRes => {
        expect(updateRes.status).to.eq(405)
      })
    })
    it('Atualizar usuário com nome em branco', () => {
      cy.request('GET', '/usuarios').then(res => {
        const userId = res.body.usuarios[0]._id
        cy.request({
          method: 'PUT',
          url: `/usuarios/${userId}`,
          body: {
            nome: '',
            email: 'novoemail@example.com',
            password: 'novasenha',
            administrador: 'true'
          },
          failOnStatusCode: false
        }).then(updateRes => {
          expect(updateRes.status).to.eq(400)
          expect(updateRes.body).to.property('nome', response.nomeEmBranco)
        })
      })
    })
    it('Atualizar usuário com email em branco', () => {
      cy.request('GET', '/usuarios').then(res => {
        const userId = res.body.usuarios[0]._id
        cy.request({
          method: 'PUT',
          url: `/usuarios/${userId}`,
          body: {
            nome: 'Novo Nome',
            email: '',
            password: 'novasenha',
            administrador: 'true'
          },
          failOnStatusCode: false
        }).then(updateRes => {
          expect(updateRes.status).to.eq(400)
          expect(updateRes.body).to.property('email', response.emailEmBranco)
        })
      })
    })
    it('Atualizar usuário com senha em branco', () => {
        cy.request('GET', '/usuarios').then(res => {
            const userId = res.body.usuarios[0]._id;
            cy.request({
                method: 'PUT',
                url: `/usuarios/${userId}`,
                body: {
                    nome: 'Novo Nome',
                    email: `${faker.internet.exampleEmail()}`,
                    password: '',
                    administrador: 'true'
                },
                failOnStatusCode: false
            }).then(updateRes => {
                expect(updateRes.status).to.eq(400);
                expect(updateRes.body).to.property('password', response.passwordEmBranco);
            });
        });
    });
    it('Atualizar usuário com administrador em branco', () => {
        cy.request('GET', '/usuarios').then(res => {
            const userId = res.body.usuarios[0]._id;
            cy.request({
                method: 'PUT',
                url: `/usuarios/${userId}`,
                body: {
                    nome: 'Novo Nome',
                    email: `${faker.internet.exampleEmail()}`,
                    password: 'novasenha',
                    administrador: ''
                },
                failOnStatusCode: false
            }).then(updateRes => {
                expect(updateRes.status).to.eq(400);
                expect(updateRes.body).to.property('administrador', response.administradorEmBranco);
            });
        });
    });
    it('Atualizar usuário com dados extras', () => {
        cy.request('GET', '/usuarios').then(res => {
            const userId = res.body.usuarios[0]._id;
            cy.request({
                method: 'PUT',
                url: `/usuarios/${userId}`,
                body: {
                    nome: 'Novo Nome',
                    email: 'novoemail@example.com',
                    password: 'novasenha',
                    administrador: 'true',
                    emanuel: 'dado extra'
                },
                failOnStatusCode: false
            }).then(updateRes => {
                expect(updateRes.status).to.eq(400);
                expect(updateRes.body).to.property('emanuel', "emanuel não é permitido");
            });
        });
    });
  })
})
