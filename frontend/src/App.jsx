import { useState, useEffect } from 'react' 

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

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

  useEffect(() => {
  fetch("http://127.0.0.1:8000/api/tags/", {
    headers: {
      Authorization: "Token 2c850741a6917bcb9e0dd37146cf1576526c3d16",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setTags(data);
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
        tags: selectedTags,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("CREATED:", data);

        setBookmarks([data, ...bookmarks]);

        setTitle("");
        setUrl("");
        setSelectedTags([]);
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
    <h3>Select Tags</h3>

      {tags.map((tag) => (
        <label key={tag.id}>
          <input
            type="checkbox"
            value={tag.id}
            checked={selectedTags.includes(tag.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedTags([...selectedTags, tag.id]);
              } else {
                setSelectedTags(
                  selectedTags.filter((id) => id !== tag.id)
                );
              }
            }}
          />
          {tag.name}
        </label>
      ))}
      <br></br>
      <br></br>
      <button onClick={handleAddBookmark}>Add</button>
    </div>
  );
}
export default App
