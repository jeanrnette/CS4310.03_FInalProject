// CARDDDD

export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-[8px] border border-[var(--teal)] bg-white shadow-sm transition hover:shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }) {
  return (
    <div
      className={`border-b border-[var(--sky-shade)] px-4 py-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...props }) {
  return (
    <h2
      className={`font-['Bebas_Neue'] text-xl uppercase tracking-wide text-[var(--teal)] ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}