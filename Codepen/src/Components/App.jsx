import Editor from "./Editor.jsx";
import React, { useState, useEffect } from "react";
import uselocalstorage from "../hooks/uselocalstorage.jsx";

function App() {
  let [html, setHtml] = uselocalstorage("html", "");
  let [css, setCss] = uselocalstorage("css", "");
  let [js, setJs] = uselocalstorage("js", "");
  let [srcDoc, setsrcDoc] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setsrcDoc(`
       <html>
       <body>${html}</body>
       <style>${css}</style>
       <script>${js}</script>
       </html>
       `);
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [html, css, js]);

  return (
    <>
      <div className="pen top-box">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pen bottom-box">
        <iframe
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          height="100%"
          width="100%"
          srcDoc={srcDoc}
        />
      </div>
    </>
  );
}

export default App;
