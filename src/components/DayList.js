import React from "react";
//import classnames from "classnames";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  return (
    <ul>
      {props.days.map((day) => {
        // const spots = day.appointments.reduce((accu, appointmentId) => {
        //   //appointmentId is the key to access the props.appointments obj
        //   return (accu += props.appointments[appointmentId].interview
        //     ? 0
        //     : 1);
        // }, 0)

        return (
          <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            full={day.spots === 0}
            selected={day.name === props.day}
            setDay={props.setDay}
          />
        );
      })}
    </ul>
  );
}
