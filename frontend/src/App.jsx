import { useState, useEffect } from 'react' 

function App() {
  const [bookmarks, setBookmarks] = useState([]);

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

  return (
    <div>
      <h1>Bookmarks</h1>
      {bookmarks.map((bookmark) => (
        <div key ={bookmark.id}>
          <h3>{bookmark.title}</h3>
          <p>{bookmark.url}</p>
        </div>
      ))}
    </div>
  );
}
export default App
