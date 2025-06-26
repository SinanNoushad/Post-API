import React,{useState} from "react";
import AddPostCard from "./AddPostCard";
import Close from "../assets/close.png";
import Search from "../assets/search.png";

function Navbar({value, setValue, onNewPost}) {
    const [isSearch, setIsSearch] = useState(false);
    const [isAddPost, setIsAddPost] = useState(false);

    const handleAddPostCard = () => {
        setIsAddPost(!isAddPost);
    };

    const handlePostAdded = (postData) => {
        setIsAddPost(false); 
        onNewPost(postData); 
    };

    const toggleSearch = () => {      
            setValue(''); 
            setIsSearch(!isSearch);
    };

    return(
        <div className="h-[10vh] bg-teal-500 flex items-center justify-between pl-5 pr-5">
            <span className="text-2xl font-bold">Post API</span> 
            <div className="flex flex-row  h-8 gap-4 items-center">
                <input 
                    type="text" 
                    id="search" 
                    placeholder="Search" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    className={`pl-2 bg-white w-60 h-8 rounded-2xl outline-none ${isSearch ? "block" : "hidden"}`}
                />
                <button 
                onClick={toggleSearch}
                >
                    <img src={isSearch ? Close : Search}
                    alt="search" 
                    className="h-7"
                    />
                </button>
                <button className="bg-white h-10 w-25 rounded-2xl font-bold hover:bg-gray-300" onClick={handleAddPostCard}>Add Post</button>
            {isAddPost && (
                <>
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-9" onClick={() => setIsAddPost(false)}></div>
                <div className="top-[30%] left-[40%] h-[50%] w-[20%] absolute z-10 bg-white flex justify-center rounded-2xl">
                    <AddPostCard onPostAdded={handlePostAdded} />
                </div>
                </>
            )}
            </div>
        </div>
    );  
}
export default Navbar;