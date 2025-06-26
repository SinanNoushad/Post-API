import React,{useState} from "react";
import like from "../assets/like.png"
import likeFilled from "../assets/likeFilled.png"
import comment from "../assets/comment.png"
import commentFilled from "../assets/commentFilled.png"

function PostCard({post, onCommentClick, isCommentActive}){
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <div className={`flex flex-col w-[90%] mt-5 rounded-2xl p-5 ${
      post.isLocal ? 'bg-green-200 border-2 border-green-400' : 'bg-violet-200'
    }`}>
      <h2 className="font-bold text-lg">{post.title}</h2>
      <p className="text-gray-700">{post.body}</p>
      
      <div className="flex flex-row mt-4">
        <button 
          onClick={() => setIsLiked(!isLiked)} 
          className="ml-5 flex flex-col items-center"
        >
          <img src={isLiked ? likeFilled : like} alt="like" className="h-7"/>
          Like
        </button>
        {!post.isLocal && ( 
          <button 
            onClick={onCommentClick}
            className="ml-5 flex flex-col items-center" 
          >
            <img src={isCommentActive ? commentFilled : comment} alt="comment" className="h-7"/>
            Comment
          </button>
        )}
      </div>
    </div>
  )
}

export default PostCard;