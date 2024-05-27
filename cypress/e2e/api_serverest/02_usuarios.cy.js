import { response } from '../../support/responseElements'
const faker = require('faker-br')

describe('USUÁRIOS API Tests - SERVEREST', () => {
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
                expect(res.body.usuarios[0]).to.property('administrador').to.eq("true")
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
                expect(res.body.usuarios[0]).to.property('administrador').to.eq("false")
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
        it('', () => {

        })
    })
    context('Método GET - Buscar Usuário por ID', () => {
        it('', () => {

        })
    })
    context('Método PUT - Editar Usuário', () => {
        it('', () => {

        })
    })
    context('Método DELETE - Deletar Usuário', () => {
        it('', () => {

        })
    })
})
