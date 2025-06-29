export default function FeedbackPanel() {
  return (
    <div className="h-full flex flex-col p-6 bg-[#1a1a1a]">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-lg font-semibold text-white">AI Feedback</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">
              Submit your code to receive AI-powered feedback and recommendations.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Ready for review</span>
          <span>0 issues found</span>
        </div>
      </div>
    </div>
  );
}
