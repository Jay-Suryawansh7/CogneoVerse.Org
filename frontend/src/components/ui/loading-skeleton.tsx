
interface LoadingSkeletonProps {
  type?: 'page' | 'grid' | 'detail';
}

export function LoadingSkeleton({ type = 'page' }: LoadingSkeletonProps) {
  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-64 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl" />
        ))}
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="pt-24 pb-16 px-4 animate-pulse max-w-7xl mx-auto">
        <div className="h-4 w-32 bg-white/5 rounded mb-8" />
        <div className="h-16 w-full max-w-2xl bg-white/5 rounded mb-4" />
        <div className="h-8 w-full max-w-xl bg-white/5 rounded mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="h-32 bg-white/5 rounded-xl border border-white/10" />
          <div className="h-32 bg-white/5 rounded-xl border border-white/10" />
          <div className="h-32 bg-white/5 rounded-xl border border-white/10" />
        </div>
        <div className="h-96 bg-white/5 rounded-2xl border border-white/10" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
      <div className="h-10 w-48 bg-white/5 rounded-lg mx-auto mb-4 border border-white/10" />
      <div className="h-6 w-96 bg-white/5 rounded-lg mx-auto mb-12 border border-white/10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-64 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl" />
        ))}
      </div>
    </div>
  );
}
