
import React, { useCallback } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import { Edit, Delete } from "@material-ui/icons"

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

interface Props {
  handleEdit: (string:string) =>any
  handleRemove: (string:string) =>any
  id:string
}

const MenuButton: React.FC<Props>= ({handleEdit,handleRemove,id}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event:React.ChangeEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return (
     <>
      <IconButton onClick={handleClick}>
       <MoreHorizIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="p-0"
      >
             <MenuItem  className="text-sm">
           <IconButton onClick={()=>handleEdit(id)}>
            <Edit style={{fontSize:"20px"}}/><span className="text-sm ml-1">編集</span>
            </IconButton>
        </MenuItem>
        <MenuItem className="text-sm">

           <IconButton onClick={()=>handleRemove(id)}>
            <Delete style={{fontSize:"20px"}}/><span className="text-sm ml-1">削除</span>
            </IconButton>
        </MenuItem>



      </Menu>
      </>

  );
};
export default MenuButton;
