import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useTheme } from '@material-ui/core/styles'
import { dialogState,idState } from "src/store";
import { useRecoilState } from "recoil";
// import HelpModal from "../Dialog/HelpModal";


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

interface Props {
  title: string
}

const FloatingAction: React.FC<Props> = ({ title }) => {
  const classes = useStyles()

  const [open, setOpen] = useRecoilState(dialogState)
    const [id, setId] = useRecoilState(idState)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const style = {
    top: 'auto',
    right: 70,
    bottom: 70,
    left: 'auto',
    position: 'fixed',
    zIndex: 999,
  }

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <>
      <div className="sm-only" onClick={handleClickOpen}>
        <Fab variant="extended" style={style as any} color="secondary" aria-label="add">
          {title}
        </Fab>
      </div>
    </>
  )
}

export default FloatingAction
