import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import {
  Button, TextField, InputAdornment, FormControl, Select, MenuItem,
} from '@material-ui/core';
import { nanoid } from 'nanoid';
import Icon from './icon/index';
import SearchField from './SearchField';

/*
      TODO: Table head component

      props:

      filtersConfig: [
        {column: 'Name', type: 'TextField', options:null, operation: 'LIKE'},
        {column: 'Role', type: 'Dropdown' options:['a', 'b', 'c'], operation: 'IN'},
        {column: 'Start Time', type: 'Date', options: null, operation: 'BETWEEN'}],
      filters: [['Start Time', 'LIKE', 'something'], ['Name', 'IN', ['b', 'c']], ['Start Time', 'BETWEEN', ['2021-08-16T14:21:54Z', '2021-08-16T14:21:54Z']]]
      setFilters,
      buttons,
      */

const AutoTableHead = ({
  hasFilter, classes, buttons, filterConfig, filter, setFilter,
}) => {
  const [tempFilterValue, setTempFilterValue] = useState('');
  const [tempFilterOptionValues, setTempFilterOptionValues] = useState([]);
  const [filteringIndex, setFilteringIndex] = useState(0);
  const [advanceSearchActivated, setAdvanceSearchActivated] = useState(false);

  const onSearch = () => {
    const { reduxStateId, operation } = filterConfig[filteringIndex];
    if (filterConfig[filteringIndex].type === 'ENUM') {
      // transformation from MultiSelect options (label) array to filter value array.
      // this will return the first option with the matching label
      const transformedTempFilterValue = tempFilterOptionValues.map(
        (optionLabel) => filterConfig[filteringIndex].options.filter((option) => option.label === optionLabel)[0].value,
      );
      setFilter([[reduxStateId, operation, transformedTempFilterValue]]);
    } else {
      setFilter([[reduxStateId, operation, tempFilterValue]]);
    }
  };

  return (
    <div className={hasFilter ? classes.topContent1 : classes.topContent2}>
      {hasFilter && (
        <div className={classes.filterWrapper}>
          <div>
            <FormControl variant="outlined">
              <Select
                autoWidth
                className={classes.filterSelect}
                value={filteringIndex}
                onChange={(e) => {
                  setFilteringIndex(e.target.value);
                }}
              >
                {filterConfig.map((item, index) => (
                  <MenuItem key={item.label} value={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <SearchField
              type={filterConfig[filteringIndex].type}
              tempFilterValue={tempFilterOptionValues}
              setTempFilterValue={setTempFilterOptionValues}
              classes={classes}
              filterConfig={filterConfig}
              filteringIndex={filteringIndex}
            />
          </div>
          <div className={classes.buttons}>
            <Button color="primary" onClick={onSearch} disabled={filterConfig[filteringIndex].type === 'DATE'}>
              <Icon.SearchIcon />
            </Button>
            <Button disabled>
              {/* TODO Advanced search */}
              <Icon.Advancedsearch className={classes.iconButtonIcon} />
            </Button>
          </div>
        </div>
      )}
      <div className={classes.buttons}>{buttons}</div>
    </div>
  );
};

export default AutoTableHead;
