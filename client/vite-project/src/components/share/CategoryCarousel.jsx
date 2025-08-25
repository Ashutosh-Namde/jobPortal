import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '../ui/carousel'
import { Button } from '../ui/button'

const CategoryCarousel = () => {
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer"
  ]

  return (
    <div className="w-full max-w-5xl mx-auto my-10 px-4">
      <h2 className="text-xl font-semibold mb-6 text-center">Explore by Category</h2>

      <Carousel className="relative w-full">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem 
              key={index} 
              className="basis-1/1 sm:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <Button className="rounded-full px-6 py-3 text-base w-fit">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows – force visible */}
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex" />
      </Carousel>
    </div>
  )   
}

export default CategoryCarousel
