const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado.ejs')
    
    res.render('login.ejs', {contato: { }})
}

exports.register = async function(req, res) {
    try {
        const login = new Login(req.body)
        await login.register()
        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function() {
                return res.redirect('/login/index')
            })
            return 
        }
        req.flash('success', 'Seu usuário foi criado com sucesso')
        req.session.save(function() {
            return res.redirect('/login/index')
        })
        
    } catch (error) {
        console.log(error)
        return res.render('404.ejs')
    }
}
exports.login = async function(req, res) {
    try {
        const login = new Login(req.body)
        await login.login()
        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function() {
                return res.redirect('/login/index')
            })
            return 
        }

        req.flash('success', 'Estás logado no sistema.')
        req.session.user = login.user
        req.session.save(function() {
            return res.redirect('/login/index')
        })
        
    } catch (error) {
        console.log(e)
        return res.render('404.ejs')
    }
}

exports.logout = function(req, res) {
    req.session.destroy()
    res.redirect('/')
}