import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/jobSlice';
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form';




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
  const [selectedValue , setSelectedValue] = useState([])

  // const handleFilterValue = (value)=>{
  //   // setSelectedValue(value)
  // }
  const handleFilterValue = (item) => {
  if (selectedValue.includes(item)) {
    // agar already select hai → remove karo
    setSelectedValue(selectedValue.filter((i) => i !== item));
  } else {
    // agar select nahi hai → add karo
    setSelectedValue([...selectedValue, item]);
  }
};

  // useEffect(()=>{
  //   dispatch(setSearchQuery(selectedValue))

  //   console.log(selectedValue,"selectd");
    
  // },[selectedValue])


  useEffect(() => {
  dispatch(setSearchQuery(selectedValue)); // Redux me array send ho raha
  console.log("Selected filters:", selectedValue);
}, [selectedValue]);



  return (
    <div className='pl-8'>
        <h1>Filter Jobs</h1>
        <hr className='mt-3 mb-2'/>

        {/* <RadioGroup value={selectedValue} onValueChange={handleFilterValue}>
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
        </RadioGroup> */}
     {/* <Form {...form}>
  <form onSubmit={form.handleSubmit((data) => console.log(data))}>
    <FormField
      control={form.control}
      name="acceptTerms"
      render={({ field }) => (
        <FormItem className="flex items-center space-x-2">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
            {
                filters.map((data,index)=>(
                    <div className=''>
                        <h1 className='mb-2 font-semibold '>{data.filterType}</h1>
                        {
                            data.array.map((item,idx)=>{
                              const itemId = `id${index}-${idx}`
                                return(
                                    <div className='flex gap-4  '>
                                <FormLabel value={item} id={itemId} />
                                <label >{item}</label>
                                    </div>
                            )})
                        }
                    </div>
                ))
            }
          <FormLabel>Accept Terms & Conditions</FormLabel>
          <FormLabel>Accept Terms & Conditions</FormLabel>
          <FormLabel>Accept Terms & Conditions</FormLabel>
          <FormLabel>Accept Terms & Conditions</FormLabel>
          <FormLabel>Accept Terms & Conditions</FormLabel>
        </FormItem>
      )}
    />
    <button type="submit">Submit</button>
  </form>
</Form> */}
{filters.map((data, index) => (
  <div key={index} className="mb-4">
    <h1 className="mb-2 font-semibold">{data.filterType}</h1>
    {data.array.map((item, idx) => {
      const itemId = `id${index}-${idx}`;
      return (
        <div key={itemId} className="flex items-center gap-2">
          <Checkbox
            id={itemId}
            checked={selectedValue.includes(item)}
            onCheckedChange={() => handleFilterValue(item)}
          />
          <label htmlFor={itemId}>{item}</label>
        </div>
      );
    })}
  </div>
))}


        
    </div>
  )
}

export default FilterCard
