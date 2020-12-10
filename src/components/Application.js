import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment"
import "components/Application.scss";
import { getAppointmentsForDay, getInterview } from "helpers/selectors"
const GET_DAYS = "http://localhost:8001/api/days";
const GET_APPOINTMENTS = "http://localhost:8001/api/appointments";
const GET_INTERVIEWERS = "http://localhost:8001/api/interviewers";


export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
    
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = day => setState(prev => ({ ...prev, day }));

  
  useEffect(() => {
    
    const promise1 = axios.get(GET_DAYS);
    const promise2 = axios.get(GET_APPOINTMENTS);
    const promise3 = axios.get(GET_INTERVIEWERS);
    Promise.all([promise1, promise2, promise3]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({ ...prev, days, appointments, interviewers}));
      // setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }));
    });

  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
    <hr className="sidebar__separator sidebar--centered" />
    <nav className="sidebar__menu">
      <DayList
        days={state.days}
        day={state.day}
        setDay={setDay}
      />
    </nav>
    <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
    />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          return(
            <Appointment key={appointment.id} {...appointment} interview={interview}/>
            )
          })
        }
          
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
