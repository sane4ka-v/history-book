import { useEffect, useState } from "react";
import { PageFlip } from "page-flip";
import axios from "axios";

import Page from "./components/Page";
import { PAGES_CONTENT } from "./constants/pages";

import "./App.css";

function App() {
    // useEffect(() => {
    //   debugger
    //     axios
    //         .get(
    //             "https://cors-anywhere.herokuapp.com/https://www.magtu.ru/sveden/common/istoriya.html",
    //             {
    //                 headers: {
    //                     Origin: "https://magtu.ru",
    //                 },
    //             }
    //         )
    //         .then((response) => {
    //           debugger
    //             const parser = new DOMParser();
    //             const doc = parser.parseFromString(response.data, "text/html");

    //             const articleBody = doc.querySelector(
    //                 'div[itemprop="articleBody"]'
    //             );

    //             let text = "";
    //             articleBody.querySelectorAll("p").forEach((p) => {
    //                 text += p.textContent + "\n";
    //             });

    //             console.log(text);
    //         })
    //         .catch((error) => console.log(error));
    // }, []);

    const [showLoader, setShowLoad] = useState(true);

    useEffect(() => {
      
        fetch("https://www.magtu.ru/sveden/common/istoriya.html")
            .then((res) => res.text())
            .then((res) => {
              let pText=""
              const regex = /<p>(.*?)<\/p>/g;
              let html = res
              let match;
              while((match=regex.exec(html)) !== null) {
                 pText += match[1];
                 
              }
              const startIndex = pText.indexOf('В декабре');
              const cleanedText = pText.substring(startIndex)
              .replace(/<\/?a[^>]*>|<\/?strong[^>]*>/g, '')
              .replace(/&nbsp[^&]*$/g, '')
              .replace(/<img\b[^>]*>|<\/>/gi, '')
              .replace(/&nbsp;/gi,'')
              .replace(/R&amp;/gi,'')
              .replace(/<em>/gi,'')
              .replace(/<[/]em>/gi,'');
              console.log(cleanedText);
                         
          
            
               
                setShowLoad(false);
            })
            .catch((e) => {
                console.log("Catch Error = ", e);
            });
    }, []);

    useEffect(() => {
        if (!showLoader) {
            const pageFlip = new PageFlip(document.getElementById("book"), {
                width: 500, // required parameter - base page width
                height: 550, // required parameter - base page height

                showCover: true,
            });

            pageFlip.loadFromHTML(document.querySelectorAll(".my-page"));
        }
    }, [showLoader]);

    return (
        <div className="App">
            {showLoader ? (
                <h1>Loader...</h1>
            ) : (
                <div id="book">
                    {PAGES_CONTENT.map((info, idx) => (
                        <Page key={idx} data={info} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
