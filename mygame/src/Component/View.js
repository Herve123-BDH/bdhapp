import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, CardActions } from '@material-ui/core';
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import React from 'react';
//import axios from 'axios'
import {useSelector} from 'react-redux'
import {selectpost} from '../feature/postSlice'
//import {useDispatch} from 'react-redux'
import './style.css'
export const View = () => {
    const post= useSelector(selectpost)
    const [bool, setBool]=React.useState(false)
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
                <CardActionArea style={{height: "300px"}}>
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
            </CardActions>
            </Card>):<div>
            <Typography variant="body2" color="text.secondary">
                    your device is offline, verify your internet connection
            </Typography>
                <Button variant="contained">
                    <Link to='/allpost' className='Link'>
                    refresh the page
                    </Link>
                </Button>
            </div>:
            <div className="spinner spinner-border" role="status">
            </div>}
    <div>
    </div>
    </div>
    )
}
