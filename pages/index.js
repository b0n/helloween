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

  // 抽出テキストに基づいた応答を生成（Halloween風の怖い演出）
  const generateResponse = (text) => {
    // 正規表現でスペースを無視して特定のキーワードを検出
    const shredderRegex = /シュ\s*レ\s*ッ\s*ダー/;
    const cautionRegex = /注意/;
    const silentCloseRegex = /無音\s*で\s*閉め\s*まし\s*ょう/;
    const workIssueRegex = /仕事\s*に\s*支障\s*が\s*出\s*て\s*い\s*ま\s*す/;

    if (shredderRegex.test(text) && cautionRegex.test(text)) {
      setResponse("⚠️ 警告！このシュレッダーはただの機械ではありません。近づきすぎないように…。一度何かを飲み込むと止まりません。命を守るため、指示に従い慎重に扱ってください。");
    } else if (silentCloseRegex.test(text)) {
      setResponse("🤫 静かに…静かにドアを閉めてください。この場所には沈黙が必要です。少しでも音を立てると、何かが目を覚ましてしまうかもしれません…");
    } else if (workIssueRegex.test(text)) {
      setResponse("🕯️ 注意：仕事に不可解な支障が発生しています。何者かがこの場所を乱しているようです…慎重に対処してください。");
    } else if (text.includes("扉を開け") && text.includes("平らに")) {
      setResponse("扉を開けるときは細心の注意を払ってください。シュレッダーの内部には不気味なほど鋭い刃が潜んでいます。クズを平らにしなければ、その刃が目を覚まし…あなたに襲いかかるかもしれません…");
    } else {
      setResponse("👀 不気味な静寂…。特定の指示が見つかりませんでしたが、周囲には不穏な気配が漂っています…油断しないでください。");
    }
  };

  return (
      <div style={{ padding: '20px', fontFamily: 'Creepster, Arial', backgroundColor: '#0D0D0D', color: '#F5F5F5', textAlign: 'center', minHeight: '100vh' }}>
        <h1 style={{ color: '#FF4500' }}>🎃 Halloween Warning 🎃</h1>

        <input
            type="file"
            accept="image/*"
            capture="environment"  // スマホカメラを直接起動
            onChange={handleFileChange}
            style={{ padding: '10px', fontSize: '16px', marginBottom: '20px', borderRadius: '5px', border: '2px solid #FF4500' }}
        />
        <button
            onClick={handleExtractText}
            style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#FF4500', color: '#FFFFFF', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            disabled={!selectedFile}
        >
          テキストを抽出
        </button>

        {loading && <p style={{ color: '#FF4500' }}>🔄 読み取り中...</p>}

        {extractedText && (
            <div style={{ marginTop: '20px', backgroundColor: '#1C1C1C', padding: '20px', borderRadius: '10px', boxShadow: '0 0 15px rgba(255, 69, 0, 0.6)' }}>
              <h2>抽出されたテキスト:</h2>
              <p>{extractedText}</p>

              <h2>応答:</h2>
              <p style={{ fontSize: '1.2em', color: '#FF4500' }}>{response}</p>
            </div>
        )}

        <footer style={{ marginTop: '30px', color: '#666666', fontSize: '0.9em' }}>
          &copy; 2023 Halloween Warning System. All rights reserved.
        </footer>
      </div>
  );
}
