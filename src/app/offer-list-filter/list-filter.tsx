import { useState } from 'react';
import FilterCategory from './filter-category';
import FilterTitle from './filter-title';

export type FilterProps = {
  category: number | null;
  title: string | null;
};

interface FilterOps {
  updateSelection: (props: FilterProps) => void;
}

export function ListFilter({ updateSelection }: FilterOps) {
  const [category, setCategory] = useState(0);
  const [title, setTitle] = useState('');

  function updateCategory(category: number) {
    setCategory(category);
    const newFilter: FilterProps = { category, title };
    updateSelection(newFilter);
  }

  function updateTitle(title: string) {
    setTitle(title);
    const newFilter: FilterProps = { category, title };
    updateSelection(newFilter);
  }

  return (
    <>
      <FilterTitle updateTitle={updateTitle} />
      <FilterCategory updateCategory={updateCategory} />
    </>
  );
}

export default ListFilter;
