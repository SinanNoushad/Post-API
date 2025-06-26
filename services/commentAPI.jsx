import React, { useEffect, useState } from "react";
import CommentCard from "../components/CommentCard";

function CommentAPI({ postId, existingComments, onSetComments, onAddComment }) {
  const [comments, setComments] = useState([]);
  const [loadedPostId, setLoadedPostId] = useState(null);

  useEffect(() => {
    if (postId !== loadedPostId) {
      setComments([]);
      setLoadedPostId(postId);
    }

    if (postId && existingComments.length > 0) {
      setComments(existingComments);
    } else if (postId && postId !== loadedPostId) {
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then((res) => res.json())
        .then((apiComments) => {
          setComments(apiComments);
          onSetComments(apiComments);
        })
        .catch(console.error);
    }
  }, [postId, existingComments, loadedPostId, onSetComments]);

  const handleAddComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    onAddComment(newComment);
  };

  if (!postId) return null;

  return (
    <div className="flex w-full h-full justify-center bg-gray-800">
      <CommentCard comments={comments} onAddComment={handleAddComment} />
    </div>
  );
}

export default CommentAPI;