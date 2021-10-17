import auth from '@react-native-firebase/auth'
import {firebase} from '@react-native-firebase/database'

const database = firebase.app().database('YOURS_HERE')
database.ref()

export {auth, database}
