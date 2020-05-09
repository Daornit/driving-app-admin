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
import { LOGIN_QUERY } from 'queries';
import { useMutation } from '@apollo/react-hooks';
import notification from '../../helpers/notification';

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

export default function SignIn(props) {
  const classes = useStyles();


  const [login] = useMutation(LOGIN_QUERY);

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setState({ ...state,[name]: value });
  }

  const handleSubmit = (e) => {
      e.preventDefault();

      const { email, password } = state;
      if (email && password) {
        console.log(email, password);

        login({ variables: { email, password} })
        .then(res => {
          console.log(res);
          localStorage.setItem('token', res.data.login.token);
          localStorage.setItem('type', res.data.login.type);
          notification.success("Амжилттай нэвтэрлээ!");
          if(res.data.login.type === 'CLIENT'){
            props.history.push('/student/calendar');
          }else if(res.data.login.type === 'ADMIN'){
            props.history.push('/admin/course');
          }
          else if(res.data.login.type === 'DIRECTOR'){
            props.history.push('/director/course');
          }
          else if(res.data.login.type === 'TEACHER'){
            props.history.push('/teacher/calendar');
          }
        })
        .catch(err => {
          console.log("err:: ", err.message)
          notification.error(err.message)
        })
      }
  }

  const { email, password } = state;

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
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            value={email}
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
            name="password"
            value={password} 
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
            Нэвтрэх
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Бүртгэл үүсгэх"}
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