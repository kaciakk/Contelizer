import { useState } from "react";

const HomePage = () => {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [shuffledContent, setShuffledContent] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "text/plain") {
      alert("Proszę wgrać plik tekstowy (.txt)");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);
      setShuffledContent(shuffleText(content));
    };
    reader.readAsText(file, "UTF-8");
  };

  const handleReset = () => {
    setFileContent("");
    setFileName("");
    setShuffledContent("");
  };

  const shuffleWord = (word) => {
    if (word.length <= 3) return word;

    const first = word[0];
    const last = word[word.length - 1];
    const middle = word.slice(1, -1).split("");

    for (let i = middle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [middle[i], middle[j]] = [middle[j], middle[i]];
    }

    return first + middle.join("") + last;
  };

  const shuffleText = (text) => {
    return text.replace(/\p{L}+/gu, (word) => shuffleWord(word));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Wgraj plik tekstowy
        </h1>

        <form className="bg-white p-6 rounded-2xl shadow-lg w-full text-center">
          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded w-full mb-4 focus:ring-2 focus:ring-blue-400"
          />

          {fileName && (
            <>
              <p className="font-semibold mb-2 text-gray-800">
                Wczytano plik:{" "}
                <span className="text-blue-600 font-medium">{fileName}</span>
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                Wyczyść
              </button>
            </>
          )}
        </form>

        {fileContent && (
          <div className="mt-8 bg-white shadow-lg rounded-2xl p-6 text-left whitespace-pre-wrap">
            <h2 className="font-semibold mb-2 text-blue-700">
              Oryginalny tekst:
            </h2>
            <pre className="text-sm text-gray-800 bg-gray-50 p-3 rounded mb-4 overflow-x-auto">
              {fileContent}
            </pre>

            <h2 className="font-semibold mb-2 text-green-700">
              Tekst po przetasowaniu:
            </h2>
            <pre className="text-sm text-gray-800 bg-gray-50 p-3 rounded overflow-x-auto">
              {shuffledContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
