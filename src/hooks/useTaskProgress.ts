import { useAtom, useSetAtom } from 'jotai';
import { progressAtom, taskStatusAtom } from '../atoms/imageGenerator';

export function useTaskProgress() {
  const [progress] = useAtom(progressAtom);
  const setTaskStatus = useSetAtom(taskStatusAtom);

  const updateProgress = (taskId: string, progressText: string) => {
    // Extract progress value from text
    const progressValue = parseInt(progressText.match(/\d+/)?.[0] || '0', 10);
    
    // Update task status with progress
    setTaskStatus(prev => ({
      ...prev,
      status: 'RUNNING',
      taskId,
      progress: progressText,
      estimatedWaitTime: progressValue < 100 ? (100 - progressValue) * 1000 : undefined
    }));
  };

  return {
    progress,
    updateProgress
  };
}