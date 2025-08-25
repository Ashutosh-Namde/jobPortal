import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/jobSlice';

const filters = [
  {
    filterType: "Location",
    array: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer"],
  },
  {
    filterType: "Salary",
    array: [
      "₹2 Lakh - ₹4 Lakh",
      "₹4 Lakh - ₹6 Lakh",
      "₹6 Lakh - ₹8 Lakh",
      "₹8 Lakh - ₹10 Lakh",
      // "₹10 Lakh - ₹15 Lakh",
      "₹15 Lakh & above",
    ],
  },
];



const FilterCard = () => {
  const dispatch = useDispatch()
  const [selectedValue , setSelectedValue] = useState("")

  const handleFilterValue = (value)=>{
    setSelectedValue(value)
  }
  useEffect(()=>{
    dispatch(setSearchQuery(selectedValue))

    console.log(selectedValue);
    
  },[selectedValue])
  return (
    <div>
        <h1>Filter Jobs</h1>
        <hr className='mt-3 mb-2'/>

        <RadioGroup value={selectedValue} onValueChange={handleFilterValue}>
            {
                filters.map((data,index)=>(
                    <div className=''>
                        <h1 className='mb-2 font-semibold '>{data.filterType}</h1>
                        {
                            data.array.map((item,idx)=>{
                              const itemId = `id${index}-${idx}`
                                return(
                                    <div className='flex gap-4  '>
                                <RadioGroupItem value={item} id={itemId} />
                                <label >{item}</label>
                                    </div>
                            )})
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterCard