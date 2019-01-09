/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as SearchBar} from './SearchBar'
export {default as UserHome} from './user-home'
export {default as LeftSideBar} from './LeftSideBar'
export {default as MovieView} from './MovieView'
export {default as Content} from './Content'
export {default as AdView} from './AdView'
export {Login, Signup} from './auth-form'
