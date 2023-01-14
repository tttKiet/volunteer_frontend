import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userSlice } from '~/redux/reducers';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = () => {
        dispatch(userSlice.actions.toggleUserLogin());
        navigate('/');
    };

    return (
        <div>
            Login----------------------
            <button type="button" onClick={handleLogin}>
                submit
            </button>
        </div>
    );
}

export default Login;
