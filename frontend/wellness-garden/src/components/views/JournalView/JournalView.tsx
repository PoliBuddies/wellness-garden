import { useState } from "react";
import "./JournalView.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCubes } from "@fortawesome/free-solid-svg-icons";

const fetchActivities = (year: number, month: number) => {
  // try {
  //   const response = await fetch("http://localhost:5000/1/" + year + "/" + (month + 1));      
  //   const result = await response.json();
  //   console.log(result);
  // } catch (error) {
  //   console.log("Failed to fetch data");
  // }

  const mocked_list = [
    {day: 1, entry_title: "title", entry_content: "Piekny i inspirujący cytat", activities: [{name: "A name", description: "desc", mood: 1}], social_activities: [{name: "Soc", description: "Social description", mood: 5}]},
    {day: 29, entry_title: "title2", entry_content: "Piekny i inspirujący cytat2", activities: [{name: "A name", description: "desc", mood: 1}, {name: "A name 2", description: "desc 2", mood: 3}], social_activities: [{name: "Soc", description: "Social description", mood: 5}]}
  ]
 
  return mocked_list;
};

const JournalView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [chosenDate, setChosenDate] = useState(new Date().getDate());
  const [activities, setActivities] = useState(fetchActivities(currentDate.getFullYear(), currentDate.getMonth()));
  console.log(activities);

  const renderCalendar = () => {
    const firstWeekday: number = currentDate.getDay() == 0 ? 7 : currentDate.getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= 37; i++) {
      let currentDay = i - firstWeekday + 1;
      if (currentDay > daysInMonth) {
        break;
      }
      if (i < firstWeekday) {
        days.push(<p className="emptyDay"></p>);
      } else if (checkIfToday(currentDay)){
        days.push(<p onClick={() => handleDateClick(currentDay)} className="today">{currentDay}</p>);
      } else {
        days.push(<p onClick={() => handleDateClick(currentDay)}>{currentDay}</p>);
      }
    }

    return days;
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    setActivities(fetchActivities(currentDate.getFullYear(), currentDate.getMonth()));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    setActivities(fetchActivities(currentDate.getFullYear(), currentDate.getMonth()));
  }; 

  const handleDateClick = (day: number) => {
    setChosenDate(day);
  }

  const getMonthName = (monthIndex: number) => {
    const months: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[monthIndex];
  };

  const checkIfToday = (day: number) => {
    const date = new Date((currentDate.getMonth() + 1) + "/" + day + "/" + currentDate.getFullYear());
    return new Date().toDateString() == date.toDateString();
  }

  const displayActivityData = (key: string) => {
    const activity = activities.find((a) => a.day === chosenDate);
    if (activity == undefined || activity == null) {
      return "";
    }
    return activity?[key] ?? "": "";
  }

  const renderDaySummary = () => {
    const activity = activities.find((a) => a.day === chosenDate);
    const activitiesToRender = []

    if (activity == undefined || activity == null) {
      return [];
    }

    for (let i = 0; i < activity.activities.length; i++) {
      activitiesToRender.push(
        <div className="activity">
          <span></span>
          <div className="icon"><FontAwesomeIcon icon={faCubes} size="2x"/></div>
          <p>{activity.activities[i].name}</p>
          <p>{activity.activities[i].mood}</p>
        </div>
      );
    }
    for (let i = 0; i < activity!["social_activities"].length; i++) {
      activitiesToRender.push(
        <div className="activity">
          <span></span>
          <div className="icon"><FontAwesomeIcon icon={faUsers} size="2x"/></div>
          <p>{activity.activities[i].name}</p>
          <p>{activity.activities[i].mood}</p>
        </div>
      );
    }
    
    return activitiesToRender;
  }

  return ( 
    <div className="calendar-view">
      <div className="calendar-side">
        <div className="selected-date">
          <h1>{chosenDate}</h1>
          <p>{getMonthName(currentDate.getMonth())}</p>
        </div>
        <div className="journal">
          <p><i>Today's notes:</i></p>
          <p>{displayActivityData("entry_description")}</p>
        </div>
      </div>
      <div className="calendar-wrapper">
        <button className="nav-button" onClick={handlePrevMonth}>◀</button>
        <div className="calendar">
          <div className="weekdays">
            <h3>Mon</h3>
            <h3>Tue</h3>
            <h3>Wed</h3>
            <h3>Thu</h3>
            <h3>Fri</h3>
            <h3>Sat</h3>
            <h3>Sun</h3>
          </div>
          <div className="dates">
            {renderCalendar()}
          </div>
        </div>
        <button className="nav-button" onClick={handleNextMonth}>▶</button >
      </div>
      <div className="day-summary">
        {renderDaySummary()}
      </div>
    </div>
  );
};

export default JournalView;
