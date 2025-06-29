import { CodeEditor } from './components/code-editor';
import { FeedbackPanel } from './components/feedback-panel';
import { Header } from './components/header-panel';
import { Sidebar } from './components/history-panel';

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 p-6">
            <CodeEditor />
          </div>

          <div className="w-96 bg-white border-l border-gray-200 flex-shrink-0">
            <FeedbackPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
