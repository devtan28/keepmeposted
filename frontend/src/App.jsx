import { useState, useEffect } from 'react' 

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bookmarks/", {
      headers: {
        Authorization: "Token 2c850741a6917bcb9e0dd37146cf1576526c3d16",
      },
    })
    .then ((res) => {
      console.log("RESPONSE:", res);
      return res.json();
    })
    .then((data) => {
      console.log("DATA:", data);
      setBookmarks(data);
    })
    .catch((err) => console.log(err));
  }, []);

  const handleAddBookmark = () => {
    fetch("http://127.0.0.1:8000/api/bookmarks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 2c850741a6917bcb9e0dd37146cf1576526c3d16"
      },
      body: JSON.stringify({
        title: title,
        url: url,
        tags: [5],
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("CREATED:", data);

        setBookmarks([data, ...bookmarks]);

        setTitle("");
        setUrl("");
      })
      .catch((err) => console.log(err));
  }


  return (
    <div>
      <h1>Bookmarks</h1>
      {bookmarks.map((bookmark) => (
        <div key ={bookmark.id}>
          <h3>{bookmark.title}</h3>
          <p>{bookmark.url}</p>
        </div>
      ))}
      <h2>Add Bookmark</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={handleAddBookmark}>Add</button>
    </div>
  );
}
export default App
