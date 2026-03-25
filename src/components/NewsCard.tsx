import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  className?: string;
  isHorizontal?: boolean;
}

export default function NewsCard({ 
  id, title, excerpt, image, category, date, className, isHorizontal = false 
}: NewsCardProps) {
  return (
    <div className={cn(
      "group bg-white overflow-hidden transition-all duration-300",
      isHorizontal ? "flex flex-col md:flex-row gap-6 items-start" : "flex flex-row md:flex-col gap-4 md:gap-0 items-start md:items-stretch",
      className
    )}>
      {/* Image Wrapper */}
      <Link href={`/news/${id}`} className={cn(
        "relative overflow-hidden shrink-0 bg-gray-100 rounded-sm md:rounded-none block",
        isHorizontal ? "w-full md:w-1/2 aspect-video" : "w-[120px] md:w-full aspect-square md:aspect-[16/10]"
      )}>
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 md:top-4 md:left-4">
          <span className="bg-primary text-white text-[8px] md:text-[10px] font-bold uppercase tracking-widest px-2 py-1 md:px-3 md:py-1.5 rounded-sm line-clamp-1 max-w-full">
            {category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className={cn(
        "py-1 md:py-4 flex flex-col justify-between flex-1",
        isHorizontal ? "md:py-0" : ""
      )}>
        <div className="space-y-1.5 md:space-y-3">
          <div className="flex items-center text-gray-700 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 md:mb-0">
            <Calendar className="w-3 h-3 mr-1.5 hidden md:block" />
            {date}
          </div>
          <h3 className={cn(
            "font-bold text-black group-hover:text-primary transition-colors leading-tight tracking-tight",
            isHorizontal ? "text-xl md:text-3xl" : "text-sm md:text-xl line-clamp-3 md:line-clamp-2"
          )}>
            <Link href={`/news/${id}`} className="block">
              {title}
            </Link>
          </h3>
          <p className={cn(
            "text-gray-900 font-medium text-xs md:text-sm leading-relaxed",
            isHorizontal ? "line-clamp-2 md:line-clamp-3 mt-2" : "hidden md:-webkit-box md:line-clamp-2 mt-2"
          )}>
             {excerpt}
          </p>
        </div>
      </div>
    </div>
  );
}
