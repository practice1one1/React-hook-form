import React from 'react';
import ReactSelect from 'react-select';
import { formatError } from 'zod';
import {
  colorOptions,
  flavourOptions,
  groupedOptions,
} from '../data/ReactSelectOptions';

// styles for each group's label:
const formatGroupLabel = (groupedData) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e0efffff',
    }}
  >
    <span>{groupedData.label}</span>
    <span
      style={{
        marginLeft: '10px',
        backgroundColor: '#0045b5ff',
        color: '#fff',
        padding: '5px',
        borderRadius: '5px',
      }}
    >
      {groupedData.options.length}
    </span>
  </div>
);
// Find how to set the width of the options-dialog as it can't be set in the format of the group-options label above

export const ControllerSelectForm = () => {
  return (
    <div>
      <ReactSelect
        options={groupedOptions}
        placeholder={'Select a color or flavour...'}
        defaultValue={colorOptions[1]}
        formatGroupLabel={formatGroupLabel}
      />
    </div>
  );
};
