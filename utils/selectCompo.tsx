import React, { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface selectProps {
  title: string;
  data: any;
  onChange: any;
  city: number;
}
const SelectCompo: FC<selectProps> = ({ title, data, onChange, city }) => {
  const checkArry: any[] = [];

  return (
    <Select onValueChange={(open) => onChange(open)}>
      <SelectTrigger className='w-[120px] text-red-800 border-black '>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        {data.map((t: any) => {
          if (checkArry.filter((item: any) => item.cityName === t.cityName).length === 0) {
            checkArry.push(t);

            return (
              <SelectItem
                className={`w-full hover:text-red-800 ${t.id == city && 'text-red-800'}`}
                key={t.id}
                value={t.id}
              >
                {t.cityName}
              </SelectItem>
            );
          }
        })}
      </SelectContent>
    </Select>
  );
};

export default SelectCompo;
