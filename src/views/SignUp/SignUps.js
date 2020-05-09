import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//apollo client config
import { useMutation } from '@apollo/react-hooks';
import notification from '../../helpers/notification';
import { CREATE_USERS } from 'queries';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Driving App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUps(props) {
  const classes = useStyles();

  const [ createUsers ] = useMutation(CREATE_USERS);
  
  const [state, setState] = useState({
    email: '',
    password: '',
    username:'',
    phone:'',
  });

  const [newUser, setNewUser] = React.useState({
    username: "",
    email: "",
    avatar: "",
    type: "CLIENT",
    password:""
  });

  
  const handleChange = event => {
    const name = event.target.name;
    setNewUser({
      ...newUser,
      [name]: event.target.value,
    });
  };

  
  const handleCreateUsers = (e) => {
    e.preventDefault();

    console.log(newUser);
    if(!newUser.username){
      notification.error('name talbariig zaaval buglunu uu')
      return;
    }
    createUsers({
      variables: {
        ...newUser,
        phone: Number(newUser.phone)
      }
    }).then(()=>{
        notification.success('amjilttai uuslee');
        props.history.push('/login');
    }).catch((err)=> notification.error(err.message))
    
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Нэвтрэх
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleCreateUsers} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            value={newUser.username}
            label="Нэр"
            name="username"
            autoComplete="username"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            value={newUser.email}
            label="Цахим шуудан"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            value={newUser.phone}
            label="Утасны дугаар"
            name="phone"
            autoComplete="phone"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={newUser.password} 
            label="Нууц үг"
            type="password"
            id="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Бүртгүүлэх
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Нэвтрэх"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}