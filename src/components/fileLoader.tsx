import "./fileLoader.css";

import { ChangeEvent, useState } from "react";

import Message, { StatusType } from "./message";

import LoadText from "./loadText";

import { analyze } from "../helper/analyze";
import AnalyzerTable from "./analyzerTable";

function FileLoader() {
  const [message, setMessage] = useState<string>("");

  const [messageStatus, setMessageStatus] = useState<StatusType>("none");

  const [loadedText, setLoadedText] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    resetParentMessage();

    const selectedFile = event.target.files?.[0];

    //if file not a TEXT file change message to warning
    if (selectedFile?.type !== "text/plain") {
      setMessageStatus("warning");

      setMessage("File should be a text file");
      return;
    }

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;

        if (!text) {
          setMessageStatus("warning");

          setMessage("File is empty");

          return;
        }

        setLoadedText(text);
      };

      reader.readAsText(selectedFile);
    }
  };

  const [analyzedData, setAnalyzedData] = useState<Map<string, number>>();

  const resetParentMessage = () => {
    setMessageStatus("none");
    setMessage("");
  };

  const analyzeCurrentContent = () => {
    if (loadedText) {
      const result = analyze(loadedText);

      setAnalyzedData(result);

      resetParentMessage();
    } else {
      setMessageStatus("warning");

      setMessage("No file loaded");
    }
  };
  return (
    <>
      <div className="wrapper">
        <form action="">
          <h1>File Loader</h1>
          <div className="input-box">
            <input
              type="file"
              name="file-loader"
              data-testid="file-loader"
              onChange={handleFileChange}
            />
            <i className="bx bxs-file-txt"></i>
          </div>

          {loadedText && (
            <div className="load-text-box">
              <LoadText text={loadedText} />
            </div>
          )}

          {analyzedData && (
            <div className="load-table-box">
              <AnalyzerTable analyzedData={analyzedData} />
            </div>
          )}

          <Message
            type={messageStatus}
            message={message}
            resetParentMessage={resetParentMessage}
          />

          <button
            type="button"
            className="btn"
            data-testid="analyze-id"
            onClick={analyzeCurrentContent}
          >
            Analyze
          </button>
        </form>
      </div>
    </>
  );
}

export default FileLoader;
