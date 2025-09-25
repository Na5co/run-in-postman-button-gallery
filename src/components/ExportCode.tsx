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
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const handleCopy = async (text: string, key: string) => {
    try {
      await copyToClipboard(text);
      setCopiedStates({ ...copiedStates, [key]: true });
      setTimeout(() => {
        setCopiedStates({ ...copiedStates, [key]: false });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  const handleDownload = () => {
    if (generatedHtml) {
      const blob = new Blob([generatedHtml.full], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'postman-button.html';
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
        
        <button
          onClick={() => handleCopy(generatedHtml[activeTab], activeTab)}
          className={`group absolute top-4 right-4 p-3 rounded-xl transition-all duration-200 ease-in-out ${
            copiedStates[activeTab]
              ? 'bg-emerald-500 text-white shadow-lg scale-110'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
          }`}
          title="Copy to clipboard"
        >
          <span className={`absolute -top-14 right-0 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm shadow-xl transition-all duration-200 ease-in-out ${copiedStates[activeTab] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
            Copied!
          </span>
          {copiedStates[activeTab] ? (
            <Check className="w-5 h-5" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <p className="text-slate-400 text-sm">
          {activeTab === 'inline' 
            ? 'Copy this code to embed directly in your webpage.'
            : 'Complete HTML file ready for download'
          }
        </p>
        
        {activeTab === 'full' && (
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-xl hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-violet-500/25"
          >
            <Download className="w-5 h-5 mr-2" />
            Download HTML
          </button>
        )}
      </div>
    </div>
  );
});
