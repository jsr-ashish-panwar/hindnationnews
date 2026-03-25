import Hero from "@/components/Home/Hero";
import CategoryBar from "@/components/Home/CategoryBar";
import NewsGrid from "@/components/Home/NewsGrid";
import VideoSection from "@/components/Home/VideoSection";
import { getPosts } from "@/lib/dataService";

const thoughts: string[] = [
  "Bringing you the truth from every corner of the nation with integrity and speed.",
  "Journalism is not just a profession; it is a commitment to the public's right to know.",
  "In a world of noise, we strive to be the clear voice of reason and reality.",
  "Our camera lenses capture more than images; they capture the heart of the nation.",
  "Every story matters, because every citizen's experience shapes our democracy.",
  "We don't just report the news; we explain what it means for you.",
  "Truth is the only foundation upon which a strong nation can be built.",
  "Behind every headline is a human story waiting to be understood.",
  "Fearless reporting is the lifeblood of a transparent society.",
  "We cross the boundaries to bring the ground realities straight to your screen.",
  "A free press is the loudest voice of the common man.",
  "Information is power, and our duty is to empower you.",
  "We ask the hard questions so you don't have to.",
  "In the digital age, speed is important, but accuracy is paramount.",
  "Our fidelity is to the facts, our loyalty is to the people.",
  "Uncovering the truth is not always easy, but it is always necessary.",
  "We are the bridge between the events that shape our world and your understanding of them.",
  "A well-informed public is the best defense against corruption and injustice.",
  "We bring the news from the margins to the mainstream.",
  "Journalism is the first draft of history; we aim to write it right.",
  "Your trust is our most valuable asset, and we work every day to earn it.",
  "We stand with the truth, no matter who it makes uncomfortable.",
  "Every breaking news alerts us to our duty: to inform without bias.",
  "We don't just scratch the surface; we dig deep into the core of the issue.",
  "The pen and the camera are our instruments of accountability.",
  "We shine a light in the dark corners where truth is often hidden.",
  "Our reporters are the eyes and ears of a waking nation.",
  "We believe in the power of storytelling to create positive change.",
  "From the bustling cities to the quietest villages, we are there.",
  "Truth has no agenda, and neither do we."
];

export default async function Home() {
  let mappedArticles: any[] = [];
  try {
    const allArticles = await getPosts();
    
    mappedArticles = allArticles.filter((art: any) => art.isPublished !== false).map((art: any) => {
      const pubDate = new Date(art.publishDate);
      const validDate = isNaN(pubDate.getTime()) ? new Date() : pubDate;
      
      return {
        id: art.id || art._id,
        title: art.title,
        excerpt: art.excerpt,
        image: art.image,
        category: art.category,
        date: validDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };
    });
  } catch (error) {
    console.error("Failed to load posts:", error);
  }

  const featuredArticle = mappedArticles.find(a => (a as any).category === 'Featured') || mappedArticles[0];
  // If there are very few articles, include the featured one in the grid so it's not empty
  const gridArticles = mappedArticles.length > 3 
    ? mappedArticles.filter(a => (a as any).id !== featuredArticle?.id).slice(0, 6)
    : mappedArticles.slice(0, 6);

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const thoughtIndex = dayOfYear % thoughts.length;
  const currentThought = thoughts[thoughtIndex];

  return (
    <div className="flex flex-col bg-white">
      <Hero featuredArticle={featuredArticle} currentThought={currentThought} />
      <CategoryBar />
      <NewsGrid articles={gridArticles} />
      <VideoSection />
    </div>
  );
}
