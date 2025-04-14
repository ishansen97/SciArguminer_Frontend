import spinner from '../../assets/images/spinner.svg'
import {FC} from "react";

const Loader: FC = () => {
	return <img src={spinner} alt="spinner"/>
}

export default Loader;