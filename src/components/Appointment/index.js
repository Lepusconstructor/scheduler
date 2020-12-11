import React from 'react'
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE ="CREATE"
  const { mode, transition, back } = useVisualMode( () => {
    //props.interview ? SHOW : EMPTY
    if (!props.interview) {
      return EMPTY;
    }
    switch (props.interview) {
      case SHOW: "SHOW";
      break;
      case CREATE: "CREATE";
      default: EMPTY?

    }
  }
      
      

    
  );
  
  
  return (
    <>
    <article className="appointment">
      <Header time={props.time}/>
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => console.log("editing")} onDelete={() => console.log("deleting")}
        />
        )}

    </article>
    </>
  )
  
} 
