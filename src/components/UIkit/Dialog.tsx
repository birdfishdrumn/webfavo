import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import DialogTitle from '@material-ui/core/DialogTitle'
import AddWeb from "src/components/AddWeb"

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useTheme } from '@material-ui/core/styles'
import { dialogState,idState } from "src/store"
import { useRecoilState, useRecoilValue} from "recoil"

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      position: 'relative',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  dialog: {
    margin: 0,
  },
}))

const FullScreenDialog = () => {
    const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()
  const [open, setOpen] = useRecoilState(dialogState)
  const [id, setId] = useRecoilState(idState)
  // const [type,setType] =  useRecoilState(dialogType)
  const handleClose = (): void => {
    setOpen(false)
    setId("")
    // setId("")
  }
  return (
         <Dialog
        fullScreen={fullScreen}
      open={open}
       className="dark:bg-gray-800"

        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {/* <DialogTitle id="form-dialog-title" className="center">{title}</DialogTitle> */}
      <DialogContent className="dark:bg-gray-800">
         <AddWeb/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default FullScreenDialog
