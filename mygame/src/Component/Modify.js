import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea, CardActions } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import axios from 'axios'
import {useSelector} from 'react-redux'
import {selectpost} from '../feature/postSlice'
import {useDispatch} from 'react-redux'
import {getpost} from '../feature/postSlice'
import {Link} from 'react-router-dom'
import './style.css'
export const Modify = () => {
    const dispatch=useDispatch()
    const post= useSelector(selectpost)
    const [open, setOpen] = React.useState(false);
    const[clickTitle, setClickTitle] =React.useState("")
    const [clickId, setClickId]=React.useState("")
    const[title, setTitle]=React.useState("")
    const [content, setContent]=React.useState("")
    const [ope, setOpe] = React.useState(false);
    const [bool, setBool]=React.useState(false)
    const handleClos = () => {
        setOpe(false);
        setOpen(true);
    }
    const handleClose = () => {
        setClickId("") 
        setOpen(false);}
        const handleCloseSubmit = () => {
            setOpen(false)
            if(content==="" || title===""){
                setOpe(true)
            }else{
                axios.patch(`https://bdh.herokuapp.com/post//updatepost/${clickId}`, {title:title, content:content})
                .then(data=>{
                    setBool(false)
                    if(data.data.modifiedCount===1){
                        axios.get("https://bdh.herokuapp.com/post/allpost")
                        .then(data=>dispatch(getpost({
                        allpost: data.data})))
                        setTimeout(()=>{
                            setBool(true)
                        }, 2000)
                    }
                })
                .catch(err=>console.log(err))
                setTitle("")
                setContent("")
            }
        }
        const run=()=>{
            setTimeout(() => {
                setBool(true)
            }, 2000);
        }
        run()
    return (
        <div className='cardspost'>
            {bool===true?
            post!==null?
            post.allpost.length===0?<div>
            <Typography variant="body2" color="text.secondary">
                        There is not post available
            </Typography>
            <Button variant="contained">
                <Link className='Link' to='/newpost'>
                Add new post
                </Link>
            </Button></div>:
            post.allpost.map(element=>
                <Card style={{width:"200px", height: "300px", margin:'5px'}}>
                <CardActionArea style={{height: "250px"}}>
                <CardContent>
                <Typography style={{marginTop:"20px"}} gutterBottom variant="h5" component="div">
                    {element.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {element.content}
                </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                <Button size="small" onClick={()=>{
                setOpen(true)
                setClickTitle(element.title)
                setClickId(element._id)
                }} color="primary">
                modify
                </Button>
            </CardActions>
            </Card>):<div>
            <Typography variant="body2" color="text.secondary">
                    your device is offline, verify your internet connection
            </Typography>
                <Button variant="contained">
                    <Link to='/updatepost' className='Link'>
                    refresh the page
                    </Link>
                </Button>
            </div>:
            <div className="spinner spinner-border" role="status">
            </div>}
    <div>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update {clickTitle}</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Enter the title and the content to update the post
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="post title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
        />
        <TextField
            margin="dense"
            id="nam"
            label="post content"
            type="text"
            multiline
            maxRows={4}
            fullWidth
            variant="standard"
            value={content}
            onChange={(e)=>setContent(e.target.value)}
        />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCloseSubmit}>save</Button>
        </DialogActions>
    </Dialog>
    <Dialog open={ope}>
                <DialogTitle>
                    post not added
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    fill all the field before submitting
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClos}>Okay</Button>
                </DialogActions>
        </Dialog>
    </div>
    </div>
    )
}
