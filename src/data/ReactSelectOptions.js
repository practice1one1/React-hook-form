// This file has a variety of options to pass into ReactSelect's option attribute

// BASIC/MINIMAL:
// const options = [
//   { value: 'red', label: 'Red' },
//   { value: 'blue', label: 'Blue' },
//   { value: 'green', label: 'Green' },
// ];

// GROUPED OPTIONS:
export const colorOptions = [
  { value: 'red', label: 'Red', color: '#ff5630' },
  { value: 'blue', label: 'Blue', color: '#3041ffff', isDisabled: true },
  { value: 'yellow', label: 'Yellow', color: '#f1ff30ff', isFixed: true },
];

export const flavourOptions = [
  { label: 'Vanilla', value: 'vanilla', rating: 0.4 },
  { label: 'Orange', value: 'orange', rating: 0.6 },
  { label: 'Raspberry', value: 'raspberry', rating: 0.5 },
];

export const groupedOptions = [
  {
    label: 'Colors',
    options: colorOptions,
  },
  {
    label: 'Flavours',
    options: flavourOptions,
  },
];
