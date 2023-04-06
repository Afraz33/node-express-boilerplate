const asyncHandler = require('express-async-handler')

const Article = require('../models/articleModel')

// @desc Get articles
// @route GET /api/articles
// @access Private
const getArticles = asyncHandler (async (req, res)=>{
    const articles = await Article.find()
    res.status(200).json(articles)
})

// @desc Set articles
// @route POST /api/articles
// @access Private
const setArticles = asyncHandler (async(req, res)=>{
    if(!req.body.title || !req.body.author || !req.body.body || !req.body.published || !req.body.tag){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Article.create({
       title: req.body.title,
       author: req.body.author,
         body: req.body.body,
            published: req.body.published,
            tag: req.body.tag
            
    })
    res.status(200).json(goal)
   
})

// @desc Update articles
// @route PUT /api/articles/:id
// @access Private
const updateArticles = asyncHandler (async(req, res)=>{
    const goal = await Article.findById(req.params.id)   
    if(!goal){
        res.status(400)
        throw new Error('Article not found')}

    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, 
    {
        new: true,
    })
    res.status(200).json(updatedArticle)
})

// @desc Delete articles
// @route DELETE /api/articles/:id
// @access Private
const deleteArticles = asyncHandler (async(req, res)=>{
    Article.findByIdAndDelete(req.params.id).then((article)=>{
        res.status(200).json(article)
    }).catch(err=>{
        res.status(500).json({"Message":"Article Not Deleted" , err:err})
    })
    
     })

module.exports = {
    getArticles, setArticles, updateArticles, deleteArticles
}