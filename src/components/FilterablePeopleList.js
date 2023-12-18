"use client";

import { useState } from "react";
import people from "@/utils/data";
import Switch from "./Switch";
import Person, { MemoPerson } from "./Person";

export default function FilterablePeopleList({
  id,
  shouldUseMemoPerson = false,
  shouldUseIDAsKey = false,
}) {
  const [isActiveOnly, setIsActiveOnly] = useState(false);
  const [orderByAge, setOrderByAge] = useState(false);

  let list = Array.from(people);

  if (isActiveOnly) {
    list = list.filter((person) => person.isActive);
  }

  if (orderByAge) {
    list = list.sort((a, b) => a.age - b.age);
  }

  const PersonComponent = shouldUseMemoPerson ? MemoPerson : Person;

  return (
    <div className="flex flex-col py-8 gap-8 w-full md:w-1/2 xl:w-1/3 border max-w-lg">
      <div className="w-full flex flex-col justify-between px-4">
        <h3 className="text-xl lg:text-2xl font-medium">
          {shouldUseIDAsKey ? "ID" : "Index"} Key List
        </h3>
        <Switch
          id={`${id}-filter`}
          label="Show active people only"
          onChange={(isChecked) => setIsActiveOnly(isChecked)}
        />
        <Switch
          id={`${id}-order`}
          label="Order by age"
          onChange={(isChecked) => setOrderByAge(isChecked)}
        />
      </div>
      <div className="flex flex-col gap-4 divide-y">
        {list.map((item, index) => (
          <PersonComponent {...item} key={shouldUseIDAsKey ? item.id : index} />
        ))}
      </div>
    </div>
  );
}
