import { useAtom } from 'jotai';
import { taskStatusAtom } from '../../atoms/imageGenerator';
import { Badge } from '../ui/badge';

const statusConfig = {
  PENDING: { color: 'bg-yellow-500', text: 'Pending' },
  RUNNING: { color: 'bg-blue-500', text: 'Running' },
  SUCCESS: { color: 'bg-green-500', text: 'Success' },
  FAILED: { color: 'bg-red-500', text: 'Failed' },
};

export function TaskStatus() {
  const [taskStatus] = useAtom(taskStatusAtom);

  if (!taskStatus.taskId) {
    return null;
  }

  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`${statusConfig[taskStatus.status].color} text-white`}>
            {statusConfig[taskStatus.status].text}
          </Badge>
          <span className="text-muted-foreground">Task ID: {taskStatus.taskId}</span>
        </div>
        {taskStatus.estimatedWaitTime && (
          <span className="text-muted-foreground">
            Est. wait: {Math.ceil(taskStatus.estimatedWaitTime / 1000)}s
          </span>
        )}
      </div>
      
      {taskStatus.progress && (
        <p className="text-muted-foreground">{taskStatus.progress}</p>
      )}
      
      {taskStatus.status === 'FAILED' && taskStatus.failReason && (
        <div className="text-destructive font-medium">
          Error: {taskStatus.failReason}
        </div>
      )}
    </div>
  );
}