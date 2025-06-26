import React, { useState } from "react";
import Commentlike from "../assets/commentLike.png";
import CommentlikeFilled from "../assets/commentLikeFilled.png";

function CommentCard({ comments, onAddComment }) {
  const [likedComments, setLikedComments] = useState(new Set());
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: ''
  });
  const [error, setError] = useState({
    name: '',
    email: '',
    body: ''
  });
  

  if (!comments || comments.length === 0) return null;

  const toggleLike = (commentId) => {
    setLikedComments(prev => {
      const newLikedComments = new Set(prev);
      if (newLikedComments.has(commentId)) {
        newLikedComments.delete(commentId);
      } else {
        newLikedComments.add(commentId);
      }
      return newLikedComments;
    });
  };

  const handleInputChange = (field, value) => {
    setNewComment(prev => ({
      ...prev,
      [field]: value
    }));
  
    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        setError(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
      } else {
        setError(prev => ({ ...prev, email: '' }));
      }
    } else {
      setError(prev => ({ ...prev, [field]: value.trim() ? '' : `Please enter your ${field}` }));
    }
  };
  

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!newComment.name.trim() || !newComment.email.trim() || !newComment.body.trim()) {
      setError(prev => ({
        ...prev,
        name: !newComment.name.trim() ? 'please enter your name' : '',
        email: !newComment.email.trim() ? 'please enter your email' : '',
        body: !newComment.body.trim() ? 'please enter a comment' : ''
      }));
      return;
    }
    

    const commentToAdd = {
      id: Date.now(),
      name: newComment.name.trim(),
      email: newComment.email.trim(),
      body: newComment.body.trim()
    };

    if (onAddComment) {
      onAddComment(commentToAdd);
    }

    setNewComment({
      name: '',
      email: '',
      body: ''
    });
  };


  return (
    <>
    
    <div className="bg-zinc-700 flex flex-col w-[90%] mt-5 rounded-2xl p-5 ">
      <h3 className="text-white font-bold mb-3">All Comments:</h3>
      <div className="flex flex-col h-[60vh] overflow-scroll no-scrollbar">
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4 bg-violet-200 p-3 rounded-lg">
          <div className="flex flex-row justify-between items-start">
            <p className="text-gray-700 font-semibold">{comment.name}</p>
            <button onClick={() => toggleLike(comment.id)} className="ml-2">
              <img 
                src={likedComments.has(comment.id) ? CommentlikeFilled : Commentlike} 
                alt="like comment" 
                className="h-5 w-5"
              />
            </button>
          </div>
          <p className=" text-gray-500 text-sm italic">{comment.email}</p>
          <p className="text-gray-700 mt-1">{comment.body}</p>
        </div>
      ))}
      </div>

      <div className="mt-6  bg-violet-200 p-4 rounded-lg">
        <h4 className="text-gray-700 font-semibold mb-3">Add a Comment:</h4>
        <form onSubmit={handleSubmitComment} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={newComment.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`bg-gray-100 w-full p-2 rounded-md  outline-none text-gray-800 placeholder-gray-500 border-none`}
            />
            {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={newComment.email}
              onChange={(e) => {handleInputChange('email', e.target.value)}}
              className={`bg-gray-100 w-full p-2 rounded-md  outline-none text-gray-800 placeholder-gray-500 border-none `}
            />
            {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
          </div>
          <div>
            <textarea
              placeholder="Write your comment..."
              value={newComment.body}
              onChange={(e) => handleInputChange('body', e.target.value)}
              rows="2"
              className={`bg-gray-100 w-full p-2 rounded-md  outline-none text-gray-800 placeholder-gray-500 resize-none border-none`}
            />
            {error.body && <p className="text-red-500 text-sm mt-1">{error.body}</p>}
          </div>
          <div className="flex justify-start items-center">
          <button
            type="submit"
            disabled={!!error.name || !!error.email || !!error.body}
            className={`bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 
              ${!!error.name || !!error.email || !!error.body ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700 cursor-pointer'}
            `}>
            Post Comment
          </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default CommentCard;