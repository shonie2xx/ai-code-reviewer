'use client';

import CodeEditor from '@/components/panels/CodeEditor/CodeEditor';
import FeedbackPanel from '@/components/panels/FeedbackPanel/FeedbackPanel';
import Header from '@/components/panels/HeaderPanel/Header';
import History from '@/components/panels/HistoryPanel/History';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUserStore } from '@/store/userStore';
import { z } from 'zod';

import { useEffect, useState } from 'react';

export default function Home() {
  const { userId, setUserId } = useUserStore();
  const [showStartup, setShowStartup] = useState(!userId);

  useEffect(() => {
    const storedUserId = useUserStore.getState().getUserId();
    if (storedUserId) {
      setUserId(storedUserId);
      setShowStartup(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uuidSchema = z.string().uuid();

  const handleContinue = () => {
    try {
      uuidSchema.parse(userId);
      setUserId(userId.trim());
      setShowStartup(false);
    } catch (e) {
      alert('Please enter a valid UUID.');
      console.error('Invalid UUID:', e);
    }
  };

  const handleGenerateUUID = () => {
    const newId = crypto.randomUUID();
    setUserId(newId);
  };

  return (
    <>
      {showStartup ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800">
          <div className="p-6 rounded text-center bg-white text-black ">
            <h2 className="text-lg font-semibold mb-4">Welcome to AI Code Reviewer</h2>
            <p className="mb-4">If you lose your id, you will lose your history.</p>
            <Textarea
              className="w-full min-h-fit resize-none "
              placeholder="Paste your unique user ID here"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <Button
              className="w-full bg-gray-800 text-white hover:bg-gray-800 mt-4"
              onClick={handleGenerateUUID}
            >
              Generate New ID
            </Button>
            <Button className="w-full bg-blue-800 text-white mt-4" onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </div>
      ) : (
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

              <div className="flex-1 border-l border-gray-200 p-6">
                <FeedbackPanel />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
