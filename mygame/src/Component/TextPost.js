import Box from '@material-ui/core/Box';
import './style.css'
import {useState} from 'react'
import { Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react'
import axios from 'axios'
export const TextPost = () => {
    const [open, setOpen] = React.useState(false);
    const [ope, setOpe] = React.useState(false);
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);}
    const handleClos = () => {setOpe(false);}
    const [title, setTitle]=useState("")
    const [content, setContent]=useState("")
    const [id, setId]=useState("")
    const handlerTitle=(e)=>{
        let Tit= e.target.value
        setTitle(Tit)
    }
    const handlerContent=(e)=>{
        let Cont= e.target.value
        setContent(Cont)
    }
    const submit=()=>{
        if(title==="" || content===""){
            handleClickOpen()
        }else{
            setId("load")
            axios.post("https://bdh.herokuapp.com/post/newpost", {title:  title, content: content})
            .then(data=>{
                if(data.data.msg._id!=="none"){
                    setOpe(true)
                    setTitle("")
                    setContent("")
                    setId("")
                }
            })
            .catch(err=>console.log(err))
        }
    }
    return (
        <div>
            
            <h1>Add new post</h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
                className='main'
                >
                <TextField id="standard-basic" value={title} onChange={handlerTitle} label="Title" variant="standard" />
                <TextField id="standard-basic" multiline value={content} onChange={handlerContent} label="Content" variant="standard" />
            </Box>
            {id===""? "":<div className="spinner-border" role="status">
            </div>}
            
            <div className='na'>
            <Button variant='contained' color='primary' onClick={submit} className='bt'>Create</Button>
            </div>
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Add new post
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    fill all the field before submitting
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Okay</Button>
                </DialogActions>
        </Dialog>
        <Dialog open={ope} onClose={handleClos}>
                <DialogTitle>
                    post added
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Congratulation, your post is added
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClos}>Okay</Button>
                </DialogActions>
        </Dialog>
        </div>
    )
}
