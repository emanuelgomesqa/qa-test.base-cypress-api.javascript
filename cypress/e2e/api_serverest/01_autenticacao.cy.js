describe('Login API Tests - SERVEREST', () => {
  it.only('Realizar login com credenciais válidas', () => {
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
        expect(res.body).to.have.property('authorization')
      })
    })
  })
  it('Não permitir login com e-mail inválido', () => {

  })
  it('Não permitir login com senha inválida', () => {

  })
  it('Não permitir login sem fornecer e-mail', () => {

  })
  it('Não permitir login sem fornecer senha', () => {

  })
  it('Não permitir login com e-mail em formato inválido', () => {

  })
  it('Verificar a geração de token após login bem-sucedido', () => {

  })
})
