import React,{useState} from "react";

function AddPostCard({ onPostAdded }) {
    const [submitted, setSubmitted] = useState(false);

    const handleAddPost = (e) => {
        e.preventDefault();
        const title = e.target.Title.value;
        const body = e.target.Body.value;
        
        const postData = {
            title: title,
            body: body,
            userId: 1,
        };

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("API Response:", json);
                setSubmitted(true);
                e.target.reset();
                
                setTimeout(() => {
                    setSubmitted(false);
                    onPostAdded(postData);
                }, 1500);
            })
            .catch((error) => {
                console.error("Error:", error);
                setSubmitted(true);
                e.target.reset();
                setTimeout(() => {
                    setSubmitted(false);
                    onPostAdded(postData);
                }, 1500);
            });
    }

    return (
        <form className="flex flex-col items-center rounded-2x mt-2" onSubmit={handleAddPost}>
            <h1 className="font-bold text-2xl">Add Post</h1>
            <textarea name="Title" placeholder="Title" cols="30" rows="5" className="mb-2 border-2 focus:outline-none p-1 rounded-2xl bg-white" required></textarea>
            <textarea name="Body" placeholder="Body"  cols="30" rows="7" className="mb-2 border-2 focus:outline-none p-1 rounded-2xl bg-white" required></textarea>
            <button type="submit" className="bg-blue-400 h-10 w-20 rounded-2xl mb-2">Add</button>
            {submitted && <p className="mb-2 font-bold text-green-500">Post added successfully!</p>}
        </form>
    );
}

export default AddPostCard;