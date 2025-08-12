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
    // "Frontend veloper",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer"
  ]

  return (
    <div className='w-full max-w-xl mx-auto my-20'>
      <Carousel className="w-full">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
              <Button className="rounded-full">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )   
}

export default CategoryCarousel
