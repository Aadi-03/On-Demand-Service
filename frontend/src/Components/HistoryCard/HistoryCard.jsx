import './HistoryCard.css';
import { useState } from 'react';

import start from '../../assets/rating.png';

const HistoryCard = ({ order, tab }) => {
        const [showFeedback, setShowFeedback] = useState(false);

        const formatDate = (dateString) => {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(dateString).toLocaleDateString(undefined, options);
        };

        return (
                <div className={'historycard ' + tab}>
                        {!showFeedback && <div className="history-details">
                                <div className="order-details">
                                        <div className="detail">
                                                <p><b>Task ID : </b>
                                                        {order.orderId}</p>
                                        </div>
                                        <div className="detail">
                                                <p> <b>Date : </b>
                                                        {formatDate(order.orderDate)}</p>
                                        </div>
                                </div>

                                <h3>Task Details</h3>
                                <div className="task-detail">
                                        <div className="detail">
                                                <b>Title : </b>
                                                <p>{order.orderTitle}</p>
                                        </div>
                                        <div className="detail">
                                                <b>Description : </b>
                                                <p>{order.orderDescription}</p>
                                        </div>
                                </div>

                                <h3>Worker Details</h3>
                                <div className="worker-details">
                                        <div className="detail">
                                                <b>Name : </b>
                                                <p>{order.providerName}</p>
                                        </div>
                                        <div className="detail">
                                                <b>Phone : </b>
                                                <p>{order.providerPhone}</p>
                                        </div>
                                        <div className="detail">
                                                <b>Email : </b>
                                                <p>{order.providerEmail}</p>
                                        </div>
                                        <div className="detail">
                                                <b>Work Type : </b>
                                                <p>{order.providerWorkType}</p>
                                        </div>
                                </div>

                                <h3>Reviews</h3>
                                <div className="detail">
                                        <p><b>Rating : </b> {order.orderRating} &#127775;</p>
                                </div>
                                <div className="detail">
                                        <b>Feedback : </b>
                                        <p>{order.orderFeedback}</p>
                                </div>
                        </div>}
                        {!showFeedback && <div className="history-buttons">
                                {['unaccepted', 'pending'].includes(tab) && <button className="Revoke">Revoke Request</button>}
                                {['partialcompleted', 'pending'].includes(tab) && <button className="Complete" onClick={() => {setShowFeedback(!showFeedback)}}>Complete</button>}
                        </div>}

                        {showFeedback && <Feedback setShowFeedback = {setShowFeedback}/>}
                </div>
        );
}

export default HistoryCard;

const Feedback = ({setShowFeedback}) => {
        const handleSubmit = (e) => {
                e.preventDefault();
                const rating = document.querySelector('input[name="rating"]:checked').value;
                const feedback = document.querySelector('textarea[name="comment"]').value;
                console.log(rating, feedback);
                setShowFeedback(false);
        }
        return (
                <div className="feedback-container">
                        <form>
                                <p>Please rate our service out of 5</p>
                                <div className="star-rating">
                                        {[...Array(5)].map((_, index) => (
                                                <label key={index}>
                                                        <input type="radio" name="rating" value={5 - index} />
                                                        <span className="star">&#9733;</span>
                                                </label>
                                        ))}
                                </div>
                                <p>Please give a Feedback below</p>
                                <textarea name="comment" placeholder='Give your feedback'></textarea>
                                <button type="submit" onClick={handleSubmit}>Send Feedback</button>
                        </form>
                </div>
        );
}