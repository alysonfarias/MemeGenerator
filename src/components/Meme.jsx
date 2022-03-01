import React from "react";
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';

export default function Meme() {
  const [meme, setMeme] = React.useState({
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg" 
  })

  const [allMemes, setAllMemes] = React.useState([])

  React.useEffect(async () => {
      fetch("https://api.imgflip.com/get_memes")
          .then(res => res.json())
          .then(data => setAllMemes(data.data.memes))
          .catch(err => console.log(err))
      return () => {}
  }, [])

  function getMemeImage() {
      const randomNumber = Math.floor(Math.random() * allMemes.length)
      const url = allMemes[randomNumber].url
      setMeme(prevMeme => ({
          ...prevMeme,
          randomImage: url
      }))
  }

  function handleChange(event) {
      const {name, value} = event.target
      setMeme(prevMeme => ({
          ...prevMeme,
          [name]: value
      }))
  }

  function download(){
    domtoimage.toBlob(document.getElementById('meme'))
      .then(function (blob) {
          window.saveAs(blob, 'memegen.png');
      });
  }

  return (
    <main>
      <div className="d-flex flex-column justify-content-center">
        <input 
        type="text"
        placeholder="Top-text"
        className="form-control"
        name="topText"
        value={meme.topText}
        onChange={handleChange}
        />

        <input 
        type="text"
        placeholder="Bottom-text"
        className="form-control my-1"
        name="bottomText"
        value={meme.bottomText}
        onChange={handleChange}
        />  

        <button 
          className="btn btn-primary mb-3"
          onClick={getMemeImage}
        >
         New MemeImage
        </button>

        <div id="meme" className="d-flex flex-column justify-content-center">
          <img src={meme.randomImage}  id="meme-image" />
          <h2 className="meme-text top" >{meme.topText}</h2>
          <h2 className="meme-text bottom">{meme.bottomText}</h2>
        </div>

        <button className="form-button" onClick={download}>Download</button>
      </div>
    </main>
  )
}