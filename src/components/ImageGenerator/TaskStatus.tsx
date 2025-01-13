import { memo } from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { taskStatusAtom } from '../../atoms/imageGenerator';
import { Badge } from '../ui/badge';
import type { MidjourneyTaskResponse } from '../../types/image';

type TaskStatusProps = {
  className?: string;
};

const getStatusConfig = (t: (key: string) => string) => ({
  PENDING: { color: 'bg-yellow-500', text: t('imageGenerator.status.pending') },
  RUNNING: { color: 'bg-blue-500', text: t('imageGenerator.status.running') },
  SUCCESS: { color: 'bg-green-500', text: t('imageGenerator.status.success') },
  FAILED: { color: 'bg-red-500', text: t('imageGenerator.status.failed') },
});

export const TaskStatus = memo(function TaskStatus({ className = '' }: TaskStatusProps) {
  const [taskStatus] = useAtom(taskStatusAtom);
  const { t } = useTranslation();
  const statusConfig = getStatusConfig(t);

  if (!taskStatus.taskId) {
    return null;
  }

  const estimatedSeconds = taskStatus.estimatedWaitTime
    ? Math.ceil(taskStatus.estimatedWaitTime / 1000)
    : null;

  return (
    <div className={`space-y-2 text-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`${statusConfig[taskStatus.status].color} text-white`}>
            {statusConfig[taskStatus.status].text}
          </Badge>
          <span className="text-muted-foreground">
            {t('imageGenerator.status.taskId')} {taskStatus.taskId}
          </span>
        </div>
        {estimatedSeconds && (
          <span className="text-muted-foreground">
            {t('imageGenerator.status.estimatedWait')} {estimatedSeconds}s
          </span>
        )}
      </div>
      
      {taskStatus.progress && (
        <output 
          htmlFor={taskStatus.taskId}
          aria-live="polite"
          className="flex items-center gap-2"
        >
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
          <p className="text-muted-foreground">
            {taskStatus.progress}
          </p>
        </output>
      )}
      
      {taskStatus.status === 'FAILED' && taskStatus.failReason && (
        <div 
          role="alert" 
          className="text-destructive font-medium"
        >
          Error: {taskStatus.failReason}
        </div>
      )}
    </div>
  );
});

TaskStatus.displayName = 'TaskStatus';