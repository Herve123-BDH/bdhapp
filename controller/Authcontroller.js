const NewPost = require("../model/Postmode")
module.exports.newpost= async (req,res)=>{
    const {title, content}= req.body
try{
    const container = await NewPost.create({title, content})
    res.json({msg:container})
}
    catch(err){
        res.json({msg: err})
    }
}
//get all the post
module.exports.allpost= async (req,res)=>{
    try{
        const Allpost = await NewPost.find()
        res.json(Allpost)
    }
    catch(err){
        res.json({msg: err})
    }
}
//get one post
module.exports.onepost= async (req,res)=>{
    const ONEpost= req.params.id
    try{
        const Onepost= await NewPost.findOne({_id: ONEpost})
        res.json(Onepost)
    }
    catch(err){
        res.json({msg: err})
    }
}
//delete a post

module.exports.deletepost= async (req, res)=>{
    try{
        const Deletepost = await NewPost.deleteOne({_id: req.params.id})
        res.json(Deletepost)
    }
    catch(err){
        res.json({msg: err})
    }
}
//update a post
module.exports.updatepost= async (req, res)=>{
    try{
        const Updatepost = await NewPost.updateOne({_id: req.params.id},
        {$set:{title: req.body.title, content: req.body.content}})
        res.json(Updatepost)
    }
    catch(err){
        res.json({msg: err})
    }
}