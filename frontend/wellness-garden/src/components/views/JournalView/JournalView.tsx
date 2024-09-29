import "./JournalView.css";

const JournalView = () => {

    return ( 
      <div className="calendar-view">
        <div className="calendar-side">
          <div className="selected-date">
            <h1>28</h1>
            <p>August</p>
          </div>
          <div className="journal">
            <p><i>Today's notes:</i></p>
            <p>Lorem ipsum generated text xddd </p>
          </div>
        </div>
        <div className="calendar-wrapper">
          <div className="calendar-left-button"></div>
          <div className="calendar">
            <div className="weekdays">
              <h6>Mon</h6>
            </div>
            <div className="dates">

            </div>
          </div>
          <div className="calendar-right-button"></div>
        </div>
      </div>
    );
};

export default JournalView;
