// import { MessageSquare, CheckCircle, AlertTriangle, Info, Lightbulb } from 'lucide-react';

export function FeedbackPanel() {
  const placeholderFeedback = [
    {
      type: 'suggestion',
      icon: 'Lightbulb',
      title: 'Performance Optimization',
      message: 'Consider using memoization to optimize the recursive fibonacci function.',
      severity: 'medium',
    },
    {
      type: 'warning',
      icon: 'AlertTriangle',
      title: 'Code Complexity',
      message: 'The current implementation has exponential time complexity.',
      severity: 'high',
    },
    {
      type: 'info',
      icon: 'Info',
      title: 'Best Practice',
      message: 'Add input validation to handle edge cases.',
      severity: 'low',
    },
    {
      type: 'success',
      icon: 'CheckCircle',
      title: 'Good Practice',
      message: 'Function naming follows JavaScript conventions.',
      severity: 'low',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-600';
      case 'suggestion':
        return 'text-blue-600';
      case 'info':
        return 'text-gray-600';
      case 'success':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center gap-2 mb-6">
        {/* <MessageSquare className="h-5 w-5 text-gray-600" /> */}
        <h2 className="text-lg font-semibold text-gray-900">AI Feedback</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          <div className="text-center py-8 text-gray-500">
            {/* <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" /> */}
            <p className="text-sm">
              Submit your code to receive AI-powered feedback and recommendations.
            </p>
          </div>

          {/* Placeholder feedback items */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Sample Feedback:</h3>
            {placeholderFeedback.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getSeverityColor(item.severity)}`}
                >
                  <div className="flex items-start gap-3">
                    {/* <IconComponent className={`h-5 w-5 mt-0.5 ${getIconColor(item.type)}`} /> */}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-700">{item.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Ready for review</span>
          <span>0 issues found</span>
        </div>
      </div>
    </div>
  );
}
