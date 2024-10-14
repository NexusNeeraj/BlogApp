// import model
const Post = require('../models/postModel');
const Like = require('../models/likeModel');

exports.likePost = async (req, res) => {
      try{
            //fetch data from req body
            const {post, user} = req.body;
            //create a like object
            const like = new Like({
                  post,user,
            });

            //save the new like into the database
            const savedLike = await like.save();

            //find the post by ID, add the new like to its like array
            const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id} }, { new:true })
            .populate("likes")//populate the likes array with like documents
            .exec();

            //send the response
            res.json({
                  post:updatedPost,
            });
      }
      catch(error){
            return res.status(500).json({
                  error:"Error while creating like",
            })
      }
};

exports.unlikePost = async (req, res) => {
      try{
            //fetch data from req body
            const {post, like} = req.body;
            //find the post with given post id and like id and then delete that like id
            const deletedLike = await Like.findOneAndDelete({post:post, _id:like});
            //find the post by ID, and delete the like from its likes array
            const updatedPost = await Post.findByIdAndUpdate(post, 
                                                            {$pull: {likes: deletedLike._id} },
                                                            { new:true });
            

            //send the response
            res.json({
                  post:updatedPost,
            });
      }
      catch(error){
            return res.status(500).json({
                  error:"Error while unliking post",
            });
      }
};