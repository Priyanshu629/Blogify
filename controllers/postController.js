const postModel=require('../models/postModel')
const fs=require('fs')
const path=require('path')


const createPost= async(req,res,next)=>{
    const {title,body}=req.body

    if(!title || !body){
        return res.json('all fields are required')
    }

    // console.log(req.user)
    postModel.create({
        title,
        body,
        postedBy:req.user._id,
      
    }).then((data)=>res.json(data))
    .catch((err)=> res.json(err))

   
}
const allPost=(req,res,next)=>{
    
    try{
    postModel.find({})
    .populate('postedBy','name email')
    .then((mypost)=>{
      if(!mypost){
        return res.json('no post')
      }else{
        return res.json({mypost})
      }
    })
    .catch(err=>{
        console.log(err)
    })
}
catch{

}
}

const getMyPost=(req,res,next)=>{

    postModel.find({postedBy:req.user._id})
    .populate('postedBy','_id name')
    .then((mypost)=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })

}

const getMyPostById =(req,res,next)=>{
    const id=req.params.id
    console.log(id)
    postModel.findOne({_id:id})
    // .populate('postedBy','_id name')
    .then((data)=>{
      res.json(data)
    })
    .catch(err=> res.json({err}))
}


const deletePost =(req,res,next)=>{

  const loginUser=req.user._id
  const postid=req.params.id
  const imageid=req.params.imageid
  
console.log(postid,imageid)
   const filePath=path.resolve(`./uploads/${imageid}`)
   console.log(filePath)
  
  fs.unlink(filePath, (err) => {
    if (err) throw err;
    console.log('path/file.txt was deleted');
  });
  
  postModel.findOne({_id:postid})
  .populate('postedBy','_id')
  .then((data)=>{

    let loginUserPostedById=data.postedBy._id

   if(loginUser.toString()===loginUserPostedById.toString())
{
    postModel.deleteOne({_id:postid})
    .then(data=>{
       return res.json('ok')
    }).catch(err=> res.json(err))
    
}
    

   }).catch(err=>res.json(err))
    
}
module.exports={createPost,getMyPost,deletePost,allPost,getMyPostById}
