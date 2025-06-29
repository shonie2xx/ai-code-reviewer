import CodeEditor from '@/components/panels/CodeEditor/CodeEditor';
import FeedbackPanel from '@/components/panels/FeedbackPanel/FeedbackPanel';
import Header from '@/components/panels/HeaderPanel/Header';
import History from '@/components/panels/HistoryPanel/History';

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
        <History />
      </div>

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
