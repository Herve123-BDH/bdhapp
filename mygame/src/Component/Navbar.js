import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {Link} from 'react-router-dom';
import './style.css'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {getpost} from '../feature/postSlice'
export const Navbar = () => {
  const dispatch=useDispatch()
  const loading=()=>{
    axios.get("https://bdhh.herokuapp.com/post/allpost")
    .then(data=>dispatch(getpost({
      allpost: data.data
    })))
  }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            
          >
            <Icon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stories
          </Typography>
          <div style={{display:"flex", flexWrap:"wrap"}}>
          <Link className='Link'  to='/'><Button className='btnn' color="inherit">Home</Button></Link>
          <Link className='Link' onClick={loading} to='/allpost'><Button  className='btnn' color="inherit">view post</Button></Link>
          <Link className='Link'  to='/newpost'><Button className='btnn' color="inherit">Add post</Button></Link>
          <Link className='Link' onClick={loading} to='/updatepost'><Button className='btnn' color="inherit">modify post</Button></Link>
          <Link className='Link' onClick={loading} to='/deletepost'><Button  className='btnn' color="inherit">delete post</Button></Link>
          {/* <Button className='btnn' color="inherit"><Link className='Link'  to='/deleted'>deleted post</Link></Button> */}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
        </div>
    )
}
