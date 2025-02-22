import React, { useState } from 'react';
import { Wand2, Image, Loader2, Sliders, Download, RefreshCw, Info } from 'lucide-react';

interface GenerationOptions {
  width: number;
  height: number;
  steps: number;
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [options, setOptions] = useState<GenerationOptions>({
    width: 512,
    height: 512,
    steps: 20
  });

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate image generation with a placeholder
    setTimeout(() => {
      setPreviewUrl('https://images.unsplash.com/photo-1696446700704-46b61012f775?w=512&h=512&fit=crop');
      setIsGenerating(false);
    }, 2000);
  };

  const handleReset = () => {
    setPrompt('');
    setPreviewUrl('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wand2 className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              AI Image Creator
            </h1>
          </div>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Transform your ideas into stunning visuals with AI-powered image generation
          </p>
        </header>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Describe your image
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A serene landscape with mountains at sunset, digital art style..."
                className="w-full h-32 px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-400 focus:ring focus:ring-purple-400 focus:ring-opacity-20 transition-colors"
              />
              
              <div className="mt-6 space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-slate-300">Image Size</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-slate-400">Width</span>
                      <input
                        type="number"
                        value={options.width}
                        onChange={(e) => setOptions({...options, width: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Height</span>
                      <input
                        type="number"
                        value={options.height}
                        onChange={(e) => setOptions({...options, height: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300">Generation Steps</label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={options.steps}
                    onChange={(e) => setOptions({...options, steps: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Fast</span>
                    <span>{options.steps} steps</span>
                    <span>Detailed</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate
                    </>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 text-slate-300 mb-4">
                <Info className="w-5 h-5" />
                <h3 className="font-medium">Tips for better results</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Be specific about art style (e.g., "digital art", "oil painting")</li>
                <li>• Include details about lighting and atmosphere</li>
                <li>• Mention color schemes you want to see</li>
                <li>• Specify camera angles for more control</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Image className="w-5 h-5" />
              Preview
            </h2>
            
            {previewUrl ? (
              <div className="space-y-4">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-700">
                  <img
                    src={previewUrl}
                    alt="Generated preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Image
                </button>
              </div>
            ) : (
              <div className="aspect-square rounded-lg bg-slate-700 flex items-center justify-center">
                <p className="text-slate-500 text-center px-4">
                  Your generated image will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;