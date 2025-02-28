import './HistoryCard.css';

const HistoryCard = ({ order, tab }) => {
        const formatDate = (dateString) => {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(dateString).toLocaleDateString(undefined, options);
        };

        return (
                <div className={'historycard ' + tab}>
                        <div className="history-details">

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
                        </div>

                        <div className="history-buttons">
                                {['unaccepted', 'pending'].includes(tab) && <button className="Revoke">Revoke Request</button>}
                                {tab === 'pending' && <button className="Feedback">Feedback</button>}
                                {tab === 'pending' && <button className="Complete">Complete</button>}
                        </div>
                </div>
        );
}

export default HistoryCard;
