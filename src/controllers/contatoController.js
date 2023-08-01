const { async } = require('regenerator-runtime')
const Contato = require('../models/ContatoModel')

exports.index = (req, res) => {
    res.render('contato.ejs', {contato: { }})
}

exports.register = async (req, res) => {

    try {
        
        const contato = new Contato(req.body)
        await contato.register()
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato/index'))
            return
        }
    
        req.flash('success', 'Contato criado com sucesso')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return
    } catch (error) {
        res.render('404.ejs')
    }
    
}

exports.editIndex = async function (req, res) {
    if(!req.params.id) return res.render('404.ejs')

    const contato = await Contato.buscaPorId(req.params.id)
    if(!contato) return res.render('404.ejs')


    res.render('contato.ejs', {contato})
}

exports.edit = async function(req, res) {
    
    try {
        
        if(!req.params.id) return res.render('404.ejs')
        const contato = new Contato(req.body)
        await contato.edit(req.params.id)
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato/index'))
            return
        }
    
        req.flash('success', 'Contato criado com sucesso')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return
    } catch (error) {
        console.log(error)
        res.render('404.ejs')
    }
    
}

exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('404.ejs')

    const contato = await Contato.delete(req.params.id)
    if(!contato) return res.render('404.ejs')

    req.flash('success', 'Contato criado com sucesso')
    req.session.save(() => res.redirect('back'))
    return


}
