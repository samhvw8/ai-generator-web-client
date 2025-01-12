interface ErrorDisplayProps {
  error: string | null;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div
      className={`transition-opacity duration-200 ${error ? 'opacity-100' : 'opacity-0'}`}
      role="alert"
      aria-live="polite"
    >
      {error && (
        <div className="p-4 rounded-lg bg-destructive/15 text-destructive dark:bg-destructive/10 dark:text-destructive-foreground">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}