import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea, CardActions } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import {selectpost} from '../feature/postSlice'
import {useSelector} from 'react-redux'
import axios from 'axios'
import React from 'react';
import {useDispatch} from 'react-redux'
import {getpost} from '../feature/postSlice'
import {Link} from 'react-router-dom'
export const Delete = () => {
    const dispatch=useDispatch()
    const [open, setOpen] = React.useState(false);
    const [bool, setBool]=React.useState(false);
    const post= useSelector(selectpost)
    const[clickTitle, setClickTitle] =React.useState("")
    const [clickId, setClickId]=React.useState("")
    const handleClose = () => {
    setOpen(false);}
    const handleClos = () => {
        setOpen(false);
        axios.delete(`https://bdhh.herokuapp.com/post/delete/${clickId}`)
        .then(data=>{
            setBool(false)
            if(data.data.deletedCount===1){
                axios.get("https://bdhh.herokuapp.com/post/allpost")
                    .then(data=>dispatch(getpost({
                    allpost: data.data
                })))
                setTimeout(()=>{
                    setBool(true)
                },2000)
            }
        })
    }
const run=()=>{
    setTimeout(() => {
        setBool(true)
    }, 2000);}
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
                <Button variant="outlined" onClick={()=>{
                setOpen(true)
                setClickId(element._id)
                setClickTitle(element.title)
                }} startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </CardActions>
            </Card>):<div>
            <Typography variant="body2" color="text.secondary">
                    your device is offline, verify your internet connection
            </Typography>
                <Button variant="contained">
                    <Link to='/deletepost' className='Link'>
                    refresh the page
                    </Link>
                </Button>
            </div>:
            <div className="spinner spinner-border" role="status">
            </div>}
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete {clickTitle}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this post?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClos}>Delete</Button>
            </DialogActions>
            </Dialog>
    </div>
    )
}
