import {Cookies} from 'react-cookie';

const cookies = new Cookies();

export const removeCookies = (name) => {
    return cookies.remove(name,{path:'/'});
}
