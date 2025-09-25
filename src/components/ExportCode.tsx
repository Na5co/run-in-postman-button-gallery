'use client';

import { memo, useState } from 'react';
import { Code, Copy, Check, Download } from 'lucide-react';
import { copyToClipboard } from '@/lib/html-generator';

interface ExportCodeProps {
  generatedHtml: {
    full: string;
    inline: string;
  } | null;
}

type Tab = 'full' | 'inline';

export const ExportCode = memo(function ExportCode({ generatedHtml }: ExportCodeProps) {
  const [activeTab, setActiveTab] = useState<Tab>('inline');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!generatedHtml) return;
    try {
      await copyToClipboard(generatedHtml[activeTab]);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  const handleDownload = () => {
    if (generatedHtml) {
      const blob = new Blob([generatedHtml[activeTab]], { type: activeTab === 'full' ? 'text/html' : 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `postman-button-${activeTab}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (!generatedHtml) {
    return null;
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl">
            <Code className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Export Code</h2>
        </div>
        
        <div className="flex bg-gray-800 rounded-xl p-1 border border-gray-700">
          <button
            onClick={() => setActiveTab('inline')}
            className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'inline'
                ? 'bg-violet-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Inline HTML
          </button>
          <button
            onClick={() => setActiveTab('full')}
            className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'full'
                ? 'bg-violet-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Full HTML
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800 overflow-hidden">
          <pre className="text-sm text-gray-300 overflow-x-auto leading-relaxed">
            <code>{generatedHtml[activeTab]}</code>
          </pre>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <p className="text-slate-400 text-sm">
          {activeTab === 'inline' 
            ? 'Copy this code to embed directly in your webpage.'
            : 'A complete HTML file ready to use.'
          }
        </p>
        
        <div className="flex gap-4">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center px-6 py-3 font-semibold rounded-xl transition-all shadow-lg hover:shadow-violet-500/25 ${
              isCopied
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600'
            }`}
          >
            {isCopied ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
            {isCopied ? 'Copied!' : 'Copy Code'}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center px-6 py-3 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-all shadow-lg hover:shadow-gray-500/25"
          >
            <Download className="w-5 h-5 mr-2" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
});
