import { IoIosCall } from "react-icons/io";
import "./Card.css";
const Card = () => {
        return (
                <div className="card">
                        <div className="image">

                        </div>
                        <div className="info">
                                <div className="type">
                                        electrician
                                </div>
                                <div className="rating">
                                        4.7 &#127775;
                                </div>

                        </div>
                        <div className="call">
                                <IoIosCall />
                                1234567890

                        </div>

                </div>
        );
}
export default Card;