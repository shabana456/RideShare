import { Redirect, useLocation } from "react-router-dom";

const Create = (props) => {

    const location = useLocation();
    const tripId = location.state.tripId;
    const rating = location.state.rating;
    const feedback = location.state.feedback;
    const flag = location.state.flag;
    const epoch = Date.now()
    const blog = { tripId, rating, feedback, epoch };


    const CreateJson = () => {
        fetch('http://localhost:7000/ratings', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new rating added');
        })
    }

    const UpdateJson = () => {
        fetch(`http://localhost:7000/ratings/${location.state.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new rating added');
        })
    }


    function Message() {
        alert("Feedback has been recorded")
    }

    return (
        <div className="create">
           <Message />
           {flag !== 'update' && <CreateJson />}
           {flag === 'update' && <UpdateJson />}
           <Redirect to={{ pathname: "/", state: { from: location } }} />
        </div>
    );
}

export default Create;