import React,{useEffect, useState} from "react";
import PostCard from "../components/PostCard";
import CommentAPI from "./commentAPI";

function PostAPI({searchValue, newPost}) {
  const [apiPosts, setApiPosts] = useState([]);
  const [localPosts, setLocalPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [postComments, setPostComments] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setApiPosts(data.slice(0, 10)));
  }, []);

  useEffect(() => {
    if (newPost) {
      const postWithId = {
        ...newPost,
        id: Date.now(),
        isLocal: true
      };
      setLocalPosts(prev => [postWithId, ...prev]); 
    }
  }, [newPost]);

  const allPosts = [...localPosts, ...apiPosts];
  
  const filteredPosts = allPosts.filter((post) =>
    post.title?.toLowerCase().includes(searchValue?.toLowerCase() || "")
  );

  const handleCommentClick = (postId) => {
    setSelectedPostId(selectedPostId === postId ? null : postId);
  };

  const handleSetComments = (postId, comments) => {
    setPostComments(prev => ({
      ...prev,
      [postId]: comments
    }));
  };

  const handleAddComment = (postId, newComment) => {
    setPostComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));
  };

  return (
    <div className="flex w-full h-full justify-center">
      <div className="bg-zinc-700 w-[50%] h-full flex flex-col items-center overflow-auto no-scrollbar">
        {filteredPosts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            onCommentClick={() => handleCommentClick(post.id)}
            isCommentActive={selectedPostId === post.id}
          />
        ))}
      </div>
      {selectedPostId && 
      <div className="w-[50%] h-full overflow-auto bg-gray-100 flex flex-col items-center">
        <CommentAPI 
          postId={selectedPostId} 
          existingComments={postComments[selectedPostId] || []}
          onSetComments={(comments) => handleSetComments(selectedPostId, comments)}
          onAddComment={(comment) => handleAddComment(selectedPostId, comment)}
        />
      </div>}
    </div>
  );
}

export default PostAPI;