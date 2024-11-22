import React, { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface selectProps {
  title : string;
  data : any;
  onChange : any;
  city : number
}
const SelectCompo : FC<selectProps> = ({title , data , onChange , city}) => {
  return (
    <Select onValueChange={(open) => onChange(open)}>
      <SelectTrigger className='w-[120px] border-black '>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        {data.map((t: any) => (
          <SelectItem  className={`w-full hover:text-red-800 ${t.id == city && 'text-red-800'}`} key={t.id} value={t.id} >
            {t.city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCompo;
