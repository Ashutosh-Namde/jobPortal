import React from 'react'
import {Carousel , CarouselContent ,CarouselItem , CarouselPrevious} from '../ui/carousel'
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
    <div className='w-full max-w-xl mx-auto my-20'>
        <Carousel>
            < CarouselContent>
                {
                   category.map((cat,index)=>(
                      <CarouselItem className={"md:basic-1/2 lg-basic-1/3"}>
                        <Button className={"rounded-full"}>{cat}</Button>
                      </CarouselItem>
                   ))
                }
            </CarouselContent>
            <CarouselPrevious/>
        </Carousel>
    </div>
  )
}

export default CategoryCarousel