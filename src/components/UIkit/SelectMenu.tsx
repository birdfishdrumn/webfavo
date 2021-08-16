import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core';


const useStyle = makeStyles({
  FormControl: {
    marginBottom: 16,
    height: "40px",
    minWidth: 100,
    width: '100%',
  },
  label: {
    padding: '0 10px',
    zIndex: 1,
    paddingTop:"-20px"

  },

});

interface PROPS {
  options: {
    id: string;
    title: string;
  }[];
  select: any;
  label: string;
  value: string;
  required: boolean;
}

const SelectBox: React.FC<PROPS> = (props) => {
  const classes = useStyle();
  return (
    <FormControl className={classes.FormControl}>
      <InputLabel className={classes.label}>{props.label}</InputLabel>
      <Select

        variant="outlined"
        required={props.required}
        value={props.value}
        onChange={(event) => props.select(event.target.value)}
      >
        {/* 全体にmapを適用するわけではないので、すぐに{}で囲わないように注意する。 */}
        {props.options && props.options.map((option) => (
          <MenuItem key={option.id} value={option.title}>
            <div>{option.title}</div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
