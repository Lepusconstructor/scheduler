import { useState, useEffect } from "react";
import axios from "axios";
import { getSpotsForDay } from "helpers/selectors";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // setDay called by DayList updates state(Day)
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  // update spots by a number
  // function updateSpots(days, id, num) {
  //   for (let day of days){
  //     if (day.appointments.includes(id)) {
  //       day.spots += num;
  //     }
  //   }
  //   return days;
  // };

  //get API
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        const [days, appointments, interviewers] = all;
        setState((prev) => ({
          ...prev,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        }));
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  }, []);

  function bookInterview(id, interview) {
    // updates appointment data to add new interview
    const appointment = {
      ...state.appointments[id],
      // if id is 5, ...state.appointments[id] would be 
      // "5": {
      //   "id": 5,
      //   "time": "4pm",
      //   "interview": {
      //     "student": "Jim",
      //     "interviewer": 10
      //   }
      interview: { ...interview },
    };
    console.log(appointment);
    //a copy of appointments with updated appointment(see above)
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log(appointments);

    //we give the newStateTemp the appointments which has the newest appointment
    const newStateTemp = {
      ...state,
      appointments
    }
    
    //
    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
        return {
          ...day,
          spots : getSpotsForDay(newStateTemp, day.name)
        }
      } else {
        return day;
      }
    })


    // spots -1

    // const days = updateSpots([ ...state.days], id, -1)

    // API req to update appointments
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((res) => setState((prev) => ({ ...prev, appointments, days })));
  }

  function deleteInterview(id) {
    // updates appointment data to show interview as null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
     //we give the newStateTemp the appointments which has the newest appointment
     const newStateTemp = {
      ...state,
      appointments
    }
    
    //
    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
        return {
          ...day,
          spots : getSpotsForDay(newStateTemp, day.name)
        }
      } else {
        return day;
      }
    })

    // spots +1
    //const days = updateSpots([ ...state.days], id, 1)

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState((prev) => ({ ...prev, appointments, days })));
  }

  return { state, setDay, bookInterview, deleteInterview };
}
