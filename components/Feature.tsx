function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card backdrop-blur-md border border-border p-6 rounded-2xl transition hover:scale-105 duration-300">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default Feature;
