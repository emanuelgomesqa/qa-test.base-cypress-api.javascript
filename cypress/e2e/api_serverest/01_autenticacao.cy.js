import { response } from '../../support/responseElements'

describe('Login API Tests - SERVEREST', () => {
  it('Realizar login com credenciais válidas', () => {
    cy.fixture('credentials').then(loginData => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          email: loginData.valido.username,
          password: loginData.valido.password
        }
      }).then(res => {
        expect(res.status).to.eq(200)
        expect(res.body).to.property('message').to.equal(response.loginSucess)
        expect(res.body).to.property('authorization')
      })
    })
  })
  it('Não permitir login com e-mail inválido', () => {
    cy.fixture('credentials').then(loginData => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          email: loginData.invalido.emailNaoCadastrado,
          password: loginData.valido.password
        },
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(401)
        expect(res.body).to.property('message').to.equal(response.loginInvalid)
      })
    })
  })
  it('Não permitir login com senha inválida', () => {
    cy.fixture('credentials').then(loginData => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          email: loginData.valido.username,
          password: loginData.invalido.passwordInvalida
        },
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(401)
        expect(res.body).to.property('message').to.equal(response.loginInvalid)
      })
    })
  })
  it('Não permitir login sem fornecer e-mail e senha', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(400)
      expect(res.body).to.property('email').to.equal(response.emailRequired)
      expect(res.body).to.property('password').to.equal(response.passwordRequired)
    })
  })
  it('Não permitir login com e-mail em formato inválido', () => {
    cy.fixture('credentials').then(loginData => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          email: loginData.invalido.emailFormatoInvalido,
          password: loginData.valido.password
        },
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(400)
        expect(res.body).to.property('email').to.equal(response.emailFormatoInvalido)
      })
    })
  })
})
