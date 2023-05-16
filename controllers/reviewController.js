const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { ReviewModel, UserModel, CoworkingModel } = require('../db/sequelize')

exports.findAllReviews = (req, res) => {
    ReviewModel.findAll
    ({
        include: [UserModel.scope('withoutPassword'), CoworkingModel]
    }) 
        .then(results => {
            const message = "La liste des avis a bien été récupérée"
            res.json({message, data: results})
        }).catch(error => {
            const message = "La liste des avis n'a pas pu être récupérée"
            res.status(500).json({message, data: error})
        })
}

exports.createReview = (req, res) => {
    ReviewModel.create({
        content: req.body.content,
        rating: req.body.rating,
        UserId: req.body.UserId,
        CoworkingId: req.body.CoworkingId
    }) 
        .then(result => {
            const message = "L'avis a bien été créé"
            res.json({message, data: result})
        }).catch(error => {
            if(error instanceof UniqueConstraintError || error instanceof ValidationError){
                return res.status(400).json({message: error.message, data: error})
            } 
            const message = "L'avis n'a pas pu être créé"
            res.status(500).json({message, data: error})
        })
}

exports.updateReview = (req, res) => {
    // Modifier le coworking en base de données qui correspond à l'id spécifé dans les params
    ReviewModel.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then((review) => {
        if(review === null){
            const msg = "Le comentaire demandé n'existe pas."
            res.json({message: msg})
        } else {
            const msg = "Le commentaire a bien été modifié."
            res.json({message: msg, data: review})
        }
    }).catch((error) => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})
        } 
        const msg = "Impossible de mettre à jour le coworking."
        res.status(500).json({message: msg})
    })
}