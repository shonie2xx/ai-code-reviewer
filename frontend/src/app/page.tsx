import { CodeEditor } from './components/code-editor';
import { FeedbackPanel } from './components/feedback-panel';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Content Panels */}
        <div className="flex-1 flex overflow-hidden">
          {/* Code Editor Panel */}
          <div className="flex-1 p-6">
            <CodeEditor />
          </div>

          {/* Feedback Panel */}
          <div className="w-96 bg-white border-l border-gray-200 flex-shrink-0">
            <FeedbackPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
