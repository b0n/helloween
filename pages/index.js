import { useState } from 'react';
import Tesseract from 'tesseract.js';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // ファイル選択時のハンドラ（スマホカメラを含む）
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setExtractedText('');
    setResponse('');
  };

  // 画像からテキストを抽出し、応答を生成
  const handleExtractText = async () => {
    if (selectedFile) {
      setLoading(true);
      // Tesseractで画像からテキストを抽出
      const { data: { text } } = await Tesseract.recognize(selectedFile, 'jpn');
      setExtractedText(text);
      generateResponse(text);
      setLoading(false);
    }
  };

  // 抽出テキストに基づいた応答を生成
  /*
  const generateResponse = (text) => {
    if (text.includes("シュレッダー") && text.includes("注意")) {
      setResponse("シュレッダー使用時の注意点が含まれています。指示に従い安全に使用してください。");
    } else if (text.includes("扉を開け") && text.includes("平らに")) {
      setResponse("シュレッダーのクズを平らにするよう指示があります。");
    } else {
      setResponse("特定の指示が見つかりませんでした。");
    }
  };
  */

  // 抽出テキストに基づいた応答を生成（Halloween風の怖い演出）
  const generateResponse = (text) => {
    if (text.includes("シュレッダー") && text.includes("注意")) {
      setResponse("⚠️ 警告！このシュレッダーはただの機械ではありません。近づきすぎないように…。一度何かを飲み込むと止まりません。命を守るため、指示に従い慎重に扱ってください。");
    } else if (text.includes("扉を開け") && text.includes("平らに")) {
      setResponse("扉を開けるときは細心の注意を払ってください。シュレッダーの内部には不気味なほど鋭い刃が潜んでいます。クズを平らにしなければ、その刃が目を覚まし…あなたに襲いかかるかもしれません…");
    } else {
      setResponse("不気味な静寂…。特定の指示が見つかりませんでしたが、シュレッダーはじっとこちらを見つめています…油断しないでください。");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>画像からテキスト抽出</h1>
      
      <input
        type="file"
        accept="image/*"
        capture="environment"  // スマホカメラを直接起動
        onChange={handleFileChange}
      />
      <button onClick={handleExtractText} style={{ marginLeft: '10px' }} disabled={!selectedFile}>
        テキストを抽出
      </button>

      {loading && <p>読み取り中...</p>}

      {extractedText && (
        <div style={{ marginTop: '20px' }}>
          <h2>抽出されたテキスト:</h2>
          <p>{extractedText}</p>
          
          <h2>応答:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

