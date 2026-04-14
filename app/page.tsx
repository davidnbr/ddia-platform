import { curriculum } from "@/lib/curriculum";
import { ChapterCard } from "@/components/ChapterCard";
import { Database } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Database className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Designing Data-Intensive Applications
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            An interactive learning platform for mastering the big ideas behind reliable, scalable, and maintainable systems.
          </p>
        </header>

        <div className="space-y-16">
          {curriculum.map((part) => (
            <section key={part.id} className="space-y-6">
              <div className="flex items-center space-x-4 border-b pb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground font-bold text-sm">
                  {part.id.split('-')[1]}
                </span>
                <h2 className="text-2xl font-bold tracking-tight">{part.title}</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {part.chapters.map((chapter) => (
                  <ChapterCard key={chapter.id} chapter={chapter} partId={part.id} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-20 py-8 border-t text-center text-sm text-muted-foreground">
          <p>Based on the book by Martin Kleppmann. Created for educational purposes.</p>
        </footer>
      </div>
    </main>
  );
}
