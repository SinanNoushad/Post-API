import React,{useState} from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [newPost, setNewPost] = useState(null);

  const handleNewPost = (post) => {
    setNewPost(post);
    setTimeout(() => setNewPost(null), 100);
  };

  return (
    <>
     <Navbar 
       value={searchValue} 
       setValue={setSearchValue}
       onNewPost={handleNewPost}
     />
      <Home value={searchValue} newPost={newPost}/>
    </>
  )
}

export default App