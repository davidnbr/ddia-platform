import fs from "fs";
import path from "path";
import { curriculum, getNavigation } from "@/lib/curriculum";
import { CompileMDXResult, compileMDX } from "next-mdx-remote/rsc";
import { CompleteButton } from "@/components/CompleteButton";
import { Quiz } from "@/components/Quiz";
import { LatencySimulator } from "@/components/simulations/LatencySimulator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const components = {
  Quiz,
  LatencySimulator,
};

export function generateStaticParams() {
  return curriculum
    .flatMap((part) => part.chapters)
    .flatMap((chapter) => chapter.sections)
    .map((section) => ({ slug: section.id }));
}

export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const nav = getNavigation(slug);

  if (!nav) {
    return <div>Lesson not found</div>;
  }

  const { current, next } = nav;
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);

  let content: React.ReactNode;

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const mdx: CompileMDXResult = await compileMDX({
      source: fileContent,
      components: components,
      options: { parseFrontmatter: true },
    });
    content = mdx.content;
  } else {
    content = (
      <div className="p-8 border-2 border-dashed rounded-lg text-center text-muted-foreground bg-muted/20">
        <p>This lesson content is not yet available.</p>
        <p className="text-sm mt-2">Content for &ldquo;{current.section.title}&rdquo; is coming soon.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Curriculum
          </Link>
          <div className="text-sm font-semibold">{current.chapter.title}</div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">{current.section.title}</h1>
          <p className="text-xl text-muted-foreground">{current.section.description}</p>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          {content}
        </article>

        <CompleteButton
          sectionId={slug}
          nextSectionUrl={next ? `/learn/${next.section.id}` : null}
        />
      </main>
    </div>
  );
}
