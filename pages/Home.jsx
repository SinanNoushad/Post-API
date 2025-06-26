import React from "react";
import PostAPI from "../services/postAPI";

function Home({value, newPost}) {
    return (
        <div className=" bg-gray-800 flex justify-center items-start h-[90vh] flex-row">
            <PostAPI searchValue={value} newPost={newPost} />
        </div>
    );
}

export default Home;