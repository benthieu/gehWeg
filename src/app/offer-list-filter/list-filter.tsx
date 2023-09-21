import {MenuItem, MenuList} from "@mui/material";
import {useContext, useState} from "react";
import StateContext from "../state/state.context";
import FilterCategory from "./filter-category";
import FilterTitle from "./filter-title";

export type FilterProps = {
  category: string | null;
  title: string | null;
}

interface FilterOps {
  updateSelection: (props: FilterProps) => void;
}

export function ListFilter({updateSelection}: FilterOps) {
  const {categories} = useContext(StateContext);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');

  function updateCategory(category:string) {
    setCategory(category);
    const newFilter: FilterProps = {category, title};
    updateSelection(newFilter);
  }

  function updateTitle(title:string) {
    setTitle(title);
    const newFilter: FilterProps = {category, title};
    updateSelection(newFilter);
  }

  const selectCategories: string[] = categories.map((c) => c.name);

  return (
    <>
      <MenuList>
        <MenuItem >
          <FilterTitle title={''} updateTitle={updateTitle}/>
        </MenuItem>
        <MenuItem >
          <FilterCategory
            categories={selectCategories}
            updateCategory={updateCategory}
          />
        </MenuItem>
      </MenuList>
    </>
  );
}

export default ListFilter;
